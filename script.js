// Get the display input
const display = document.getElementById("display");

// Create a variable to store the calculation
let expression = "";

// History elements
let historyList = document.getElementById("historyList");
let historySection = document.getElementById("history");

// Select all calculator buttons
document
  .querySelectorAll(".calculator-btn button")

  // Loop through all buttons
  .forEach((button) => {
    // Add a click event to each button
    button.addEventListener("click", () => {
      // Read the button’s value
      let value = button.getAttribute("data-value");

      // Handle CLEAR (C)
      if (value === "C") {
        expression = "";
        display.value = "";

      // Runs when the delete button is clicked
      } else if (value === "DEL") {
        expression = expression.slice(0, -1);
        display.value = expression;

      // Runs when equals is clicked
      } else if (value === "=") {
        try {
          let safeExpression = expression.replace(/\^/g, "**");
          let result = eval(safeExpression).toString();

          // SAVE TO HISTORY
          let li = document.createElement("li");
          li.textContent = `${expression} = ${result}`;
          historyList.prepend(li);

          expression = result;
          display.value = result;
        } catch (error) {
          display.value = "Error";
          expression = "";
        }

      } else {
        expression += value;
        display.value = expression;
      }
    });
  });


/* =======Allow keyboard input for the calculator========= */

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    expression += key;
    display.value = expression;
  }

  else if (["+", "-", "*", "/", "%"].includes(key)) {
    expression += key;
    display.value = expression;
  }

  else if (key === "^") {
    expression += "^";
    display.value = expression;
  }

  else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  }

  else if (key === "Escape") {
    expression = "";
    display.value = "";
  }

  // SAVE HISTORY ON ENTER
  else if (key === "Enter") {
    event.preventDefault();
    try {
      let safeExpression = expression.replace(/\^/g, "**");
      let result = eval(safeExpression).toString();

      let li = document.createElement("li");
      li.textContent = `${expression} = ${result}`;
      historyList.prepend(li);

      expression = result;
      display.value = result;
    } catch {
      expression = "";
      display.value = "ERROR";
    }
  }
});

// Toggle History Display
function toggleHistory() {
  historySection.classList.toggle("hidden");
}