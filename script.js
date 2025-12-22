// Select the button and result paragraph
const button = document.getElementById("calculate");
const result = document.getElementById("result");

button.addEventListener("click", function() {
  // Get grades
  const grade1 = parseFloat(document.getElementById("grade1").value) || 0;
  const grade2 = parseFloat(document.getElementById("grade2").value) || 0;
  const grade3 = parseFloat(document.getElementById("grade3").value) || 0;

  // Get coefficients
  const coef1 = parseFloat(document.getElementById("coef1").value) || 1;
  const coef2 = parseFloat(document.getElementById("coef2").value) || 1;
  const coef3 = parseFloat(document.getElementById("coef3").value) || 1;

  // Calculate weighted average
  const weightedSum = grade1 * coef1 + grade2 * coef2 + grade3 * coef3;
  const totalCoef = coef1 + coef2 + coef3;
  const average = weightedSum / totalCoef;

  // Display result
  result.textContent = "Weighted Average: " + average.toFixed(2);
});

