const LANG = location.pathname.startsWith("/en") ? "en" : "ru";

const TEXT = {
  en: {
    "Добро пожаловать!": "Welcome!",
    "📄 PDF успешно скачан": "📄 PDF downloaded successfully",
    "Ошибка соединения с сервером": "Server connection error",
    "⭐ Для скачивания этого шаблона требуется PRO":
      "⭐ This template requires PRO to download",
    "⭐ У вас уже активирована подписка PRO":
      "⭐ You already have an active PRO subscription",
    "Ошибка оплаты": "Payment error",
    "Ошибка соединения": "Connection error",
    "⭐ Это PRO-шаблон. Его можно посмотреть, но скачать можно только после покупки PRO.":
      "⭐ This is a PRO template. You can preview it, but downloading requires PRO.",
    "Ошибка генерации PDF": "PDF generation error",
    "Сначала войдите в аккаунт": "Please sign in to your account first",
    "User not found": "User not found",
    "Invalid password": "Invalid password",
    "Auth error": "Authentication error",
    "Ошибка входа": "Login error",
    "Пользователь уже существует": "User already exists",
    "Пользователь не найден": "User not found",
    "Неверный пароль": "Invalid password",
    "Примите политику конфиденциальности": "Please accept the Privacy Policy",
  },
};
let currentUser = null;
function t(text) {
  if (LANG === "ru") return text;

  return TEXT.en[text] || text;
}
/* ======================
   INPUTS
====================== */

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const skillsInput = document.getElementById("skills");
const aboutInput = document.getElementById("about");

const contactInput = document.getElementById("contact");
const experienceInput = document.getElementById("experience");
const educationInput = document.getElementById("education");
const qualitiesInput = document.getElementById("qualities");

const photoInput = document.getElementById("photo");

const downloadBtn = document.getElementById("download");

const cv = document.querySelector(".cv");

const zoom = document.getElementById("zoom");
const posX = document.getElementById("posX");
const posY = document.getElementById("posY");
const policyLabel = document.getElementById("policyLabel");
const privacyAgree = document.getElementById("privacyAgree");

/* ======================
   STATE
====================== */

let photoState = {
  src: "",
  scale: 1,
  x: 0,
  y: 0,
};

let isExportingPDF = false;
let currentTemplate = "modern";
let isProUser = false;

/* ======================
   PRO TEMPLATES
====================== */

const PRO_TEMPLATES = ["executive", "tech", "minimal", "designer", "dark"];

/* ======================
   LOAD USER
====================== */

async function loadUser() {
  try {
    const token = localStorage.getItem("token");

    // Если пользователь не вошёл
    if (!token) {
      currentUser = null;
      isProUser = false;

      document.getElementById("loginBtn").style.display = "block";
      document.getElementById("userDropdown").classList.add("hidden");

      return;
    }

    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error();
    }

    const data = await res.json();

    currentUser = data.user;
    isProUser = !!data.user.isPro;

    // Показываем профиль
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("userDropdown").classList.remove("hidden");

    document.getElementById("userEmail").textContent =
      data.user.name || data.user.email.split("@")[0];

    document.getElementById("planBadge").textContent = data.user.isPro
      ? "PRO ⭐"
      : "FREE";

    accountName.textContent = data.user.name || data.user.email.split("@")[0];

    accountEmail.textContent = data.user.email;

    accountPlan.textContent = data.user.isPro ? "⭐ PRO" : "🟢 FREE";

    if (data.user.isPro) {
      upgradeAccountBtn.textContent = "✅ PRO Activated";
      upgradeAccountBtn.disabled = true;
      upgradeAccountBtn.style.opacity = "0.7";
      upgradeAccountBtn.style.cursor = "default";
    } else {
      upgradeAccountBtn.textContent = "⭐ Upgrade to PRO";
      upgradeAccountBtn.disabled = false;
      upgradeAccountBtn.style.opacity = "1";
      upgradeAccountBtn.style.cursor = "pointer";
    }

    update();
  } catch (err) {
    console.warn("FREE MODE");

    currentUser = null;
    isProUser = false;

    localStorage.removeItem("token");

    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("userDropdown").classList.add("hidden");
  }
}

