let currentValue, currentType, firstValue, secondValue, operand, displayValue = null;
let firstOperation = true;

const multiplySymbol = '×';
const divisionSymbol = '÷';

const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");
const clear = document.querySelector(".clear");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const period = document.querySelector(".period");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const equals = document.querySelector(".equals");

const resultText = document.querySelector(".result")

one.addEventListener("click", () => {
    currentValue = 1;
    currentType = "num";
    update();
});

two.addEventListener("click", () => {
    currentValue = 2;
    currentType = "num";
    update();
});

three.addEventListener("click", () => {
    currentValue = 3;
    currentType = "num";
    update();
});

four.addEventListener("click", () => {
    currentValue = 4;
    currentType = "num";
    update();
});

five.addEventListener("click", () => {
    currentValue = 5;
    currentType = "num";
    update();
});

six.addEventListener("click", () => {
    currentValue = 6;
    currentType = "num";
    update();
});

seven.addEventListener("click", () => {
    currentValue = 7;
    currentType = "num";
    update();
});

eight.addEventListener("click", () => {
    currentValue = 8;
    currentType = "num";
    update();
});

nine.addEventListener("click", () => {
    currentValue = 9;
    currentType = "num";
    update();
});

zero.addEventListener("click", () => {
    currentValue = 0;
    currentType = "num";
    update();
});

divide.addEventListener("click", () => {
    currentValue = divisionSymbol;
    currentType = "op";
    update();
})

multiply.addEventListener("click", () => {
    currentValue = multiplySymbol;
    currentType = "op";
    update();
})

plus.addEventListener("click", () => {
    currentValue = "+";
    currentType = "op";
    update();
})

minus.addEventListener("click", () => {
    currentValue = "-";
    currentType = "op";
    update();
})

clear.addEventListener("click", () => {
    clearFunc();
});

equals.addEventListener("click", () => {
    operate();
});

function plusOperation(first, second) {
    return first + second;
}

function minusOperation(first, second) {
    return first - second;
}

function multiplyOperation(first, second) {
    return first * second;
}

function divideOperation(first, second) {
    if (second == 0) {
        alert("Are you trying to cause a black hole?");
    } else {
        return first / second;
    }
}

//Credit to Matthew Layton https://stackoverflow.com/users/1033686/matthew-layton
Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function getIntegerDigitCount(number) {
  const numStr = number.toString();
  const parts = numStr.split('.');
  return parts[0].length;
}

function updateCalcDisplay() {
    console.log("Length: " + String(firstValue).length);
    if (currentValue == null) {
        resultText.textContent = "";
    }
    if (firstValue != null) {
        resultText.textContent = cleanNumber(firstValue);
    }
    if (operand != null) {
        resultText.textContent = operand;
    }
    if (secondValue != null) {
        resultText.textContent = cleanNumber(secondValue);
    }
}

function cleanNumber(number) {
    if (String(number).length > 10) {
        return number.toPrecision(6);
    } else if (number.countDecimals() > 3) {
        return number.toPrecision(getIntegerDigitCount(number) + 3);
    } else {
        return number;
    }
}

// This occurs when we press number or operator
function update() {
    /*  If at fresh calculator state, expect a number as first entry
        Expect another number (9,9 => 99) or an operator as second entry
        Expect another number and not and operator as third entry

        If not at fresh state, equals press means repeat operand and second value
        Or new number means start over with that number as first value and
        empty second value and operand
                                                                            */

    // Fresh state   
    if (firstValue == null) {
        if (currentType == "op") {
            alert ("Please begin with a number.");
        } else {
            firstValue = currentValue;
        }
    } else if (firstValue != null && operand == null) {
        // Fresh state
        if (firstOperation) {
            if (currentType == "num") {
                firstValue = firstValue * 10 + currentValue;
                updateCalcDisplay();
            } else {
                operand = currentValue;
                updateCalcDisplay();
            }
        } else {
            if (currentType == "num") {
                let temp = currentValue;
                clearFunc();
                firstValue = temp;
                updateCalcDisplay();
            } else {
                operand = currentValue;
                updateCalcDisplay();
            }
        }
    } else if (secondValue == null) {
        if (currentType == "op") {
            alert("Please select another number, not an operator.");
        } else {
            secondValue = currentValue;
        }
    } else if (secondValue != null && currentType == "num") {
        secondValue = secondValue * 10 + currentValue;
    } else {
        alert("Please press = to perform the operation or C to start over.")
    }

    updateCalcDisplay();
}

function operate() {
    switch (operand) {
                case multiplySymbol: 
                    firstValue = multiplyOperation(firstValue, secondValue);
                    console.log("attempting to multiply")
                    break;
                case divisionSymbol:
                    firstValue = divideOperation(firstValue, secondValue);
                    console.log("attempting to divide");
                    break;
                case "+":
                    firstValue = plusOperation(firstValue, secondValue);
                    break;
                case "-":
                    firstValue = minusOperation(firstValue, secondValue); 
                    break;
            }
    firstOperation = false;
    currentValue = firstValue;
    operand = null;
    secondValue = null;
    updateCalcDisplay();
}

function clearFunc() {
    firstOperation = true;
    currentValue = null;
    currentType = null;
    firstValue = null;
    secondValue = null;
    operand = null;
    displayValue = null;
    updateCalcDisplay();
}