export async function temperature(e, target, act = "noAct") {
    e.preventDefault();
    const $selectSel = document.querySelector(".select_uno"), 
        $selectDos = document.querySelector(".select_dos"), 
        $escribir = document.querySelector(".converter_imprimir"), 
        $loader = document.querySelector(".lds-dual-ring"),
        $a = document.querySelector(".a_converter"),
        $negat = document.querySelector(".negative"),
        $resultado = document.querySelector(".converter_resultado");
    let calculo = 0;
    if (act === "actualizar" || e.type === "DOMContentLoaded") {
        $selectSel.innerHTML = "";
        $selectDos.innerHTML = "";
        $loader.classList.toggle("none");
        $a.classList.toggle("none");
        $negat.classList.toggle("none");
        let medidas = `
            <option value="cel" selected>Celcius</option>
            <option value="far">Fahrenheit</option>
            <option value="kel">Kelvin</option>`;
        $selectSel.innerHTML = medidas;
        $selectDos.innerHTML = medidas;
        $loader.classList.toggle("none");
    } else {
        if (e.type === "click" || e.type === "change") {
            (target.matches(".num"))
                ?(() => {
                    (($escribir.innerHTML === "0" && target.innerHTML === "0") || $escribir.innerHTML === "0")
                        ?$escribir.innerHTML = target.innerHTML
                        :$escribir.innerHTML += target.innerHTML;
                })()
                :(() => {
                    if(target.innerHTML === "." && $escribir.innerHTML.split(".").length === 1){
                        $escribir.innerHTML += target.innerHTML;
                    } else if(target.innerHTML === "CE"){
                        $escribir.innerHTML = "0";
                        document.querySelector(".converter_resultado").innerHTML = 0;
                    } else if(target.innerHTML === "-/+"){
                        $escribir.innerHTML = ($escribir.innerHTML.split("")[0] === "-")
                            ?$escribir.innerHTML.slice(1, $escribir.innerHTML.length)
                            :`-${$escribir.innerHTML}`;
                    } else if(target.matches(".fa-backspace") || target.children[0].matches(".fa-backspace")){
                        console.log(target.children[0]);
                        if($escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1)) === "") $escribir.innerHTML = 0;
                        else $escribir.innerHTML = $escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1));
                    }
                })();
            if ($selectSel.value === $selectDos.value) {
                $resultado.innerHTML = $escribir.innerHTML;
            }
            if($selectSel.value === "cel"){
                switch ($selectDos.value) {
                    case "far":
                        calculo = ($escribir.innerHTML * 1.8) + 32;
                        $resultado.innerHTML = calculo;
                        break;
                    case "kel":
                        calculo = parseFloat($escribir.innerHTML) + 273.15;
                        $resultado.innerHTML = calculo;
                        break;
                };
            };
            if($selectSel.value === "far"){
                switch ($selectDos.value) {
                    case "cel":
                        calculo = ($escribir.innerHTML - 32)/1.8;
                        $resultado.innerHTML = calculo;
                        break;
                    case "kel":
                        calculo = 5 * (parseFloat($escribir.innerHTML) - 32)/9 + 273.15;
                        $resultado.innerHTML = calculo;
                        break;
                };
            };
            if($selectSel.value === "kel"){
                switch ($selectDos.value) {
                    case "cel":
                        calculo = $escribir.innerHTML - 273.15;
                        $resultado.innerHTML = calculo;
                        break;
                    case "far":
                        calculo = 9 * (parseFloat($escribir.innerHTML) - 273.15)/5 + 32;
                        $resultado.innerHTML = calculo;
                        break;
                };
            };
        };
    };
};