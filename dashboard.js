const API_URL = "https://resumepilot-w360.onrender.com/api";

const resumeGrid = document.getElementById("resumeGrid");
const emptyState = document.getElementById("emptyState");

const newResumeBtn = document.getElementById("newResumeBtn");
const emptyCreateBtn = document.getElementById("emptyCreateBtn");
const homeBtn = document.getElementById("homeBtn");

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
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
    window.location.href = "login.html";
    return;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function renderResumes(resumes) {
  resumeGrid.innerHTML = "";

  if (!resumes.length) {
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  resumes.forEach((resume) => {
    const card = document.createElement("article");
    card.className = "resume-card";

    card.innerHTML = `
      <div class="resume-preview"></div>

      <h3>${escapeHTML(resume.title || "Untitled Resume")}</h3>

      <p class="resume-meta">
        Template: ${escapeHTML(resume.template || "modern")} · Updated ${formatDate(resume.updatedAt)}
      </p>

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

    window.location.href = `index.html?id=${resume._id}#builder`;
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
  window.location.href = `index.html?id=${id}#builder`;
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
  window.location.href = "index.html";
});

loadResumes();
