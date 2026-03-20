import { dark_mode } from "./module/dark_mode.js";
import { loadProgram } from "./module/loadProgram.js";
import { initStandar } from "./module/standar.js";
import { initScientific } from "./module/scientific.js";
import { initConverter } from "./module/stdConverter.js";
import { initDateCalc } from "./module/date_calculation.js";

const d = document;
const aside = d.querySelector(".aside");

let activeModuleCleanup = null;

d.addEventListener("DOMContentLoaded", async e => {
    let arr = (localStorage.SeccionCalculadora === undefined)
        ? ["standar", "Standar"]
        : localStorage.SeccionCalculadora.split(",");

    // Init dark mode
    if (localStorage.getItem("darkMode") === "light") {
        d.querySelector("body").classList.add("light");
        d.querySelector(".dark_mode i").classList.replace("fa-sun", "fa-moon");
    }

    // Global Header Listeners
    d.querySelector('.menu-toggle').addEventListener('click', () => {
        aside.classList.toggle("lejos");
    });

    d.querySelector('.dark_mode').addEventListener('click', (ev) => {
        dark_mode(ev);
    });

    // Global Aside Listeners
    d.querySelectorAll(".aside_button").forEach(btn => {
        btn.addEventListener("click", async () => {
            aside.classList.add("lejos");
            await changeProgram(btn.value, btn.dataset.title);
        });
    });

    await changeProgram(arr[0], arr[1]);
});

async function changeProgram(name, title) {
    if (activeModuleCleanup) {
        activeModuleCleanup();
        activeModuleCleanup = null;
    }

    await loadProgram(name, title);

    if (name === "standar") {
        activeModuleCleanup = initStandar(name);
    } else if (name === "scientific") {
        activeModuleCleanup = initScientific(name);
    } else if (name === "converter") {
        activeModuleCleanup = await initConverter(title);
    } else if (name === "date_calculation") {
        activeModuleCleanup = initDateCalc();
    }
}