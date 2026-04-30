let score = 0;
let award = "";
let awardNumber = 0;
let sessionRecord = [];
let displayAnim = false;
let showFinal = false;
let showPreview = false;

const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const displayEl = document.getElementById("display");
const awardForm = document.getElementById("award-form");
const awardInput = document.getElementById("award-input");
const pointsInput = document.getElementById("points-input");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const pasteBtn = document.getElementById("paste-btn");
const resetBtn = document.getElementById("reset-btn");
const previewBtn = document.getElementById("preview-btn");
const finalBtn = document.getElementById("final-btn");
const returnBtn = document.getElementById("return-btn");
const awardArea = document.getElementById("award-area");
const previewArea = document.getElementById("preview-area");
const sessionRecordEl = document.getElementById("session-record");
const finalArea = document.getElementById("final-area");
const finalRecordEl = document.getElementById("final-record");
const rightSound = document.getElementById("right-sound");
const successSound = document.getElementById("success-sound");
const shortcutsContainer = document.getElementById("shortcuts");

const awardShortcuts = [
  ["vocab review", "vocab"],
  ["grammar", "gram"],
  ["perfect production", "perf"],
  ["fast production", "fast"],
  ["great conversation", "conv"],
  ["saying 'I don't remember' fast", "idr"],
  ["saying 'I don't know' fast", "idk"],
  ["use", "use"],
  ["pronunciation", "pron"],
  ["sentence making", "sent"],
  ["careful thinking", "think"],
];

const pointShortcuts = [1, 2, 3, 5, 10];

function sanitizeText(value) {
  const temp = document.createElement("div");
  temp.textContent = value ?? "";
  return temp.innerHTML;
}

function updateDisplayText(message = `+${awardNumber} for ${award}`) {
  displayEl.textContent = message;
}

function updateScore() {
  scoreEl.textContent = String(score);
  finalScoreEl.textContent = String(score);
}

function renderSessionRecords() {
  sessionRecordEl.innerHTML = "";
  finalRecordEl.innerHTML = "";
  sessionRecord.forEach((record) => {
    const previewLi = document.createElement("li");
    previewLi.textContent = record;
    sessionRecordEl.appendChild(previewLi);

    const finalLi = document.createElement("li");
    finalLi.textContent = record;
    finalRecordEl.appendChild(finalLi);
  });
}

function saveAllData() {
  const data = { score, sessionRecord };
  localStorage.setItem("allData", JSON.stringify(data));
}

function restoreData() {
  const data = JSON.parse(localStorage.getItem("allData"));
  if (data) {
    score = Number(data.score) || 0;
    sessionRecord = Array.isArray(data.sessionRecord) ? data.sessionRecord : [];
    updateScore();
    renderSessionRecords();
  }
}

function clearData() {
  localStorage.removeItem("allData");
}

function handleClear() {
  award = "";
  awardNumber = 0;
  awardInput.value = "";
  pointsInput.value = "0";
  updateDisplayText();
}

function setDisplayAnimation(active) {
  displayAnim = active;
  submitBtn.disabled = active;
  displayEl.classList.toggle("display-anim", active);
}

function showFinalState(active) {
  showFinal = active;
  awardArea.classList.toggle("award-area-hidden", active);
  finalArea.classList.toggle("final-area-hidden", !active);
  awardArea.style.display = active ? "none" : "";
  finalArea.style.display = active ? "" : "block";
}

function showPreviewState(active) {
  showPreview = active;
  previewArea.classList.toggle("page-hidden", !active);
}

function createShortcut(value, label, isPoints) {
  const btn = document.createElement("button");
  btn.className = "btn-warm";
  btn.textContent = label;
  btn.addEventListener("click", () => {
    if (isPoints) {
      awardNumber = Number(awardNumber) + Number(value);
      pointsInput.value = String(awardNumber);
    } else {
      award = `${award}${value}`;
      awardInput.value = award;
    }
  });
  return btn;
}

function renderShortcuts() {
  awardShortcuts.slice(0, 5).forEach(([value, label]) => {
    shortcutsContainer.appendChild(createShortcut(value, label, false));
  });

  const sep1 = document.createTextNode("| |");
  shortcutsContainer.appendChild(sep1);

  pointShortcuts.slice(0, 3).forEach((value) => {
    shortcutsContainer.appendChild(createShortcut(value, String(value), true));
  });

  shortcutsContainer.appendChild(document.createElement("br"));

  awardShortcuts.slice(5).forEach(([value, label]) => {
    shortcutsContainer.appendChild(createShortcut(value, label, false));
  });

  const sep2 = document.createTextNode("| |");
  shortcutsContainer.appendChild(sep2);

  pointShortcuts.slice(3).forEach((value) => {
    shortcutsContainer.appendChild(createShortcut(value, String(value), true));
  });
}

awardInput.addEventListener("input", (event) => {
  award = sanitizeText(event.target.value);
});

pointsInput.addEventListener("input", (event) => {
  const parsed = parseInt(event.target.value, 10);
  awardNumber = Number.isNaN(parsed) ? 0 : parsed;
});

awardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (award.trim() && awardNumber) {
    rightSound.play();
    const newAward = `+${awardNumber} for ${award}`;
    updateDisplayText(`You got ${newAward}!`);
    sessionRecord.push(newAward);
    renderSessionRecords();

    setDisplayAnimation(true);
    setTimeout(() => {
      setDisplayAnimation(false);
    }, 3000);

    score += awardNumber;
    updateScore();
    saveAllData();
    handleClear();
  }
});

clearBtn.addEventListener("click", handleClear);

pasteBtn.addEventListener("click", async () => {
  const text =
    (await window.electronAPI?.readClipboardText?.()) ??
    (await navigator.clipboard.readText().catch(() => ""));
  award = `${award} of '${text}'`;
  awardInput.value = award;
});

resetBtn.addEventListener("click", () => {
  score = 0;
  sessionRecord = [];
  updateScore();
  renderSessionRecords();
  clearData();
  handleClear();
  showPreviewState(false);
});

previewBtn.addEventListener("click", () => {
  showPreviewState(!showPreview);
});

finalBtn.addEventListener("click", () => {
  showPreviewState(false);
  showFinalState(true);
  successSound.play();
});

returnBtn.addEventListener("click", () => {
  showFinalState(false);
});

renderShortcuts();
restoreData();
updateDisplayText();
updateScore();
