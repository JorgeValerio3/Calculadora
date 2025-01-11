export async function data(e, target, act = "noAct") {
    e.preventDefault();
    if(document.querySelector(".nombre-programa").innerText !== "Data") return;
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
            <option value="b" selected>Bits</option>
            <option value="by">Bytes</option>
            <option value="kb">Kilobits</option>
            <option value="kbi">Kibibits</option>
            <option value="kby">Kilobytes</option>
            <option value="kib">Kibibytes</option>
            <option value="mb">Megabits</option>
            <option value="mbi">Mebibits</option>
            <option value="mby">Megabytes</option>
            <option value="mib">Mebibytes</option>
            <option value="gb">Gigabits</option>
            <option value="gbi">Gibibits</option>
            <option value="gby">Gigabytes</option>
            <option value="gib">Gibibytes</option>
            <option value="tb">Terabits</option>
            <option value="tbi">Tebibits</option>
            <option value="tby">Terabytes</option>
            <option value="tib">Tebibytes</option>
            <option value="pb">Petabits</option>
            <option value="pbi">Pebibits</option>
            <option value="pby">Petabytes</option>
            <option value="pib">Pebibytes</option>
            <option value="eb">Exabits</option>
            <option value="ebi">Exbibits</option>
            <option value="eby">Exabytes</option>
            <option value="eib">Exbibytes</option>
            <option value="zb">Zetabits</option>
            <option value="zbi">Zebibits</option>
            <option value="zby">Zetabytes</option>
            <option value="zib">Zebibytes</option>
            <option value="yb">Yottabits</option>
            <option value="ybi">Yobibits</option>
            <option value="yby">Yottabytes</option>
            <option value="yib">Yobibytes</option>`;
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
                    calculo = parseFloat($escribir.innerHTML) * json.Data[$selectSel.value][$selectDos.value];
                    $resultado.innerHTML = calculo;
                })
                .catch(err => {
                    console.error("Ocurrio un Error: ", err);
                })
        };
    };
};