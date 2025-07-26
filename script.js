let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";

const isOperator = (char) => ['+', '-', '*', '/', '%'].includes(char);

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const btn = e.target.innerHTML;

    if (btn === '=') {
      try {
        if (string === "") return;
        // Prevent invalid eval
        if (/[^\d.+\-*/%]/.test(string)) {
          input.value = "Invalid";
          string = "";
          return;
        }
        string = eval(string).toString();
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (btn === 'AC') {
      string = "";
      input.value = string;
    } else if (btn === 'DEL') {
      string = string.slice(0, -1);
      input.value = string;
    } else {
      // Prevent two operators in a row
      if (isOperator(btn) && isOperator(string.slice(-1))) return;
      // Prevent multiple decimals in one number
      if (btn === '.' && string.split(/[\+\-\*\/]/).pop().includes('.')) return;
      string += btn;
      input.value = string;
    }
  });
});
