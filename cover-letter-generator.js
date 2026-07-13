const form = document.getElementById("coverLetterForm");

const output = document.getElementById("letterOutput");
const result = document.getElementById("letterResult");
const empty = document.getElementById("letterEmptyState");

const counter = document.getElementById("experienceCounter");
const experience = document.getElementById("experience");

const wordCounter = document.getElementById("letterWordCount");

const copyBtn = document.getElementById("copyLetterBtn");
const downloadBtn = document.getElementById("downloadLetterBtn");
const regenerateBtn = document.getElementById("regenerateLetterBtn");

const copyStatus = document.getElementById("letterCopyStatus");

experience.addEventListener("input", () => {
  counter.textContent = experience.value.length;
});

const intros = [
  "Здравствуйте!",
  "Добрый день!",
  "Здравствуйте, уважаемая команда!",
];

const endings = [
  "Буду рад обсудить свою кандидатуру на собеседовании.",
  "Спасибо за уделённое время. Буду рад ответить на ваши вопросы.",
  "Надеюсь получить возможность рассказать о себе подробнее.",
];

const toneMap = {
  professional:
    "Уверен, что мои знания и опыт позволят быть полезным вашей компании.",

  confident:
    "Уверен, что смогу быстро приносить реальную пользу вашей команде.",

  friendly: "Буду рад стать частью вашей команды и познакомиться лично.",

  concise: "Готов обсудить детали сотрудничества в удобное для вас время.",
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLetter() {
  const name = document.getElementById("applicantName").value.trim();

  const job = document.getElementById("jobTitle").value.trim();

  const company = document.getElementById("companyName").value.trim();

  const level = document.getElementById("experienceLevel").value;

  const exp = document.getElementById("experience").value.trim();

  const skills = document.getElementById("skills").value.trim();

  const reason = document.getElementById("companyReason").value.trim();

  const achievement = document.getElementById("achievement").value.trim();

  const tone = toneMap[document.getElementById("letterTone").value];

  let introExp = "";

  switch (level) {
    case "beginner":
      introExp =
        "Несмотря на небольшой опыт, я активно развиваюсь и постоянно совершенствую свои профессиональные навыки.";
      break;

    case "middle":
      introExp =
        "За время своей работы я успел приобрести практический опыт и успешно применять его в реальных проектах.";
      break;

    case "experienced":
      introExp =
        "За годы профессиональной деятельности я реализовал множество проектов и накопил значительный практический опыт.";
      break;

    case "career-change":
      introExp =
        "Сейчас я меняю профессиональное направление и уже получил необходимые знания, чтобы успешно развиваться в новой сфере.";
      break;
  }

  let letter = `${random(intros)}

Меня заинтересовала вакансия "${job}" в компании ${company}.

${introExp}

${exp}

Мои ключевые навыки: ${skills}.

${achievement ? achievement + "\n\n" : ""}

Меня особенно привлекла ваша компания, потому что ${reason}.

${tone}

${random(endings)}

С уважением,

${name}`;

  output.textContent = letter;

  empty.hidden = true;
  result.hidden = false;

  const words = letter.trim().split(/\s+/).length;

  wordCounter.textContent = `${words} слов`;

  copyStatus.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  generateLetter();
});

regenerateBtn.addEventListener("click", generateLetter);

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent);

  copyStatus.textContent = "Письмо скопировано.";
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([output.textContent], {
    type: "text/plain;charset=utf-8",
  });

  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);

  a.download = "cover-letter.txt";

  a.click();

  URL.revokeObjectURL(a.href);
});
