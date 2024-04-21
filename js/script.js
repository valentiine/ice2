"use strict";
/*
 * Author: Valentine Sah
 * Date: Feb 23 2024
 * File Name: calculator.js
 * Description: This script provides functionality for a basic calculator.
 */
const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');
keys.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('button')) {
        const key = target;
        const action = key.dataset.action;
        const keyContent = key.textContent || '';
        const displayedNum = display.textContent || '0';
        const previousKeyType = calculator.dataset.previousKeyType;
        // Handling number keys
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            }
            else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        // Handling decimal key
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        // Handling clear-all key
        if (action === 'clear-all') {
            clearCalculator();
        }
        // Handling clear-entry key
        if (action === 'clear-entry') {
            if (displayedNum.length > 1) {
                display.textContent = displayedNum.substring(0, displayedNum.length - 1);
            }
            else {
                display.textContent = '0';
            }
            calculator.dataset.previousKeyType = 'clear-entry';
        }
        // Handling operator keys
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
            calculator.dataset.firstValue = displayedNum;
        }
        // Handling calculate key
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
});
// Function to perform calculation
function calculate(firstValue, operator, secondValue) {
    if (!firstValue || !operator) {
        return '0';
    }
    const firstNum = parseFloat(firstValue);
    const secondNum = parseFloat(secondValue);
    let result = '';
    switch (operator) {
        case 'add':
            result = (firstNum + secondNum).toString();
            break;
        case 'subtract':
            result = (firstNum - secondNum).toString();
            break;
        case 'multiply':
            result = (firstNum * secondNum).toString();
            break;
        case 'divide':
            if (secondNum === 0) {
                showError('Cannot divide by zero');
                return '0';
            }
            result = (firstNum / secondNum).toString();
            break;
        default:
            showError('Invalid operator');
            return '0';
    }
    return result;
}
// Function to clear calculator
function clearCalculator() {
    display.textContent = '0';
    const data = calculator.dataset;
    delete data.previousKeyType;
    delete data.firstValue;
    delete data.operator;
}
// Function to show error message
function showError(errorMessage) {
    alert(errorMessage);
    display.textContent = '0';
}
