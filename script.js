const prevTermBtn = document.getElementById("prev-term");
const nextTermBtn = document.getElementById("next-term");
const subjectsDiv = document.getElementById("subjects");
const addSubjectBtn = document.getElementById("add-subject");
const calculateBtn = document.getElementById("calculate");
const result = document.getElementById("result");
const scaleSelect = document.getElementById("scale");
const termTypeSelect = document.getElementById("term-type");
const termTitle = document.getElementById("current-term-title");

let currentTerm = 1;
let termsData = {
  1: [],
  2: [],
  3: []
};

function updateTermTitle() {
  termTitle.textContent = `Term ${currentTerm}`;
}

function renderSubjects() {
  subjectsDiv.innerHTML = "";

  termsData[currentTerm].forEach((_, index) => {
    const row = document.createElement("div");
    row.className = "grade-row";

    row.innerHTML = `
      <label>
        Subject grade
        <input type="number" class="grade" data-index="${index}">
      </label>

      <label>
        Coefficient
        <input type="number" class="coef" data-index="${index}">
      </label>
    `;

    subjectsDiv.appendChild(row);
  });
}

addSubjectBtn.addEventListener("click", () => {
  termsData[currentTerm].push({ grade: 0, coef: 0 });
  renderSubjects();
});

calculateBtn.addEventListener("click", () => {
  const grades = document.querySelectorAll(".grade");
  const coefs = document.querySelectorAll(".coef");
  const scale = Number(scaleSelect.value);

  let termTotal = 0;
  let termCoefSum = 0;

  grades.forEach((g, i) => {
    const grade = Number(g.value);
    const coef = Number(coefs[i].value);

    if (!isNaN(grade) && !isNaN(coef)) {
      const normalized = (grade / scale) * 20;
      termTotal += normalized * coef;
      termCoefSum += coef;
    }
  });

  if (termCoefSum === 0) {
    result.textContent = "Please add subjects with grades.";
    return;
  }

  const termAverage = termTotal / termCoefSum;

  termsData = {
  1: { subjects: [], average: null },
  2: { subjects: [], average: null },
  3: { subjects: [], average: null }
};

  let globalTotal = 0;
  let countedTerms = 0;

  const maxTerms = termTypeSelect.value === "semester" ? 2 : 3;

  for (let i = 1; i <= maxTerms; i++) {
    if (termsData[i].average) {
      globalTotal += termsData[i].average;
      countedTerms++;
    }
  }

  const globalAverage = (globalTotal / countedTerms).toFixed(2);

  result.textContent =
    `Term ${currentTerm} average: ${termAverage.toFixed(2)} / 20 | Global average: ${globalAverage} / 20`;
});

termTypeSelect.addEventListener("change", () => {
  currentTerm = 1;
  termsData = { 1: [], 2: [], 3: [] };
  updateTermTitle();
  renderSubjects();
});

prevTermBtn.addEventListener("click", () => {
  if (currentTerm > 1) {
    currentTerm--;
    updateTermTitle();
    renderSubjects();
    result.textContent = "";
  }
});

nextTermBtn.addEventListener("click", () => {
  const maxTerms = termTypeSelect.value === "semester" ? 2 : 3;
  if (currentTerm < maxTerms) {
    currentTerm++;
    updateTermTitle();
    renderSubjects();
    result.textContent = "";
  }
});


updateTermTitle();

const home = document.getElementById("home-screen");
const calculator = document.getElementById("calculator-screen");
const planner = document.getElementById("planner-screen");

document.getElementById("go-calculator").onclick = () => {
  home.classList.add("hidden");
  calculator.classList.remove("hidden");
};

document.getElementById("go-planner").onclick = () => {
  home.classList.add("hidden");
  planner.classList.remove("hidden");
};

document.querySelectorAll(".back").forEach(btn => {
  btn.onclick = () => {
    calculator.classList.add("hidden");
    planner.classList.add("hidden");
    home.classList.remove("hidden");
  };
});

