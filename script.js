const display = document.querySelector(".display");
const hello = document.querySelector("#hello");
const operation = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
};
let num1 = null;
let num2 = null;
let op = null;
let output = false;

const operate = (op, num1, num2) => {
  output = true;
  return operation[op](num1, num2);
};

function calculatorLogic(input) {
  if (isFinite(input)) {
    if (output === true) {
      display.value = "";
      output = false;
    }
    display.value = display.value + input;
  } else {
    if (input === ".") {
      if (display.value.includes(".")) return;
      display.value = display.value.concat(".");
      console.log(display.value);
      return;
    }
    // resetting when AC in encountered and return
    if (input === "AC") {
      num1 = null;
      num2 = null;
      op = null;
      display.value = "";
      return;
    }
    // delteing LSB of an integer from display and return
    if (input === "C" || input === "Backspace") {
      if (!display.value) return;
      if (display.value.length === 1) display.value = "";
      let str = display.value;
      display.value = str.slice(0, -1);
      return;
    }
    // performing percentage operation if any number in display exist and return
    if (input === "%") {
      if (!display.value) return;
      display.value = display.value / 100;
      return;
    }
    // performing opration based on operator we got and return and assign result to num1 for making next operation ready using num2
    if (input === "=" && num1 != null) {
      num2 = Number(display.value);
      num1 = operate(op, num1, num2);
      display.value = num1;
      num2 = null;
      num1 = null;
      return;
    }
    // assigning num1 a number if num1 is null as first operand
    if (num1 === null) {
      num1 = Number(display.value);
      op = input;
      display.value = "";
    } else {
      num2 = Number(display.value);
      num1 = operate(op, num1, num2);
      num2 = null;
      display.value = num1;
      op = input;
    }
  }
}

const button = document.querySelectorAll("button");
button.forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(el.value);
    calculatorLogic(el.value);
  })
);

// restrecting key in input field
document.addEventListener("keydown", (e) => {
  // cons1ole.log(e.key);
  const regex = /^(?:[0-9\-+x.\b]|Backspace)$/;
  if (regex.test(e.key)) {
    console.log(e.key);
    calculatorLogic(e.key);
  }
});
