export function initStandar(mode = "standar") {
    const $container = document.querySelector(`.${mode}`);
    if (!$container) return null;

    const zonaOpe = document.getElementById("zona-operaciones");
    const zonaIngre = document.getElementById("numero-ingresado");
    const docMemory = document.getElementById("memory_zone");

    let operacionStr = "";

    function updateDisplay() {
        zonaOpe.innerText = operacionStr;
        if (operacionStr === "") zonaIngre.innerText = "0";
    }

    function evaluate() {
        if (!operacionStr) return;
        try {
            // Replace visual operators with JS evaluation operators
            let toEval = operacionStr
                .replace(/x/g, "*")
                .replace(/%/g, "/100");

            // Safe evaluation of simple math
            // Using Function constructor strictly on math strings
            if (/^[0-9+\-*/. ()]+$/.test(toEval)) {
                const res = new Function(`return ${toEval}`)();
                const formattedRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));

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
            } else {
                zonaIngre.innerText = "Error";
                operacionStr = "";
            }
        } catch (e) {
            zonaIngre.innerText = "Error";
            operacionStr = "";
        }
    }

    function clickHandler(e) {
        const btn = e.target.closest("button");
        if (!btn) return;

        let val = btn.textContent.trim();
        if (btn.querySelector(".fa-backspace") || val === "") val = "BACK";

        if (btn.classList.contains("num") || val === ".") {
            if (val === "+/-") {
                // Simplified toggle sign for last number
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

        } else if (btn.classList.contains("ope")) {
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
                case "x^2":
                case "2√x":
                case "1/x":
                    // For modern simplicity, we evaluate the current string first, then apply operation
                    evaluate();
                    let currentVal = parseFloat(operacionStr) || 0;
                    if (val === "x^2") operacionStr = String(currentVal * currentVal);
                    else if (val === "2√x") operacionStr = String(Math.sqrt(currentVal));
                    else if (val === "1/x") operacionStr = String(1 / currentVal);
                    zonaIngre.innerText = operacionStr;
                    zonaOpe.innerText = "";
                    break;
                default:
                    // Normal operators: +, -, *, /, %
                    const lastChar = operacionStr.slice(-1);
                    if ("+-*/%".includes(lastChar)) {
                        operacionStr = operacionStr.slice(0, -1) + val;
                    } else if (operacionStr !== "") {
                        operacionStr += val;
                    } else if (val === "-") {
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