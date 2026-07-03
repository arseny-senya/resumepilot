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

    <section>
      <h3>${L.skills}</h3>
      <p class="js-skills"></p>
    </section>

    <section>
      <h3>${L.qualities}</h3>
      <p class="js-qualities"></p>
    </section>

  </div>

  <div class="modern-right">

    <section>
      <h3>${L.experience}</h3>
      <p class="js-experience"></p>
    </section>

    <section>
      <h3>${L.education}</h3>
      <p class="js-education"></p>
    </section>

    <section>
      <h3>${L.about}</h3>
      <p class="js-about"></p>
    </section>

  </div>

</div>

`,

  sidebar: () => `

<div class="sidebar-layout">

    <aside class="sidebar-left">

        <div class="photo-frame">
            <div class="photo-inner">
                <img class="js-photo">
            </div>
        </div>

        <h2 class="js-name"></h2>

        <section>
            <h3>${L.contact}</h3>
            <div class="js-contact"></div>
        </section>

        <section>
            <h3>${L.skills}</h3>
            <div class="js-skills"></div>
        </section>

        <section>
            <h3>${L.qualities}</h3>
            <div class="js-qualities"></div>
        </section>

    </aside>

    <main class="sidebar-right">

        <section>
            <h3>${L.experience}</h3>
            <div class="js-experience"></div>
        </section>

        <section>
            <h3>${L.education}</h3>
            <div class="js-education"></div>
        </section>

        <section>
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

<section>

<h3>${L.experience}</h3>

<p class="js-experience"></p>

</section>

<section>

<h3>${L.education}</h3>

<p class="js-education"></p>

</section>

<section>

<h3>${L.skills}</h3>

<p class="js-skills"></p>

</section>

<section>

<h3>${L.qualities}</h3>

<p class="js-qualities"></p>

</section>

<section>

<h3>${L.about}</h3>

<p class="js-about"></p>

</section>

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

<p class="creative-job">
Resume
</p>

</div>

<div class="creative-content">

<div class="creative-left">

<section>
<h3>${L.contact}</h3>
<p class="js-contact"></p>
</section>

<section>
<h3>${L.skills}</h3>
<p class="js-skills"></p>
</section>

<section>
<h3>${L.qualities}</h3>
<p class="js-qualities"></p>
</section>

</div>

<div class="creative-right">

<section>
<h3>${L.experience}</h3>
<p class="js-experience"></p>
</section>

<section>
<h3>${L.education}</h3>
<p class="js-education"></p>
</section>

<section>
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

<p class="elegant-job">
${L.resume}
</p>

</div>

<div class="elegant-grid">

<div>

<section>
<h3>${L.contact}</h3>
<p class="js-contact"></p>
</section>

<section>
<h3>${L.skills}</h3>
<p class="js-skills"></p>
</section>

<section>
<h3>${L.qualities}</h3>
<p class="js-qualities"></p>
</section>

</div>

<div>

<section>
<h3>${L.experience}</h3>
<p class="js-experience"></p>
</section>

<section>
<h3>${L.education}</h3>
<p class="js-education"></p>
</section>

<section>
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

        <div class="executive-left">

            <section>
                <h3>${L.experience}</h3>
                <p class="js-experience"></p>
            </section>

        </div>

        <div class="executive-right">

            <section>
                <h3>${L.skills}</h3>
                <p class="js-skills"></p>
            </section>

            <section>
                <h3>${L.education}</h3>
                <p class="js-education"></p>
            </section>

            <section>
                <h3>${L.qualities}</h3>
                <p class="js-qualities"></p>
            </section>

            <section>
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

            <div class="tech-left">

                <section>
                    <h3>${L.skills}</h3>
                    <p class="js-skills"></p>
                </section>

                <section>
                    <h3>${L.qualities}</h3>
                    <p class="js-qualities"></p>
                </section>

            </div>

            <div class="tech-right">

                <section>
                    <h3>${L.experience}</h3>
                    <p class="js-experience"></p>
                </section>

                <section>
                    <h3>${L.education}</h3>
                    <p class="js-education"></p>
                </section>

                <section>
                    <h3>${L.about}</h3>
                    <p class="js-about"></p>
                </section>

            </div>

        </div>

    </div>

</div>

`,

  minimal: () => `<div class="template-minimal">

  <div class="minimal-layout">

    <!-- TOP STRIP (editorial style) -->
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

      <!-- LEFT (meta info column) -->
      <div class="minimal-aside">

        <section>
          <h3>${L.contact}</h3>
          <p class="js-contact"></p>
        </section>

        <section>
          <h3>${L.skills}</h3>
          <p class="js-skills"></p>
        </section>

        <section>
          <h3>${L.qualities}</h3>
          <p class="js-qualities"></p>
        </section>

      </div>

      <!-- RIGHT (main editorial content) -->
      <div class="minimal-main">

        <section>
          <h3>${L.experience}</h3>
          <p class="js-experience"></p>
        </section>

        <section>
          <h3>${L.education}</h3>
          <p class="js-education"></p>
        </section>

        <section>
          <h3>${L.about}</h3>
          <p class="js-about"></p>
        </section>

      </div>

    </div>

  </div>

</div>`,
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

        <div class="designer-main">

            <section class="experience">
                <span class="number">01</span>
                <h3>${L.experience}</h3>
                <p class="js-experience"></p>
            </section>

            <section class="skills">
                <span class="number">02</span>
                <h3>${L.skills}</h3>
                <p class="js-skills"></p>
            </section>

            <section class="education">
                <span class="number">03</span>
                <h3>${L.education}</h3>
                <p class="js-education"></p>
            </section>

            <section class="qualities">
                <span class="number">04</span>
                <h3>${L.qualities}</h3>
                <p class="js-qualities"></p>
            </section>

            <section class="about">
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
    <div class="dark-content">

      <section>
        <h3>${L.skills}</h3>
        <p class="js-skills"></p>
      </section>

      <section>
        <h3>${L.experience}</h3>
        <p class="js-experience"></p>
      </section>

      <section>
        <h3>${L.education}</h3>
        <p class="js-education"></p>
      </section>

      <section>
        <h3>${L.qualities}</h3>
        <p class="js-qualities"></p>
      </section>

      <section>
        <h3>${L.about}</h3>
        <p class="js-about"></p>
      </section>

    </div>

  </div>

</div>

`,
};