/* ======================
   USER DROPDOWN
====================== */

const userButton = document.getElementById("userButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const logoutBtn = document.getElementById("logoutBtn");

userButton?.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".user-menu")) {
    dropdownMenu.classList.remove("show");
  }
});

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("token");

  location.reload();
});
/* ======================
   ACCESS
====================== */

function isLockedTemplate() {
  return PRO_TEMPLATES.includes(currentTemplate) && !isProUser;
}

/* ======================
   RENDER
====================== */

function renderResume() {
  cv.innerHTML = templateLayouts[currentTemplate]();

  const setText = (selector, value) => {
    const el = cv.querySelector(selector);
    if (el) el.textContent = value || "";
  };

  setText(".js-name", `${nameInput.value} ${surnameInput.value}`.trim());
  setText(".js-contact", contactInput.value);
  setText(".js-skills", skillsInput.value);
  setText(".js-experience", experienceInput.value);
  setText(".js-education", educationInput.value);
  setText(".js-qualities", qualitiesInput.value);
  setText(".js-about", aboutInput.value);

  const img = cv.querySelector(".js-photo");

  if (img && photoState.src) {
    img.src = photoState.src;

    const yFix = isExportingPDF ? 1.35 : 1;

    img.style.transform = `
      scale(${photoState.scale})
      scaleY(${yFix})
      translate(${photoState.x}px, ${photoState.y}px)
    `;
  }

  cv.classList.toggle("watermark", isLockedTemplate());
}

/* ======================
   UPDATE
====================== */

function update() {
  renderResume();
  save();
}

/* ======================
   EVENTS
====================== */

[
  nameInput,
  surnameInput,
  skillsInput,
  aboutInput,
  contactInput,
  experienceInput,
  educationInput,
  qualitiesInput,
].forEach((el) => el?.addEventListener("input", update));

/* ======================
   PHOTO
====================== */

photoInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    photoState.src = reader.result;
    update();
  };

  reader.readAsDataURL(file);
});

/* ======================
   SLIDERS
====================== */

zoom?.addEventListener("input", (e) => {
  photoState.scale = Number(e.target.value);
  update();
});

posX?.addEventListener("input", (e) => {
  photoState.x = Number(e.target.value);
  update();
});

posY?.addEventListener("input", (e) => {
  photoState.y = Number(e.target.value);
  update();
});

/* ======================
   EXPORT PDF
====================== */

