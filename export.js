const cv = document.querySelector(".cv");

function renderExportSection(section, L) {
  const sections = {
    skills: `
      <section class="section-skills" data-section="skills">
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>
    `,

    qualities: `
      <section class="section-qualities" data-section="qualities">
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>
    `,

    experience: `
      <section class="section-experience" data-section="experience">
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>
    `,

    education: `
      <section class="section-education" data-section="education">
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>
    `,

    about: `
      <section class="section-about" data-section="about">
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>
    `,
  };

  return sections[section] || "";
}

function renderExportModernV2(data) {
  const layout = data.sectionLayout || {
    left: ["skills", "qualities"],
    right: ["experience", "education", "about"],
  };

  cv.innerHTML = `
    <div class="modern-header">
      <div class="photo-frame">
        <div class="photo-inner">
          <img class="js-photo">
        </div>
      </div>

      <div class="modern-info">
        <h1 class="name js-name"></h1>
        <p class="js-contact"></p>
      </div>
    </div>

    <div class="modern-grid">
      <div class="modern-left">
        ${(layout.left || []).map((section) => renderExportSection(section, L)).join("")}
      </div>

      <div class="modern-right">
        ${(layout.right || []).map((section) => renderExportSection(section, L)).join("")}
      </div>
    </div>
  `;
}

window.renderExportResume = function (data) {
  if (!data) return;

  window.resumeReady = false;

  const template = data.template || "modern";

  cv.className = "cv";
  cv.classList.add(`template-${template}`);

  if (template === "modern") {
    renderExportModernV2(data);
  } else {
    cv.innerHTML = templateLayouts[template]();
  }

  const setText = (selector, value) => {
    const el = cv.querySelector(selector);
    if (el) el.textContent = value || "";
  };

  setText(".js-name", `${data.name || ""} ${data.surname || ""}`.trim());
  setText(".js-contact", data.contact);
  setText(".js-skills", data.skills);
  setText(".js-experience", data.experience);
  setText(".js-education", data.education);
  setText(".js-qualities", data.qualities);
  setText(".js-about", data.about);

  const img = cv.querySelector(".js-photo");

  if (img && data.photoState?.src) {
    img.src = data.photoState.src;

    img.style.transform = `
      scale(${data.photoState.scale || 1})
      translate(${data.photoState.x || 0}px, ${data.photoState.y || 0}px)
    `;
  }

  window.resumeReady = true;
};
