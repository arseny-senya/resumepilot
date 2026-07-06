const cv = document.querySelector(".cv");

function applyExportSectionLayout(sectionLayout) {
  if (!sectionLayout) return;

  Object.entries(sectionLayout).forEach(([columnName, sections]) => {
    const column = cv.querySelector(`[data-layout-column="${columnName}"]`);

    if (!column || !Array.isArray(sections)) return;

    sections.forEach((sectionName) => {
      const section = cv.querySelector(`[data-section="${sectionName}"]`);

      if (section) {
        column.appendChild(section);
      }
    });
  });
}

window.renderExportResume = function (data) {
  if (!data) return;

  window.resumeReady = false;

  const template = data.template || "modern";

  cv.className = "cv";
  cv.classList.add(`template-${template}`);

  cv.innerHTML = templateLayouts[template]();

  applyExportSectionLayout(data.sectionLayout);

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
