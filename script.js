document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");

  const home = document.getElementById("home");
  const calculator = document.getElementById("calculator");
  const planner = document.getElementById("planner");

  const goCalculator = document.getElementById("go-calculator");
  const goPlanner = document.getElementById("go-planner");
  const backButtons = document.querySelectorAll(".back-btn");

  goCalculator.addEventListener("click", () => {
    home.classList.add("hidden");
    calculator.classList.remove("hidden");
  });

  goPlanner.addEventListener("click", () => {
    home.classList.add("hidden");
    planner.classList.remove("hidden");
  });

  backButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      calculator.classList.add("hidden");
      planner.classList.add("hidden");
      home.classList.remove("hidden");
    });
  });
});
