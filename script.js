const subjectsDiv = document.getElementById("subjects");
const addSubjectBtn = document.getElementById("add-subject");
const calculateBtn = document.getElementById("calculate");
const result = document.getElementById("result");
const scaleSelect = document.getElementById("scale");


let subjectCount = 0;

addSubjectBtn.addEventListener("click", () => {
  subjectCount++;

  const row = document.createElement("div");
  row.className = "grade-row";

  row.innerHTML = `
    <label>
      Subject ${subjectCount} grade
      <input type="number" class="grade" placeholder="Grade">
    </label>

    <label>
      Coefficient
      <input type="number" class="coef" placeholder="Coef">
    </label>
  `;

  subjectsDiv.appendChild(row);
});

calculateBtn.addEventListener("click", () => {
  const grades = document.querySelectorAll(".grade");
  const coefs = document.querySelectorAll(".coef");

  let total = 0;
  let coefSum = 0;

  grades.forEach((gradeInput, index) => {
    const grade = Number(gradeInput.value);
    const coef = Number(coefs[index].value);

    if (!isNaN(grade) && !isNaN(coef)) {
     const scale = Number(scaleSelect.value);
     const normalizedGrade = (grade / scale) * 20;

     total += normalizedGrade * coef;
     coefSum += coef;

    }
  });

  if (coefSum === 0) {
    result.textContent = "Please enter at least one subject.";
    return;
  }

  const average = (total / coefSum).toFixed(2);
  result.textContent = `Weighted Average: ${average}`;
});
