export function initScientific(mode = "scientific") {
    const $container = document.querySelector(`.${mode}`);
    if (!$container) return null;

    const zonaOpe = document.getElementById("zona-operaciones");
    const zonaIngre = document.getElementById("numero-ingresado");
    const docMemory = document.getElementById("memory_zone");

    let operacionStr = "";
    let useRadians = false; // DEG is default

    function updateDisplay() {
        zonaOpe.innerText = operacionStr;
        if (operacionStr === "") zonaIngre.innerText = "0";
    }

    function evaluate() {
        if (!operacionStr) return;
        try {
            // Map standard mathematical notation to valid JS Math calls
            // Example: sin(90) -> Math.sin(90 * Math.PI / 180)
            let toEval = operacionStr
                .replace(/x/g, "*")
                .replace(/\^/g, "**")
                .replace(/mod/g, "%")
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/sin\(/g, useRadians ? "Math.sin(" : "Math.sin(Math.PI/180 * ")
                .replace(/cos\(/g, useRadians ? "Math.cos(" : "Math.cos(Math.PI/180 * ")
                .replace(/tan\(/g, useRadians ? "Math.tan(" : "Math.tan(Math.PI/180 * ")
                .replace(/log\(/g, "Math.log10(")
                .replace(/in\(/g, "Math.log(") // Assuming "in" was meant as "ln" but the button says "in"
                .replace(/ln\(/g, "Math.log(")
                .replace(/exp\(/g, "Math.exp(");

            // Safe evaluation of math string
            const res = new Function(`return ${toEval}`)();
            const formattedRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));

            if (isNaN(formattedRes) || !isFinite(formattedRes)) {
                zonaIngre.innerText = "Math Error";
                operacionStr = "";
                return;
            }

            if (docMemory) {
                docMemory.innerHTML += `
                    <article>
                        <div class="memory_zone-num-ope">${operacionStr}</div>
                        <div class="memory_zone-num-p">${formattedRes}</div>
                    </article>`;
            }

            operacionStr = String(formattedRes);
            zonaIngre.innerText = formattedRes;
            zonaOpe.innerText = "";

        } catch (e) {
            zonaIngre.innerText = "Error";
            operacionStr = "";
        }
    }

    // Helper for factorials
    function factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
    }

    function clickHandler(e) {
        const btn = e.target.closest("button");
        if (!btn) return;

        let val = btn.textContent.trim();
        if (btn.querySelector(".fa-backspace") || val === "") val = "BACK";

        if (btn.classList.contains("num") || val === ".") {
            if (val === "+/-") {
                let parts = operacionStr.split(/([+\-*/])/);
                let lastPart = parts.pop();
                if (lastPart) {
                    if (lastPart.startsWith("(-")) lastPart = lastPart.slice(2, -1);
                    else if (!isNaN(lastPart)) lastPart = "(-" + lastPart + ")";
                    parts.push(lastPart);
                    operacionStr = parts.join("");
                }
            } else {
                operacionStr += val;
            }
            updateDisplay();

        } else if (btn.classList.contains("ope") || !btn.classList.contains("num")) {
            switch (val) {
                case "C":
                case "CE":
                    operacionStr = "";
                    updateDisplay();
                    break;
                case "BACK":
                    operacionStr = operacionStr.slice(0, -1);
                    updateDisplay();
                    break;
                case "=":
                    evaluate();
                    break;
                case "DEG":
                case "RAD":
                    useRadians = !useRadians;
                    btn.textContent = useRadians ? "RAD" : "DEG";
                    break;
                case "Trigonometry":
                case "Function":
                case "F-E":
                case "2^nd":
                    // Decorative/Dropdown placeholders in this specific layout if not fully implemented
                    break;
                case "|x|":
                    evaluate();
                    operacionStr = String(Math.abs(parseFloat(operacionStr) || 0));
                    updateDisplay();
                    break;
                case "x^2":
                case "2√x":
                case "1/x":
                case "n!":
                case "10^x":
                    evaluate();
                    let currentVal = parseFloat(operacionStr) || 0;
                    if (val === "x^2") operacionStr = String(currentVal * currentVal);
                    else if (val === "2√x") operacionStr = String(Math.sqrt(currentVal));
                    else if (val === "1/x") operacionStr = String(1 / currentVal);
                    else if (val === "n!") operacionStr = String(factorial(currentVal));
                    else if (val === "10^x") operacionStr = String(10 ** currentVal);

                    if (operacionStr === "NaN") {
                        zonaIngre.innerText = "Error";
                        operacionStr = "";
                    } else {
                        zonaIngre.innerText = operacionStr;
                        zonaOpe.innerText = "";
                    }
                    break;
                case "sin": case "cos": case "tan":
                case "log": case "ln": case "in": case "exp":
                    operacionStr += `${val}(`;
                    updateDisplay();
                    break;
                case "x^y":
                    operacionStr += "^";
                    updateDisplay();
                    break;
                case "π":
                    operacionStr += "π";
                    updateDisplay();
                    break;
                case "e":
                    operacionStr += "e";
                    updateDisplay();
                    break;
                case "mod":
                    operacionStr += " mod ";
                    updateDisplay();
                    break;
                default:
                    // Normal operators: +, -, *, /, (, )
                    const lastChar = operacionStr.slice(-1);
                    if ("+-*/%^".includes(lastChar) && "+-*/%^".includes(val)) {
                        operacionStr = operacionStr.slice(0, -1) + val;
                    } else {
                        operacionStr += val;
                    }
                    updateDisplay();
                    break;
            }
        }
    }

    $container.addEventListener("click", clickHandler);

    // Memory trash handler
    const trashBtn = $container.querySelector(".fa-trash-alt");
    const trashHandler = () => {
        if (docMemory) docMemory.innerHTML = "";
    };
    if (trashBtn) trashBtn.addEventListener("click", trashHandler);

    // Initial clear
    updateDisplay();

    return () => {
        $container.removeEventListener("click", clickHandler);
        if (trashBtn) trashBtn.removeEventListener("click", trashHandler);
    };
}