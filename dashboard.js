const API_URL = "https://resumepilot-w360.onrender.com/api";

const resumeGrid = document.getElementById("resumeGrid");
const emptyState = document.getElementById("emptyState");

const newResumeBtn = document.getElementById("newResumeBtn");
const bottomAction = document.querySelector(".dashboard-bottom-action");
const emptyCreateBtn = document.getElementById("emptyCreateBtn");
const homeBtn = document.getElementById("homeBtn");

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login";
}

async function apiRequest(url, options = {}) {
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login";
    return;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
function formatLastEdited(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) {
    return "Edited just now";
  }

  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `Edited ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `Edited ${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diff < 172800) {
    return "Edited yesterday";
  }

  const days = Math.floor(diff / 86400);

  return `Edited ${days} days ago`;
}

function renderResumes(resumes) {
  resumeGrid.innerHTML = "";

  if (!resumes.length) {
    emptyState.classList.add("show");
    bottomAction?.classList.add("hidden");
    return;
  }

  emptyState.classList.remove("show");
  bottomAction?.classList.remove("hidden");

  resumes.forEach((resume) => {
    const card = document.createElement("article");
    card.className = "resume-card";

    card.innerHTML = `
    <div class="resume-preview mini-${escapeHTML(resume.template || "modern")}">
  <div class="mini-header"></div>
  <div class="mini-name">${escapeHTML(resume.data?.name || resume.title || "Resume")}</div>
  <div class="mini-line long"></div>
  <div class="mini-line"></div>
  <div class="mini-line short"></div>
  <div class="mini-section"></div>
  <div class="mini-line long"></div>
  <div class="mini-line"></div>
</div>

      <h3>${escapeHTML(resume.title || "Untitled Resume")}</h3>

    <div class="resume-meta">
  <span class="template-badge">
    ${escapeHTML(resume.template || "modern")}
  </span>

  <span class="edited-time">
    ${formatLastEdited(resume.updatedAt)}
  </span>
</div>

      <div class="resume-actions">
        <button class="edit-btn" type="button">Edit</button>
        <button class="delete-btn" type="button">Delete</button>
      </div>
    `;

    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    card.addEventListener("click", () => {
      openResume(resume._id);
    });

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openResume(resume._id);
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteResume(resume._id);
    });

    resumeGrid.appendChild(card);
  });
}

async function loadResumes() {
  resumeGrid.innerHTML = `
    <div class="resume-skeleton"></div>
    <div class="resume-skeleton"></div>
    <div class="resume-skeleton"></div>
  `;

  try {
    const resumes = await apiRequest("/resumes");

    renderResumes(resumes);
  } catch (err) {
    console.error(err);
    alert("Failed to load resumes");
  }
}

async function createResume() {
  try {
    const resume = await apiRequest("/resumes", {
      method: "POST",
      body: JSON.stringify({
        title: "Untitled Resume",
        template: "modern",
        data: {},
      }),
    });

    window.location.href = `/?id=${resume._id}`;
  } catch (err) {
    console.error(err);
    alert("Failed to create resume");
  }
}

async function deleteResume(id) {
  const confirmed = confirm("Delete this resume?");

  if (!confirmed) return;

  try {
    await apiRequest(`/resumes/${id}`, {
      method: "DELETE",
    });

    await loadResumes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete resume");
  }
}

function openResume(id) {
  window.location.href = `/?id=${id}`;
}
function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

newResumeBtn?.addEventListener("click", createResume);
emptyCreateBtn?.addEventListener("click", createResume);

homeBtn?.addEventListener("click", () => {
  window.location.href = "/";
});

loadResumes();