downloadBtn?.addEventListener("click", async () => {
  const originalText = downloadBtn.textContent;

  try {
    if (isLockedTemplate()) {
      openProModal();
      showToast(t("⭐ Для скачивания этого шаблона требуется PRO"), "info");
      return;
    }

    // Loader
    downloadBtn.disabled = true;
    downloadBtn.classList.add("loading");
    downloadBtn.textContent =
      LANG === "en" ? "Generating PDF..." : "Генерация PDF...";

    const token = localStorage.getItem("token");

    const data = {
      template: currentTemplate,

      name: nameInput.value,
      surname: surnameInput.value,
      contact: contactInput.value,
      skills: skillsInput.value,
      experience: experienceInput.value,
      education: educationInput.value,
      qualities: qualitiesInput.value,
      about: aboutInput.value,

      photoState,
    };

    const res = await fetch(`${API_URL}/api/pdf/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(t(err.message || "Ошибка генерации PDF"), "error");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    showToast(t("📄 PDF успешно скачан"), "success");
  } catch (err) {
    console.error(err);
    showToast(t("Ошибка соединения с сервером"), "error");
  } finally {
    // Возвращаем кнопку в исходное состояние
    downloadBtn.disabled = false;
    downloadBtn.classList.remove("loading");
    downloadBtn.textContent = originalText;
  }
});
/* ======================
   SAVE / LOAD
====================== */

function save() {
  try {
    localStorage.setItem(
      "resumeData",
      JSON.stringify({
        name: nameInput.value,
        surname: surnameInput.value,
        skills: skillsInput.value,
        about: aboutInput.value,
        contact: contactInput.value,
        experience: experienceInput.value,
        education: educationInput.value,
        qualities: qualitiesInput.value, // FIXED
        photoState,
      }),
    );
  } catch (e) {}
}

function load() {
  const data = JSON.parse(localStorage.getItem("resumeData") || "null");
  if (!data) return;

  nameInput.value = data.name || "";
  surnameInput.value = data.surname || "";
  skillsInput.value = data.skills || "";
  aboutInput.value = data.about || "";

  contactInput.value = data.contact || "";
  experienceInput.value = data.experience || "";
  educationInput.value = data.education || "";
  qualitiesInput.value = data.qualities || "";

  if (data.photoState) {
    photoState = data.photoState;

    zoom.value = photoState.scale;
    posX.value = photoState.x;
    posY.value = photoState.y;
  }

  update();
}

load();

/* ======================
   TEMPLATE SWITCH
====================== */

const API_URL = "https://resumepilot-w360.onrender.com";

/* ======================
   TEMPLATE SYSTEM
====================== */

function applyTemplate(template) {
  if (!template) return;

  currentTemplate = template;

  if (cv) {
    cv.className = "cv";
    cv.classList.add(`template-${template}`);
  }

  update?.();

  document.querySelectorAll(".template-item").forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelector(`[data-template="${template}"]`)
    ?.classList.add("active");

  localStorage.setItem("selectedTemplate", template);
}
document.querySelectorAll(".template-item")?.forEach((card) => {
  card.addEventListener("click", () => {
    const template = card.dataset.template;

    applyTemplate(template);

    if (PRO_TEMPLATES.includes(template) && !isProUser) {
      showToast(
        t(
          "⭐ Это PRO-шаблон. Его можно посмотреть, но скачать можно только после покупки PRO.",
        ),
        "info",
      );
    }
  });
});
const savedTemplate = localStorage.getItem("selectedTemplate") || "modern";

applyTemplate(savedTemplate);

/* ======================
   INIT
====================== */

loadUser?.();

/* ======================
   STRIPE
====================== */

async function buyPro() {
  const token = localStorage.getItem("token");

  if (!token || !currentUser) {
    showToast(t("Сначала войдите в аккаунт"), "info");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lang: LANG,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Stripe error");
    }

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error(err);
    showToast(t("Ошибка оплаты"), "error");
  }
}
/* ======================
   AUTH MODAL
====================== */

const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authName = document.getElementById("authName");
const showLogin = document.getElementById("showLogin");
const showRegister = document.getElementById("showRegister");
const authSubmit = document.querySelector(".auth-submit");

/* toggle login/register */
showLogin?.addEventListener("click", () => {
  authMode = "login";

  showLogin.classList.add("active");
  showRegister?.classList.remove("active");

  if (authName) {
    authName.style.display = "none";
  }

  if (policyLabel && privacyAgree) {
    policyLabel.style.display = "none";
    privacyAgree.required = false;
    privacyAgree.checked = false;
  }

  if (authSubmit) {
    authSubmit.textContent = LANG === "en" ? "Sign In" : "Войти";
  }
});

showRegister?.addEventListener("click", () => {
  authMode = "register";

  showRegister.classList.add("active");
  showLogin?.classList.remove("active");

  if (authName) {
    authName.style.display = "block";
  }

  if (policyLabel && privacyAgree) {
    policyLabel.style.display = "flex";
    privacyAgree.required = true;
  }

  if (authSubmit) {
    authSubmit.textContent =
      LANG === "en" ? "Create Account" : "Зарегистрироваться";
  }
});

/* ======================
   AUTH SUBMIT
====================== */

authForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const url =
      authMode === "login"
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

    if (authMode === "register" && privacyAgree && !privacyAgree.checked) {
      showToast(t("Примите политику конфиденциальности"), "info");
      return;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: authName?.value?.trim(),
        email: authEmail?.value?.trim(),
        password: authPassword?.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(t(data.message || "Ошибка входа"), "error");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    await loadUser();

    authModal?.classList.remove("show");

    authForm.reset();

    if (policyLabel && privacyAgree) {
      policyLabel.style.display = "none";
      privacyAgree.checked = false;
      privacyAgree.required = false;
    }

    authMode = "login";
  } catch (err) {
    console.error(err);
    showToast(t("❌ Ошибка соединения"), "error");
  }
});
/* ======================
   ACCOUNT MODAL
====================== */

const accountModal = document.getElementById("accountModal");

const accountBtn = document.getElementById("accountBtn");

const closeAccount = document.getElementById("closeAccount");

const accountName = document.getElementById("accountName");

const accountEmail = document.getElementById("accountEmail");

const accountPlan = document.getElementById("accountPlan");

const upgradeAccountBtn = document.getElementById("upgradeAccountBtn");

const logoutAccountBtn = document.getElementById("logoutAccountBtn");
const accountUpgradeBtn = document.getElementById("accountUpgradeBtn");
accountUpgradeBtn?.addEventListener("click", () => {
  if (isProUser) {
    showToast(t("⭐ У вас уже активирована подписка PRO"), "success");
    return;
  }

  accountModal.classList.remove("show");
  openProModal();
});
accountBtn?.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");

  accountModal.classList.add("show");
});

closeAccount?.addEventListener("click", () => {
  accountModal.classList.remove("show");
});

accountModal?.addEventListener("click", (e) => {
  if (e.target === accountModal) {
    accountModal.classList.remove("show");
  }
});

logoutAccountBtn?.addEventListener("click", () => {
  localStorage.removeItem("token");

  location.reload();
});

upgradeAccountBtn?.addEventListener("click", () => {
  if (isProUser) {
    showToast(t("⭐ У вас уже активирована подписка PRO"), "success");
    return;
  }

  accountModal.classList.remove("show");
  openProModal();
});
/* ======================
   LANDING BUTTONS
====================== */

const startFreeBtn = document.getElementById("startFreeBtn");
const viewTemplatesBtn = document.getElementById("viewTemplatesBtn");
const unlockProBtn = document.getElementById("unlockProBtn");

startFreeBtn?.addEventListener("click", () => {
  document.getElementById("builder")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setTimeout(() => {
    nameInput?.focus();
  }, 700);
});

viewTemplatesBtn?.addEventListener("click", () => {
  document.getElementById("templates")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

unlockProBtn?.addEventListener("click", openProModal);
/* ======================
      PRO MODAL
====================== */

const proModal = document.getElementById("proModal");

const closeProModal = document.getElementById("closeProModal");

const upgradeNowBtn = document.getElementById("upgradeNowBtn");

function openProModal() {
  if (isProUser) {
    showToast(t("⭐ У вас уже активирована подписка PRO"), "success");

    return;
  }

  proModal.classList.add("show");
}

function closePro() {
  proModal.classList.remove("show");
}

closeProModal?.addEventListener("click", closePro);

proModal?.addEventListener("click", (e) => {
  if (e.target === proModal) {
    closePro();
  }
});

upgradeNowBtn?.addEventListener("click", () => {
  closePro();

  buyPro();
});
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");

  if (!container) {
    alert(message);
    return;
  }

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
/* ======================
   CONTACT MODAL
====================== */

const contactLink = document.getElementById("contactLink");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");

contactLink?.addEventListener("click", (e) => {
  e.preventDefault();
  contactModal?.classList.add("show");
});

closeModal?.addEventListener("click", () => {
  contactModal?.classList.remove("show");
});

contactModal?.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("show");
  }
});
