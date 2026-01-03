const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = null;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0' || currentOperand === 'Error') {
        return;
    }
    
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(number) {
    if (currentOperand === 'Error') {
        currentOperand = '0';
    }
    
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }
    
       if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === 'Error') {
        return;
    }
    
    if (operation !== null && previousOperand !== '') {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
        if (operation === '+') {
        result = prev + current;
    } else if (operation === '−') {
        result = prev - current;
    } else if (operation === '×') {
        result = prev * current;
    } else if (operation === '÷') {
        if (current === 0) {
            currentOperand = 'Error';
            previousOperand = '';
            operation = null;
            updateDisplay();
            return;
        }
        result = prev / current;
    } else if (operation === '%') {
        result = prev % current;
    } else {
        return;
    }
    
       result = Math.round(result * 100000000) / 100000000;
    
    currentOperand = result.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        appendNumber(this.textContent);
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
        chooseOperation(this.textContent);
    });
}

equalsButton.addEventListener('click', calculate);

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', deleteNumber);

document.addEventListener('keydown', function(e) {
   
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    }
        
    if (e.key === '.') {
        appendNumber('.');
    }
    
      if (e.key === '+') {
        chooseOperation('+');
    }
    if (e.key === '-') {
        chooseOperation('−');
    }
    if (e.key === '*') {
        chooseOperation('×');
    }
    if (e.key === '/') {
        e.preventDefault();
        chooseOperation('÷');
    }
    if (e.key === '%') {
        chooseOperation('%');
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        calculate();
    }
    
   
    if (e.key === 'Escape') {
        clear();
    }
    
    
    if (e.key === 'Backspace') {
        deleteNumber();
    }
});


updateDisplay();