export async function currency(e, target, act = "noAct") {
    e.preventDefault();
    const $selectSel = document.querySelector(".select_uno"), 
        $selectDos = document.querySelector(".select_dos"), 
        $escribir = document.querySelector(".converter_imprimir"), 
        ls = localStorage,
        $loader = document.querySelector(".lds-dual-ring");
    if(document.querySelector(".nombre-programa").innerText !== "Currency") return;
    if (act === "actualizar" || e.type === "DOMContentLoaded") {
        $selectSel.innerHTML = "";
        $selectDos.innerHTML = "";
        //console.log("Entro");
        $loader.classList.remove("none");
        await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
            .then(res => res.json())
            .then(json => {
                //console.log(json);
                for (const [key, value] of Object.entries(json)) {
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
                    (key !== ls.getItem("MonedaIn"))
                        ?$selectSel.innerHTML += `<option value="${key}">${value}</option>`
                        :$selectSel.innerHTML += `<option value="${key}" selected>${value}</option>`;
                    (key !== ls.getItem("MonedaOut"))
                        ?$selectDos.innerHTML += `<option value="${key}">${value}</option>`
                        :$selectDos.innerHTML += `<option value="${key}" selected>${value}</option>`;
                };
                //console.log("Termino");
                $loader.classList.add("none");
            })
            .catch(err => console.error(err));//https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json
    } else {
        if (e.type === "click") {
            //aqui ingresaremos los calculos
            (target.matches(".num"))
                ?(() => {
                    //Ingresaremos los numeros
                    (($escribir.innerHTML === "0" && target.innerHTML === "0") || $escribir.innerHTML === "0")
                        ?$escribir.innerHTML = target.innerHTML
                        :$escribir.innerHTML += target.innerHTML;
                })()
                :(() => {
                    //aqui iran las operaciones: . del 
                    if(target.innerHTML === "." && $escribir.innerHTML.split(".").length === 1){
                        $escribir.innerHTML += target.innerHTML;
                    } else if(target.innerHTML === "CE"){
                        $escribir.innerHTML = "0";
                        document.querySelector(".converter_resultado").innerHTML = 0;
                    } else if(target.matches(".fa-backspace") || target.children[0].matches(".fa-backspace")){
                        if($escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1)) === "") $escribir.innerHTML = 0;
                        else $escribir.innerHTML = $escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1));
                    }
                })();
            document.querySelector(".converter_resultado").innerHTML = parseFloat(ls.getItem("valorCambioMoneda")) * parseFloat($escribir.innerHTML);
        } else {
            //aqui ira los cambios de monedas
            await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${$selectSel.value}.json`)
                .then(res => res.json())
                .then(json => {
                    //console.log(json, $selectSel.value, $selectDos.value);
                    //console.log(json[$selectSel.value][$selectDos.value]);
                    ls.setItem("valorCambioMoneda", json[$selectSel.value][$selectDos.value]);
                    ls.setItem("MonedaIn", $selectSel.value);
                    ls.setItem("MonedaOut", $selectDos.value);
                    //oper = json[$selectSel.value][$selectDos.value];
                });
        };
    };
};

//la api que utilize:
//https://github.com/fawazahmed0/currency-api#readme

//https://api.norekbeat.space/api/cambio-de-divisas/


//https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json
//https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json