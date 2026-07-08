const TEMPLATE_LANG = location.pathname.includes("/en") ? "en" : "ru";

const L = {
  resume: TEMPLATE_LANG === "en" ? "Resume" : "Резюме",
  contact: TEMPLATE_LANG === "en" ? "Contact" : "Контакты",
  skills: TEMPLATE_LANG === "en" ? "Skills" : "Навыки",
  experience: TEMPLATE_LANG === "en" ? "Work Experience" : "Опыт работы",
  education: TEMPLATE_LANG === "en" ? "Education" : "Образование",
  qualities: TEMPLATE_LANG === "en" ? "Strengths" : "Личные качества",
  about: TEMPLATE_LANG === "en" ? "Additional Information" : "Дополнительно",
};
const templateLayouts = {
  modern: () => `

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

    <section class="section-skills" data-section="skills">
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section class="section-qualities" data-section="qualities">
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

  </div>

  <div class="modern-right">

    <section class="section-experience" data-section="experience">
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section class="section-education" data-section="education">
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

    <section class="section-about" data-section="about">
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

  </div>

</div>

`,

  sidebar: () => `

<div class="sidebar-layout">

    <aside class="sidebar-left" data-layout-column="left">

        <div class="photo-frame">
            <div class="photo-inner">
                <img class="js-photo">
            </div>
        </div>

        <h2 class="js-name"></h2>

        <section class="section-contact" data-section="contact">
            <h3>${L.contact}</h3>
            <div class="js-contact"></div>
        </section>

        <section class="section-skills" data-section="skills">
            <h3>${L.skills}</h3>
            <div class="js-skills"></div>
        </section>

        <section class="section-qualities" data-section="qualities">
            <h3>${L.qualities}</h3>
            <div class="js-qualities"></div>
        </section>

    </aside>

    <main class="sidebar-right" data-layout-column="right">

        <section class="section-experience" data-section="experience">
            <h3>${L.experience}</h3>
            <div class="js-experience"></div>
        </section>

        <section class="section-education" data-section="education">
            <h3>${L.education}</h3>
            <div class="js-education"></div>
        </section>

        <section class="section-about" data-section="about">
            <h3>${L.about}</h3>
            <div class="js-about"></div>
        </section>

    </main>

</div>

`,
  corporate: () => `

<header class="corporate-top">

    <div>

        <h1 class="js-name"></h1>

        <div class="corporate-contact">
            <span class="js-contact"></span>
        </div>

    </div>

    <div class="photo-frame">
        <div class="photo-inner">
            <img class="js-photo">
        </div>
    </div>

</header>

<div class="corporate-sections" data-layout-column="main">

    <section class="section-experience" data-section="experience">
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
    </section>

    <section class="section-education" data-section="education">
        <h3>${L.education}</h3>
        <p class="js-education"></p>
    </section>

    <section class="section-skills" data-section="skills">
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
    </section>

    <section class="section-qualities" data-section="qualities">
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
    </section>

    <section class="section-about" data-section="about">
        <h3>${L.about}</h3>
        <p class="js-about"></p>
    </section>

</div>

`,
  creative: () => `

<div class="creative-layout">

  <div class="creative-header">

    <div class="photo-frame">
      <div class="photo-inner">
        <img class="js-photo">
      </div>
    </div>

    <h1 class="name js-name"></h1>

    <p class="creative-job">Resume</p>

  </div>

  <div class="creative-content">

    <div class="creative-left" data-layout-column="left">

      <section class="section-contact" data-section="contact">
        <h3>${L.contact}</h3>
        <p class="js-contact"></p>
      </section>

      <section class="section-skills" data-section="skills">
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>

      <section class="section-qualities" data-section="qualities">
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>

    </div>

    <div class="creative-right" data-layout-column="right">

      <section class="section-experience" data-section="experience">
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>

      <section class="section-education" data-section="education">
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>

      <section class="section-about" data-section="about">
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>

    </div>

  </div>

</div>

`,
  elegant: () => `

<div class="elegant-layout">

  <div class="elegant-header">

    <div class="photo-frame">
      <div class="photo-inner">
        <img class="js-photo">
      </div>
    </div>

    <h1 class="name js-name"></h1>

    <p class="elegant-job">${L.resume}</p>

  </div>

  <div class="elegant-grid">

    <div data-layout-column="left">

      <section class="section-contact" data-section="contact">
        <h3>${L.contact}</h3>
        <p class="js-contact"></p>
      </section>

      <section class="section-skills" data-section="skills">
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>

      <section class="section-qualities" data-section="qualities">
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>

    </div>

    <div data-layout-column="right">

      <section class="section-experience" data-section="experience">
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>

      <section class="section-education" data-section="education">
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>

      <section class="section-about" data-section="about">
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>

    </div>

  </div>

</div>

`,
  executive: () => `

<div class="executive-layout">

    <div class="executive-header">

        <div class="executive-title">

            <h1 class="js-name"></h1>

            <p class="js-contact"></p>

        </div>

        <div class="photo-frame">
            <div class="photo-inner">
                <img class="js-photo">
            </div>
        </div>

    </div>

    <div class="executive-grid">

        <div class="executive-left" data-layout-column="left">

            <section class="section-experience" data-section="experience">
                <h3>${L.experience}</h3>
                <p class="js-experience"></p>
            </section>

        </div>

        <div class="executive-right" data-layout-column="right">

            <section class="section-skills" data-section="skills">
                <h3>${L.skills}</h3>
                <p class="js-skills"></p>
            </section>

            <section class="section-education" data-section="education">
                <h3>${L.education}</h3>
                <p class="js-education"></p>
            </section>

            <section class="section-qualities" data-section="qualities">
                <h3>${L.qualities}</h3>
                <p class="js-qualities"></p>
            </section>

            <section class="section-about" data-section="about">
                <h3>${L.about}</h3>
                <p class="js-about"></p>
            </section>

        </div>

    </div>

</div>

`,
  tech: () => `

<div class="template-tech">

    <div class="tech-layout">

        <div class="tech-header">

            <div class="tech-title">
                <h1 class="js-name"></h1>
                <p class="tech-role">&lt; ${L.resume} /&gt;</p>
                <p class="js-contact"></p>
            </div>

            <div class="photo-frame">
                <div class="photo-inner">
                    <img class="js-photo">
                </div>
            </div>

        </div>

        <div class="tech-grid">

            <div class="tech-left" data-layout-column="left">

                <section class="section-skills" data-section="skills">
                    <h3>${L.skills}</h3>
                    <p class="js-skills"></p>
                </section>

                <section class="section-qualities" data-section="qualities">
                    <h3>${L.qualities}</h3>
                    <p class="js-qualities"></p>
                </section>

            </div>

            <div class="tech-right" data-layout-column="right">

                <section class="section-experience" data-section="experience">
                    <h3>${L.experience}</h3>
                    <p class="js-experience"></p>
                </section>

                <section class="section-education" data-section="education">
                    <h3>${L.education}</h3>
                    <p class="js-education"></p>
                </section>

                <section class="section-about" data-section="about">
                    <h3>${L.about}</h3>
                    <p class="js-about"></p>
                </section>

            </div>

        </div>

    </div>

</div>

`,
  minimal: () => `

<div class="template-minimal">

  <div class="minimal-layout">

    <!-- TOP STRIP -->
    <div class="minimal-header">

      <div class="minimal-title">
        <h1 class="js-name"></h1>
        <p class="minimal-role"></p>
      </div>

      <div class="photo-frame">
        <div class="photo-inner">
          <img class="js-photo">
        </div>
      </div>

    </div>

    <!-- TWO COLUMN BODY -->
    <div class="minimal-body">

      <!-- LEFT -->
      <div class="minimal-aside" data-layout-column="left">

        <section class="section-contact" data-section="contact">
          <h3>${L.contact}</h3>
          <p class="js-contact"></p>
        </section>

        <section class="section-skills" data-section="skills">
          <h3>${L.skills}</h3>
          <p class="js-skills"></p>
        </section>

        <section class="section-qualities" data-section="qualities">
          <h3>${L.qualities}</h3>
          <p class="js-qualities"></p>
        </section>

      </div>

      <!-- RIGHT -->
      <div class="minimal-main" data-layout-column="right">

        <section class="section-experience" data-section="experience">
          <h3>${L.experience}</h3>
          <p class="js-experience"></p>
        </section>

        <section class="section-education" data-section="education">
          <h3>${L.education}</h3>
          <p class="js-education"></p>
        </section>

        <section class="section-about" data-section="about">
          <h3>${L.about}</h3>
          <p class="js-about"></p>
        </section>

      </div>

    </div>

  </div>

</div>

`,
  designer: () => `

<div class="template-designer">

    <div class="designer-canvas">

        <div class="designer-shape shape-1"></div>
        <div class="designer-shape shape-2"></div>

        <div class="designer-hero">

            <div class="designer-title">

                <span class="designer-label">${L.resume}</span>

                <h1 class="js-name"></h1>

                <p class="js-contact"></p>

            </div>

            <div class="designer-photo">

                <div class="photo-frame">
                    <div class="photo-inner">
                        <img class="js-photo">
                    </div>
                </div>

            </div>

        </div>

        <div class="designer-divider"></div>

        <div class="designer-main" data-layout-column="main">

            <section class="experience section-experience" data-section="experience">
                <span class="number  js-section-number">01</span>
                <h3>${L.experience}</h3>
                <p class="js-experience"></p>
            </section>

            <section class="skills section-skills" data-section="skills">
                <span class="number  js-section-number">02</span>
                <h3>${L.skills}</h3>
                <p class="js-skills"></p>
            </section>

            <section class="education section-education" data-section="education">
                <span class="number  js-section-number">03</span>
                <h3>${L.education}</h3>
                <p class="js-education"></p>
            </section>

            <section class="qualities section-qualities" data-section="qualities">
                <span class="number  js-section-number">04</span>
                <h3>${L.qualities}</h3>
                <p class="js-qualities"></p>
            </section>

            <section class="about section-about" data-section="about">
                <span class="number">05</span>
                <h3>${L.about}</h3>
                <p class="js-about"></p>
            </section>

        </div>

    </div>

</div>

`,
  dark: () => `

<div class="template-dark">

  <div class="dark-layout">

    <!-- HEADER -->
    <div class="dark-header">

      <div class="dark-title">
        <h1 class="js-name"></h1>
        <p class="js-contact"></p>
      </div>

      <div class="dark-photo">
        <img class="js-photo">
      </div>

    </div>

    <!-- CONTENT -->
    <div class="dark-content" data-layout-column="main">

      <section class="section-skills" data-section="skills">
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>

      <section class="section-experience" data-section="experience">
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>

      <section class="section-education" data-section="education">
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>

      <section class="section-qualities" data-section="qualities">
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>

      <section class="section-about" data-section="about">
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>

    </div>

  </div>

</div>

`,
  editorial: () => `
<div class="template-editorial">

  <header class="editorial-header">
    <div class="editorial-label">${L.resume}</div>
    <h1 class="js-name"></h1>
    <p class="js-contact"></p>
  </header>

  <div class="editorial-divider"></div>

  <!-- Основной поток -->
  <div class="editorial-layout" data-layout-column="main">

    <section
      class="editorial-section editorial-qualities section-qualities"
      data-section="qualities"
    >
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

    <section
      class="editorial-section editorial-experience section-experience"
      data-section="experience"
    >
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section
      class="editorial-section editorial-about section-about"
      data-section="about"
    >
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

  </div>

  <!-- Двухколоночный блок -->
  <div class="editorial-grid" data-layout-column="grid">

    <section
      class="editorial-section section-education"
      data-section="education"
    >
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

    <section
      class="editorial-section section-skills"
      data-section="skills"
    >
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

  </div>

</div>
`,
  fashion: () => `
<div class="template-fashion">

  <aside class="fashion-sidebar" data-layout-column="left">
    <div class="fashion-photo">
      <img class="js-photo">
    </div>

    <div class="fashion-name-block">
      <h1 class="js-name"></h1>
    </div>

    <section class="fashion-side-section section-skills" data-section="skills">
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section class="fashion-side-section section-qualities" data-section="qualities">
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>
  </aside>

  <main class="fashion-main" data-layout-column="right">
    <section class="fashion-contact section-contact" data-section="contact">
      <h3>${L.contact}</h3>
      <p class="js-contact"></p>
    </section>

    <section class="fashion-main-section section-experience" data-section="experience">
      <div class="fashion-heading">
        <h3>${L.experience}</h3>
      </div>
      <p class="js-experience"></p>
    </section>

    <section class="fashion-main-section section-education" data-section="education">
      <div class="fashion-heading">
        <h3>${L.education}</h3>
      </div>
      <p class="js-education"></p>
    </section>

    <section class="fashion-main-section section-about" data-section="about">
      <div class="fashion-heading">
        <h3>${L.about}</h3>
      </div>
      <p class="js-about"></p>
    </section>
  </main>

</div>
`,
  ats: () => `
<div class="template-ats">

  <header class="ats-header">
    <h1 class="js-name"></h1>
    <p class="ats-contact js-contact"></p>
  </header>

  <div class="ats-content" data-layout-column="main">

    <section class="ats-section section-experience" data-section="experience">
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section class="ats-section section-education" data-section="education">
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

    <section class="ats-section section-skills" data-section="skills">
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section class="ats-section section-qualities" data-section="qualities">
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

    <section class="ats-section section-about" data-section="about">
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

  </div>

</div>
`,
  highlight: () => `
<div class="template-highlight">

  <header class="highlight-hero">

    <div class="highlight-photo">
      <img class="js-photo">
    </div>

    <h1 class="js-name"></h1>

    <p class="highlight-contact js-contact"></p>

  </header>

  <div class="highlight-body">

    <aside class="highlight-left" data-layout-column="left">

      <section
        class="section-skills"
        data-section="skills"
      >
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>

      <section
        class="section-education"
        data-section="education"
      >
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>

      <section
        class="section-qualities"
        data-section="qualities"
      >
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>

    </aside>

    <main class="highlight-right" data-layout-column="right">

      <section
        class="section-experience"
        data-section="experience"
      >
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>

      <section
        class="highlight-about-section section-about"
        data-section="about"
      >
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>

    </main>

  </div>

</div>
`,
  grid: () => `
<div class="template-grid">

  <header class="grid-header">
    <div class="grid-title">
      <h1 class="js-name"></h1>
    </div>

    <div class="grid-photo">
      <img class="js-photo">
    </div>
  </header>

  <main class="grid-layout" data-layout-column="main">

    <section
      class="grid-panel grid-blue section-contact"
      data-section="contact"
    >
      <h3>${L.contact}</h3>
      <p class="js-contact"></p>
    </section>

    <section
      class="grid-panel section-experience"
      data-section="experience"
    >
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section
      class="grid-panel section-skills"
      data-section="skills"
    >
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section
      class="grid-panel section-education"
      data-section="education"
    >
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

    <section
      class="grid-panel section-qualities"
      data-section="qualities"
    >
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

    <section
      class="grid-panel grid-about section-about"
      data-section="about"
    >
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

  </main>

</div>
`,
  "premium-sidebar": () => `
<div class="template-premium-sidebar-inner">

  <aside class="premium-sidebar-left" data-layout-column="left">

    <div class="premium-photo">
      <img class="js-photo">
    </div>

    <section class="premium-section section-contact" data-section="contact">
      <h3>${L.contact}</h3>
      <p class="js-contact"></p>
    </section>

    <section class="premium-section section-skills" data-section="skills">
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section class="premium-section section-qualities" data-section="qualities">
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

  </aside>

  <main class="premium-sidebar-right" data-layout-column="right">

    <header class="premium-sidebar-header">
      <h1 class="js-name"></h1>
      <p class="premium-sidebar-role">Professional Resume</p>
    </header>

    <section class="premium-section section-about" data-section="about">
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

    <section class="premium-section section-experience" data-section="experience">
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section class="premium-section section-education" data-section="education">
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

  </main>

</div>
`,
};
