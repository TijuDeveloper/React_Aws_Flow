
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const handleNumber = (number) => {
    if (waitingForNext) {
      setDisplay(number);
      setWaitingForNext(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleDecimal = () => {
    if (waitingForNext) {
      setDisplay("0.");
      setWaitingForNext(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? "Error" : a / b;
      default: return b;
    }
  };

  const handleOperator = (op) => {
    if (display === "Error") return;

    const current = Number(display);

    if (operator && firstValue !== null && !waitingForNext) {
      const result = calculate(firstValue, current, operator);
      const formatted = String(Number(result.toFixed(10)));
      setDisplay(formatted);
      setFirstValue(result);
    } else {
      setFirstValue(current);
    }

    setOperator(op);
    setWaitingForNext(true);
  };

  const handleEquals = () => {
    if (operator === null || firstValue === null || display === "Error") return;

    const result = calculate(firstValue, Number(display), operator);
    setDisplay(
      typeof result === "number"
        ? String(Number(result.toFixed(10)))
        : result
    );
    setFirstValue(null);
    setOperator(null);
    setWaitingForNext(true);
  };

  const clear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForNext(false);
  };

  const deleteLast = () => {
    if (waitingForNext || display === "Error") {
      setDisplay("0");
      setWaitingForNext(false);
      return;
    }

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const buttons = [
    { label: "AC", action: clear, type: "utility" },
    { label: "DEL", action: deleteLast, type: "utility" },
    { label: "÷", action: () => handleOperator("/"), type: "operator" },
    { label: "×", action: () => handleOperator("*"), type: "operator" },
    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "−", action: () => handleOperator("-"), type: "operator" },
    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "+", action: () => handleOperator("+"), type: "operator" },
    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "=", action: handleEquals, type: "equals", span: true },
    { label: "0", action: () => handleNumber("0"), span: true },
    { label: ".", action: handleDecimal },
  ];

  return (
    <main className="app">
      <section className="calculator">
        <h1>Calculator</h1>
        <p className="subtitle">Simple React Calculator</p>

        <div className="display" aria-live="polite">
          {display}
        </div>

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={[
                "calc-button",
                button.type || "",
                button.span ? "span-two" : "",
              ].join(" ")}
            >
              {button.label}
            </button>
          ))}
        </div>

        <p className="footer">Built with React + Vite</p>
      </section>
    </main>
  );
}

export default App;
