export async function pressure(e, target, act = "noAct") {
    e.preventDefault();
    if(document.querySelector(".nombre-programa").innerText !== "Pressure") return;
    const $selectSel = document.querySelector(".select_uno"), 
        $selectDos = document.querySelector(".select_dos"), 
        $escribir = document.querySelector(".converter_imprimir"), 
        $loader = document.querySelector(".lds-dual-ring"),
        $a = document.querySelector(".a_converter"),
        $resultado = document.querySelector(".converter_resultado");
    let calculo = 0;
    if (act === "actualizar" || e.type === "DOMContentLoaded") {
        $selectSel.innerHTML = "";
        $selectDos.innerHTML = "";
        $loader.classList.toggle("none");
        $a.classList.toggle("none");
        let medidas = `
            <option value="a" selected>Atmospheres</option>
            <option value="b">Bars</option>
            <option value="k">Kilopascals</option>
            <option value="m">Milimeters of Mercury</option>
            <option value="p">Pascals</option>
            <option value="pp">Pounds per square inch</option>`;
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
            fetch("./assets/dataCalc.json")
                .then(res => res.json())
                .then(json => {
                    calculo = parseFloat($escribir.innerHTML) * json.Pressure[$selectSel.value][$selectDos.value];
                    $resultado.innerHTML = calculo;
                })
                .catch(err => {
                    console.error("Ocurrio un Error: ", err);
                })
        };
    };
};