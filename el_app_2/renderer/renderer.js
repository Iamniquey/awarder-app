let score = 0;
let showPreview = -1;
let lastRecord = null;
// let sessionRecord = [];
let sessionRecord = [
  { award: "+10 for perfect production", score: 10 },
  { award: "+5 for vocab review", score: 5 },
  { award: "+2 for grammar", score: 2 },
  { award: "+1 for careful thinking", score: 1 },
  { award: "+3 for great conversation for great conversation for great conversation for great conversation for great conversation", score: 3 },

];



const awardAreaDiv = document.getElementById("award-area");
const scoreDiv = document.getElementById("score");
const displayDiv = document.getElementById("display");

const awardInput = document.getElementById("award");
const awardNumberInput = document.getElementById("award-number");

const form = document.getElementById("form");
const pasteImg = document.getElementById("paste-img");
const textShortcutsDiv = document.getElementById("text-shortcuts");
const numberShortcutsDiv = document.getElementById("number-shortcuts");

const buttonEx = document.getElementById("ex");
const buttonPaste = document.getElementById("paste");
const buttonSubmit = document.getElementById("submit");
const buttonDeleteLast = document.getElementById("delete-last");
const buttonReset = document.getElementById("reset");
const buttonPreview = document.getElementById("preview");
const buttonFinal = document.getElementById("final");
const buttonReturn = document.getElementById("return");

const sessionRecordDiv = document.getElementById("session-record");
const finalAreaDiv = document.getElementById("final-area");
const width550Div = document.getElementById("width-550");
const scoreAnimatedDiv = document.getElementById("score-animated");
const smile1Div = document.getElementById("smile-1");
const smile2Div = document.getElementById("smile-2");
const finalRecordDiv = document.getElementById("final-record");

const audioAdd = document.getElementById("audio-add");
const audioSuccess = document.getElementById("audio-success");

const textShortcuts = [
  { value: "vocab review", label: "vocab" },
  { value: "grammar", label: "gram" },
  { value: "perfect production", label: "perf" },
  { value: "fast production", label: "fast" },
  { value: "great conversation", label: "conv" },
  { value: "saying 'I don't remember' fast", label: "idr" },
  { value: "saying 'I don't know' fast", label: "idk" },
  { value: "use", label: "use" },
  { value: "pronunciation", label: "pron" },
  { value: "sentence making", label: "sent" },
  { value: "careful thinking", label: "think" },
];

const numberShortcuts = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
];

// ============================================================

// Set up
updateScore(0);
sessionRecordDiv.style.display = "none";
buttonDeleteLast.disabled = true;
generateShortcuts();

// Event Listeners
buttonFinal.addEventListener("click", handleFinal);
buttonReturn.addEventListener("click", handleReturn);
buttonEx.addEventListener("click", handleClear);
buttonPaste.addEventListener("click", handlePaste);
buttonSubmit.addEventListener("click", (e) => handleSubmit(e));
buttonPreview.addEventListener("click", handlePreview);
buttonDeleteLast.addEventListener("click", handleDeleteLast);
buttonReset.addEventListener("click", handleReset);

// Functions
function handlePreview() {
  showPreview *= -1;
  if (showPreview === -1) {
    sessionRecordDiv.style.display = "none";
    return;
  }
  sessionRecordDiv.style.display = "block";
}

function handleFinal() {
  awardAreaDiv.classList.add("award-area-hidden");
  finalAreaDiv.classList.remove("final-area-hidden");
  sessionRecordDiv.style.display = "none";
  audioSuccess.play();
}

function handleReturn() {
  awardAreaDiv.classList.remove("award-area-hidden");
  finalAreaDiv.classList.add("final-area-hidden");
}

function handleClear() {
  awardInput.value = "";
  awardNumberInput.value = 0;
}

async function handlePaste() {
  const text =
    (await window.electronAPI?.readClipboardText?.()) ??
    (await navigator.clipboard.readText().catch(() => ""));
  awardInput.value += ` of '${text}'`;
}

function handleSubmit(e) {
  e.preventDefault();

  const award = awardInput.value.trim();
  const awardNumber = Number(awardNumberInput.value);

  if (award && awardNumber) {
    audioAdd.play();

    buttonDeleteLast.disabled = false;
    updateScore(awardNumber);

    const newAward = `+${awardNumber} for ${award}`;
    sessionRecord.push({ award: newAward, score: awardNumber });

    updateSessionRecord();

    displayDiv.textContent = `You got ${newAward}!`;
    displayDiv.classList.add("display-anim");
    e.target.disabled = true; // disable submit button

    const timeout = setTimeout(() => {
      displayDiv.classList.remove("display-anim");
      e.target.disabled = false;
      clearTimeout(timeout);
    }, 3000);

    handleClear();
  }
}

function handleReset() {
  updateScore(0, true);
  buttonDeleteLast.disabled = true;
  lastRecord = null;
  updateSessionRecord(true);
}

function handleDeleteLast() {
  const lastRecord = sessionRecord.pop();
  updateScore(-lastRecord.score);
  updateSessionRecord();

  if (sessionRecord.length === 0) {
    buttonDeleteLast.disabled = true;
  }
}

function generateShortcuts() {
  textShortcuts.forEach((shortcut) => {
    const button = createShortcutButton(shortcut);
    textShortcutsDiv.appendChild(button);
  });

  numberShortcuts.forEach((shortcut) => {
    const button = createShortcutButton(shortcut, true);
    numberShortcutsDiv.appendChild(button);
  });
}

// Helper functions
function updateScore(awardNumber, clear = false) {
  if (clear) {
    score = 0;
  } else {
    score += awardNumber;
  }
  scoreDiv.textContent = score;
  scoreAnimatedDiv.textContent = score;
}

function updateSessionRecord(clear = false) {
  if (clear) sessionRecord = [];

  sessionRecordDiv.querySelector("ul").innerHTML = "";
  finalRecordDiv.querySelector("ul").innerHTML = "";
  sessionRecord.forEach((record) => {
    const id = Date.now();
    const newRecordItem1 = document.createElement("li");
    const newRecordItem2 = document.createElement("li");
    newRecordItem1.textContent = record.award;
    // newRecordItem1.id = `session-${id}`;
    newRecordItem2.textContent = record.award;
    // newRecordItem2.id = `final-${id}`;
    sessionRecordDiv.querySelector("ul").appendChild(newRecordItem1);
    finalRecordDiv.querySelector("ul").appendChild(newRecordItem2);
  });
}

function createShortcutButton(shortcut, isNumber = false) {
  const button = document.createElement("button");
  button.classList.add("btn-warm");
  button.textContent = shortcut.label;
  button.addEventListener("click", () => {
    if (isNumber) {
      awardNumberInput.value = Number(awardNumberInput.value) + shortcut.value;
    } else {
      awardInput.value += ` ${shortcut.value}`;
    }
  });
  return button;
}
