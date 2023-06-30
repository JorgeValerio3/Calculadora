export async function angle(e, target, act = "noAct") {
    e.preventDefault();
    if(document.querySelector(".nombre-programa").innerText !== "Angle") return;
    const $selectSel = document.querySelector(".select_uno"), 
        $selectDos = document.querySelector(".select_dos"), 
        $escribir = document.querySelector(".converter_imprimir"), 
        $loader = document.querySelector(".lds-dual-ring"),
        $a = document.querySelector(".a_converter"),
        $negat = document.querySelector(".negative"),
        $resultado = document.querySelector(".converter_resultado");
    if (act === "actualizar" || e.type === "DOMContentLoaded") {
        $selectSel.innerHTML = "";
        $selectDos.innerHTML = "";
        $loader.classList.toggle("none");
        $a.classList.toggle("none");
        $negat.classList.toggle("none");
        let medidas = `
            <option value="deg" selected>Grados</option>
            <option value="rad">Radianes</option>
            <option value="gra">Gradianes</option>`;
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
            if($selectSel.value === "deg"){
                switch ($selectDos.value) {
                    case "rad":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (Math.PI/180);
                        break;
                    case "gra":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (200/180);
                        break;
                };
            };
            if($selectSel.value === "rad"){
                switch ($selectDos.value) {
                    case "deg":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (180/Math.PI);
                        break;
                    case "gra":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (200/Math.PI);
                        break;
                };
            };
            if($selectSel.value === "gra"){
                switch ($selectDos.value) {
                    case "deg":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (180/200);
                        break;
                    case "rad":
                        $resultado.innerHTML = parseFloat($escribir.innerHTML) * (Math.PI/200);
                        break;
                };
            };
        };
    };
};