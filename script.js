// ---------- NAVIGATION ----------
const home = document.getElementById("home");
const calculator = document.getElementById("calculator");
const planner = document.getElementById("planner");

document.getElementById("go-calculator").onclick = () => {
  home.classList.add("hidden");
  calculator.classList.remove("hidden");
};

document.getElementById("go-planner").onclick = () => {
  home.classList.add("hidden");
  planner.classList.remove("hidden");
};

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.onclick = () => {
    calculator.classList.add("hidden");
    planner.classList.add("hidden");
    home.classList.remove("hidden");
  };
});

// ---------- GRADE CALCULATOR ----------
const subjectsDiv = document.getElementById("subjects");
const result = document.getElementById("result");

function addSubject() {
  const row = document.createElement("div");
  row.className = "subject-row";
  row.innerHTML = `
    <input type="number" placeholder="Grade">
    <input type="number" placeholder="Coefficient">
  `;
  subjectsDiv.appendChild(row);
}

document.getElementById("add-subject").onclick = addSubject;

// add first subject by default
addSubject();

document.getElementById("calculate").onclick = () => {
  const rows = document.querySelectorAll(".subject-row");
  let total = 0;
  let coefSum = 0;

  rows.forEach(row => {
    const grade = Number(row.children[0].value);
    const coef = Number(row.children[1].value);

    if (!isNaN(grade) && !isNaN(coef)) {
      total += grade * coef;
      coefSum += coef;
    }
  });

  if (coefSum === 0) {
    result.textContent = "Please enter grades and coefficients.";
    return;
  }

  result.textContent = `Weighted Average: ${(total / coefSum).toFixed(2)}`;
};

// ---------- PLANNER ----------
const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("month-title");

let currentDate = new Date();

function renderCalendar() {
  calendar.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    cell.onclick = () => {
      const note = prompt("Add exam / test / reminder:");
      if (note) {
        cell.classList.add("marked");
        cell.title = note;
      }
    };

    calendar.appendChild(cell);
  }
}

document.getElementById("prev-month").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next-month").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
