import { converterDB } from "./converterDB.js";

// Currency cache structure
const currencyState = {
    dateFetched: null,
    ratesUsdBase: null,
    names: null
};

export async function initConverter(type) {
    const $selectSel = document.querySelector(".select_uno");
    const $selectDos = document.querySelector(".select_dos");
    const $escribir = document.querySelector(".converter_imprimir");
    const $loader = document.querySelector(".lds-dual-ring");
    const $a = document.querySelector(".a_converter");
    const $resultado = document.querySelector(".converter_resultado");
    const $container = document.querySelector(".converter");
    const $negativeBtn = document.querySelector(".num.negative"); // e.g. -/+

    if (!$container) return null;

    $loader.classList.remove("none");
    if ($a) $a.classList.add("none");

    // Some converters need negative (Temperature), others don't. Only Temp usually uses negative heavily, but we'll leave it universally available or hide it conditionally.

    // Clear dropdowns
    $selectSel.innerHTML = "";
    $selectDos.innerHTML = "";
    $escribir.innerHTML = "0";
    $resultado.innerHTML = "0";

    async function setupDropdowns() {
        let optionsHTML = "";

        if (type === "Currency") {
            try {
                // Fetch live API limits. 
                // We fetch the USD base and currency names from jsdelivr/fawazahmed0 API
                if (!currencyState.ratesUsdBase) {
                    const [resRates, resNames] = await Promise.all([
                        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"),
                        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
                    ]);
                    const dataRates = await resRates.json();
                    const dataNames = await resNames.json();

                    currencyState.ratesUsdBase = dataRates.usd;
                    currencyState.names = dataNames;
                    currencyState.dateFetched = dataRates.date;
                }

                // Show common currencies first, then alphabetically
                const common = ["usd", "eur", "gbp", "jpy", "cad", "aud", "mxn", "ars", "clp", "cop"];
                const allCurrencies = Object.keys(currencyState.ratesUsdBase);

                for (let code of common) {
                    if (currencyState.ratesUsdBase[code]) {
                        optionsHTML += `<option value="${code}">${currencyState.names[code] || code.toUpperCase()} (${code.toUpperCase()})</option>`;
                    }
                }
                optionsHTML += `<option disabled>──────────</option>`;

                for (let code of allCurrencies) {
                    if (!common.includes(code)) {
                        optionsHTML += `<option value="${code}">${currencyState.names[code] || code.toUpperCase()} (${code.toUpperCase()})</option>`;
                    }
                }

                if ($a) {
                    $a.innerHTML = `<i class="fa fa-info-circle"></i> Rates from ${currencyState.dateFetched}`;
                    $a.classList.remove("none");
                }

            } catch (err) {
                console.error("Currency API failed", err);
                optionsHTML = `<option value="error">Error loading rates</option>`;
            }

        } else if (type === "Temperature") {
            // Temperature is hardcoded since it uses formulas
            optionsHTML = `
                <option value="c">Celsius (°C)</option>
                <option value="f">Fahrenheit (°F)</option>
                <option value="k">Kelvin (K)</option>
            `;
        } else {
            // Scalar DB converters
            const data = converterDB[type];
            if (data && data.units) {
                for (let key in data.units) {
                    optionsHTML += `<option value="${key}">${data.units[key].name}</option>`;
                }
            } else {
                $escribir.innerHTML = "Not Supported";
            }
        }

        $selectSel.innerHTML = optionsHTML;
        $selectDos.innerHTML = optionsHTML;

        // Prevent default same selection bug initially by shifting standard target if available
        if ($selectDos.options.length > 1) {
            $selectDos.selectedIndex = 1;
        }

        calculate();
    }

    await setupDropdowns();
    $loader.classList.add("none");

    function calculate() {
        const val1 = parseFloat($escribir.innerHTML);
        if (isNaN(val1)) {
            $resultado.innerHTML = "0";
            return;
        }

        const from = $selectSel.value;
        const to = $selectDos.value;

        if (from === to) {
            $resultado.innerHTML = val1;
            return;
        }

        let res = 0;

        if (type === "Currency") {
            if (!currencyState.ratesUsdBase) return;
            const rateFrom = currencyState.ratesUsdBase[from];
            const rateTo = currencyState.ratesUsdBase[to];
            if (!rateFrom || !rateTo) return;
            // USD is base. 
            // from -> USD = value / rateFrom
            // USD -> to = (value / rateFrom) * rateTo
            res = (val1 / rateFrom) * rateTo;

        } else if (type === "Temperature") {
            // Conversions to Celsius first
            let celcius = val1;
            if (from === "f") celcius = (val1 - 32) * 5 / 9;
            else if (from === "k") celcius = val1 - 273.15;

            // Celsius to Target
            if (to === "c") res = celcius;
            else if (to === "f") res = (celcius * 9 / 5) + 32;
            else if (to === "k") res = celcius + 273.15;

        } else {
            const data = converterDB[type];
            if (!data) return;

            const fromMult = data.units[from].mult; // value of 1 'from' in 'bases'
            const toMult = data.units[to].mult;     // value of 1 'to' in 'bases'

            // Convert to base unit, then to target unit
            const baseVal = val1 * fromMult;
            res = baseVal / toMult;
        }

        // Format neatly to avoid super long trailing digits, while preserving small floats
        if (Math.abs(res) < 0.000001 && res !== 0) {
            $resultado.innerHTML = res.toExponential(4);
        } else {
            // Max 6 decimal places, removed trailing zeros organically
            let rounded = Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
            $resultado.innerHTML = String(rounded);
        }
    }

    function clickHandler(e) {
        const btn = e.target.closest("button");
        if (!btn) return;

        let targetVal = btn.textContent.trim();
        if (btn.querySelector(".fa-backspace") || targetVal === "") targetVal = "BACK";

        if (btn.classList.contains("num") && targetVal !== "-/+") {
            if ($escribir.innerHTML === "0" || $escribir.innerHTML === "-0") {
                $escribir.innerHTML = ($escribir.innerHTML.startsWith("-") ? "-" : "") + targetVal;
            } else {
                // Prevent extreme lengths
                if ($escribir.innerHTML.length < 16) $escribir.innerHTML += targetVal;
            }
        } else if (btn.classList.contains("ope") || targetVal === "-/+") {
            if (targetVal === ".") {
                if (!$escribir.innerHTML.includes(".")) $escribir.innerHTML += ".";
            } else if (targetVal === "CE") {
                $escribir.innerHTML = "0";
            } else if (targetVal === "-/+") {
                if ($escribir.innerHTML.startsWith("-")) $escribir.innerHTML = $escribir.innerHTML.slice(1);
                else if ($escribir.innerHTML !== "0") $escribir.innerHTML = "-" + $escribir.innerHTML;
            } else if (targetVal === "BACK") {
                $escribir.innerHTML = $escribir.innerHTML.slice(0, -1);
                if ($escribir.innerHTML === "" || $escribir.innerHTML === "-") $escribir.innerHTML = "0";
            }
        }
        calculate();
    }

    function changeHandler(e) {
        if (e.target.matches("select")) calculate();
    }

    $container.addEventListener("click", clickHandler);
    $container.addEventListener("change", changeHandler);

    return () => {
        $container.removeEventListener("click", clickHandler);
        $container.removeEventListener("change", changeHandler);
    };
}