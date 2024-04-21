/*
 * Author: Valentine Sah
 * Date: Feb 23 2024
 * File Name: calculator.js
 * Description: This script provides functionality for a basic calculator.
 */

/// TypeScript Conversion of script.js
type CalculatorData = {
    previousKeyType?: string;
    operator?: string;
    firstValue?: string;
  };
  
  const calculator = document.querySelector('.calculator') as HTMLDivElement;
  const display = calculator.querySelector('.calculator__display') as HTMLDivElement;
  const keys = calculator.querySelector('.calculator__keys') as HTMLDivElement;
  
  keys.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;
    if (target.matches('button')) {
      const key = target;
      const action = key.dataset.action;
      const keyContent = key.textContent || '';
      const displayedNum = display.textContent || '0';
      const previousKeyType = (calculator.dataset as CalculatorData).previousKeyType;
  
      // Handling number keys
      if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
          display.textContent = keyContent;
        } else {
          display.textContent = displayedNum + keyContent;
        }
        (calculator.dataset as CalculatorData).previousKeyType = 'number';
      }
  
      // Handling decimal key
      if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.';
        } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
          display.textContent = '0.';
        }
        (calculator.dataset as CalculatorData).previousKeyType = 'decimal';
      }
  
      // Handling clear-all key
      if (action === 'clear-all') {
        clearCalculator();
      }
  
      // Handling clear-entry key
      if (action === 'clear-entry') {
        if (displayedNum.length > 1) {
          display.textContent = displayedNum.substring(0, displayedNum.length - 1);
        } else {
          display.textContent = '0';
        }
        (calculator.dataset as CalculatorData).previousKeyType = 'clear-entry';
      }
  
      // Handling operator keys
      if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        (calculator.dataset as CalculatorData).previousKeyType = 'operator';
        (calculator.dataset as CalculatorData).operator = action;
        (calculator.dataset as CalculatorData).firstValue = displayedNum;
      }
  
      // Handling calculate key
      if (action === 'calculate') {
        const firstValue = (calculator.dataset as CalculatorData).firstValue;
        const operator = (calculator.dataset as CalculatorData).operator;
        const secondValue = displayedNum;
  
        display.textContent = calculate(firstValue, operator, secondValue);
        (calculator.dataset as CalculatorData).previousKeyType = 'calculate';
      }
    }
  });
  
  // Function to perform calculation
  function calculate(firstValue: string | undefined, operator: string | undefined, secondValue: string): string {
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
    const data = calculator.dataset as CalculatorData;
    delete data.previousKeyType;
    delete data.firstValue;
    delete data.operator;
  }
  
  // Function to show error message
  function showError(errorMessage: string) {
    alert(errorMessage);
    display.textContent = '0';
  }
  