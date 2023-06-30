import { dark_mode } from "./module/dark_mode.js";
import { loadProgram } from "./module/loadProgram.js";
import { standar } from "./module/standar.js";
import { scientific } from "./module/scientific.js";
import { date_calculation } from "./module/date_calculation.js";
import { currency } from "./module/currency.js";
import { temperature } from "./module/temperature.js";
import { length } from "./module/length.js";
import { angle } from "./module/angle.js";
//import { data } from "./module/data.js";
//import { pressure } from "./module/pressure.js";
import { stdConverter } from "./module/stdConverter.js";

const d = document,
    aside = d.querySelector(".aside");

let optionsDates = "";
for (let i = 0; i < 1000; i++) {
    optionsDates += `<option value="${i}">${i}</option>`;
}

d.addEventListener("DOMContentLoaded", async e => {
    let arra = (localStorage.SeccionCalculadora === undefined)
        ?["standar", "Standar"]
        :localStorage.SeccionCalculadora.split(",");
    await loadProgram(arra[0], arra[1]);
    dark_mode(e);
    switch (d.querySelector(".nombre-programa").textContent) {
        case " Currency":
            currency(e, e.target);
            break;
        case " Length":
            length(e, e.target);
            break;
        case " Temperature":
            temperature(e, e.target);
            break;
        case " Angle":
            angle(e, e.target);
            break;
        case " Data":
            //data(e, e.target);
            stdConverter(e, "Data", e.target);
        case " Pressure":
            //pressure(e, e.target);
            stdConverter(e, "Pressure", e.target);
            break;
        case " Power":
            stdConverter(e, "Power", e.target);
            break;
        default:
            console.log(d.querySelector(".nombre-programa").textContent);
            break;
    }
});
d.addEventListener("click", async e => {
    //e.preventDefault();
    console.log(e.target, e.target.parentElement)
    if (e.target.matches(".fa-bars")) aside.classList.toggle("lejos");
    if (e.target.matches(".aside_button")) await loadProgram(e.target.value, e.target.textContent);
    if (e.target.matches(".dark_mode i")) dark_mode(e);
    switch (d.querySelector(".nombre-programa").textContent) {//aqui se cargan los archivos JS
        case " Standar"://COMPLETADO
            if (e.target.matches(".standar .standar_nums button")) standar(e.target);
            if (e.target.matches(".fa-backspace")) standar(e.target);
            if (e.target.matches(".fa-trash-alt")) standar(e.target);
            break;
        case " Scientific"://FALTA POR COMPLETAR
            //console.log("Fun");
            if (e.target.matches(".scientific .scientific_nums button")) scientific(e.target);
            if (e.target.matches(".fa-backspace")) scientific(e.target);
            if (e.target.matches(".fa-trash-alt")) scientific(e.target);
            break;
        case " Volume"://FALTA POR COMPLETAR
            console.log("Volume ejecutando");
            break;
        case " Weight and Mass"://FALTA POR COMPLETAR
            console.log("Weight and Mass ejecutando");
            break;
        case " Data"://FALTA POR COMPLETAR
            if (e.target.matches(".converter button")) stdConverter(e, "Data", e.target);
            if (e.target.matches(".fa-backspace")) stdConverter(e, "Data", e.target);
            if (e.target.matches("a")) stdConverter(e, "Data", e.target, "actualizar");
            if (e.target.matches(".aside_button")) stdConverter(e, "Data", e.target, "actualizar");
            break;
        case " Currency"://COMPLETADO
            //console.log("ejecutando");
            if (e.target.matches(".converter button")) currency(e, e.target);
            if (e.target.matches(".fa-backspace")) currency(e, e.target);
            if (e.target.matches("a")) currency(e, e.target, "actualizar");
            if (e.target.matches(".aside_button")) currency(e, e.target, "actualizar");
            /* if (e.target.matches(".aside_button")) {
                console.log("Se esta ejecutando")
                currency(e, e.target, "actualizar");
            } */
            break;
        case " Length"://COMPLETA
            if (e.target.matches(".converter button")) length(e, e.target);
            if (e.target.matches(".fa-backspace")) length(e, e.target);
            if (e.target.matches("a")) length(e, e.target, "actualizar");
            if (e.target.matches(".aside_button")) length(e, e.target, "actualizar");
            break;
        case " Temperature"://COMPLETADA
            if (e.target.matches(".converter button")) temperature(e, e.target);
            if (e.target.matches(".fa-backspace")) temperature(e, e.target);
            if (e.target.matches("a")) temperature(e, e.target, "actualizar");
            if (e.target.matches(".aside_button")) temperature(e, e.target, "actualizar");
            break;
        case " Angle"://COMPLETADA
            if (e.target.matches(".converter button")) angle(e, e.target);
            if (e.target.matches(".fa-backspace")) angle(e, e.target);
            if (e.target.matches("a")) angle(e, e.target, "actualizar");
            if (e.target.matches(".aside_button")) angle(e, e.target, "actualizar");
            break;
        /* case " Pressure"://COMPLETADO
            if (e.target.matches(".converter button")) pressure(e, e.target);
            if (e.target.matches(".fa-backspace")) pressure(e, e.target);
            if (e.target.matches("a")) pressure(e, e.target, "actualizar");
            if (e.target.matches(".aside_button")) pressure(e, e.target, "actualizar");
            break; */
        case " Pressure"://COMPLETADO
            if (e.target.matches(".converter button")) stdConverter(e, "Pressure", e.target);
            if (e.target.matches(".fa-backspace")) stdConverter(e, "Pressure", e.target);
            if (e.target.matches("a")) stdConverter(e, "Pressure", e.target, "actualizar");
            if (e.target.matches(".aside_button")) stdConverter(e, "Pressure", e.target, "actualizar");
            break;
        case " Power"://COMPLETADO
            if (e.target.matches(".converter button")) stdConverter(e, "Power", e.target);
            if (e.target.matches(".fa-backspace")) stdConverter(e, "Power", e.target);
            if (e.target.matches("a")) stdConverter(e, "Power", e.target, "actualizar");
            if (e.target.matches(".aside_button")) stdConverter(e, "Power", e.target, "actualizar");
            break;
        default:
            console.log(d.querySelector(".nombre-programa").textContent);
            break;
    }
    console.log("----------------------------------------------------------------------")
});
d.addEventListener("change", e => {
    date_calculation(e, optionsDates);
    length(e, e.target);
    angle(e, e.target);
    //data(e, e.target);
    //pressure(e, e.target);
    stdConverter(e, "Data", e.target);
    stdConverter(e, "Pressure", e.target);
    stdConverter(e, "Power", e.target);
    currency(e, e.target);
    temperature(e, e.target);
})
d.addEventListener("keyup", e => {
    console.log(e.key);
    let arrBotns;
    switch (d.querySelector(".nombre-programa").textContent) {
        case "Standar":
            arrBotns = d.querySelectorAll(".standar .standar_nums button");
            for (let i = 0; i < arrBotns.length; i++) {
                if (e.key == arrBotns[i].textContent) standar(arrBotns[i]);
            }
            if (e.key === "Backspace") standar(d.querySelector(".fa-backspace"));
            break;
        case " Scientific":
            arrBotns = d.querySelectorAll(".scientific .scientific_nums button");
            for (let i = 0; i < arrBotns.length; i++) {
                if (e.key == arrBotns[i].textContent) scientific(arrBotns[i]);
            }
            if (e.key === "Backspace") scientific(d.querySelector(".fa-backspace"));
            break;
        default:
            break;
    }
})
/* d.addEventListener("click", e => {
    if (e.target.matches(".ope") || e.target.matches(".num")) {
        let ope = new Operacion(e.target.textContent);
    }
})
d.addEventListener("keyup", e => {
    if ("0123456789./*-+".split("").includes(e.key)) {
        let ope = new Operacion(e.key);
    }
}) */


/* 

COMPLETADAS:
Standar,
Diferencia entre fechas,
Cambio de Monedas,
temperatura


*/