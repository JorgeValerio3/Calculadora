

export function length(e, target, act = "noAct") {
    e.preventDefault();
    const $selectSel = document.querySelector(".select_uno"), 
        $selectDos = document.querySelector(".select_dos"), 
        $escribir = document.querySelector(".converter_imprimir"), 
        $a = document.querySelector(".a_converter"),
        $resultado = document.querySelector(".converter_resultado");
    if(document.querySelector(".nombre-programa").innerText !== "Length") return;
    let calculo = 0;
    if (act === "actualizar" || e.type === "DOMContentLoaded") {
        $selectSel.innerHTML = "";
        $selectDos.innerHTML = "";
        $a.classList.toggle("none");
        let medidas = `
            <option value="nm" selected>Nanometros</option>
            <option value="mcm">Micrometros</option>
            <option value="mm">Milimetros</option>
            <option value="cm">Centimetros</option>
            <option value="m">Metros</option>
            <option value="km">Kilometros</option>
            <option value="in">Pulgadas</option>
            <option value="p">Pies</option>
            <option value="y">Yardas</option>
            <option value="mil">Millas</option>
            <option value="miln">Millas Nauticas</option>`;
        $selectSel.innerHTML = medidas;
        $selectDos.innerHTML = medidas;
    } else {
        if (e.type === "click" || e.type === "change") {
            (target.matches(".num"))
                ?(() => {
                    (($escribir.innerHTML === "0" && target.innerHTML === "0") || $escribir.innerHTML === "0")
                        ?$escribir.innerHTML = target.innerHTML
                        :$escribir.innerHTML += target.innerHTML;
                })()
                :(() => {
                    console.log(target);
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
                        if($escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1)) === "") $escribir.innerHTML = 0;
                        else $escribir.innerHTML = $escribir.innerHTML.slice(0, ($escribir.innerHTML.length - 1));
                    }
                })();
            
            if($selectSel.value === "nm"){
                switch ($selectDos.value) {
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)/1000;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)/1000000;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)/10000000;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/1000000000;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/1000000000000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML) * (0.0000000032808398950131237*12);
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML) * 0.0000000032808398950131237;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML) * 0.000000001093613298337708;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML) * 0.0000000000006213711922373339;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML) * 0.0000000000005399568034557236;
                        break;
                };
            };
            if($selectSel.value === "mcm"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)*1000
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)/1000;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)/10000;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/1000000;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/1000000000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)/25400;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)/304800;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)/914400;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)*0.0000000006213711922373338;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)*0.0000000005399568034557236;
                        break;
                };
            };
            if($selectSel.value === "mm"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)*1000000;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*1000;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)/10;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/1000;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/1000000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)/25.4;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)/304.8;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)/914.4;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)*0.000000621371192237334;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)*0.0000005399568034557235;
                        break;
                };
            };
            if($selectSel.value === "cm"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)*10000000;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*10000;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*10;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/100;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/100000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)/2.54;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)/30.48;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)/91.44;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/160900;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/185200;
                        break;
                };
            };
            if($selectSel.value === "m"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)*1000000000;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*1000000;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*1000;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*100;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/1000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*39.37;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)*3.281;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)*1.094;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/1609;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/1852;
                        break;
                };
            };
            if($selectSel.value === "km"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)*1000000000000;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*1000000000;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*1000000;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*100000;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)*1000;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*39370;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)*3281;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)*1094;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/1.609;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/1.852;
                        break;
                };
            };
            if($selectSel.value === "in"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)/(0.0000000032808398950131237*12);
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*25400;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*25.4;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*2.54;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/39.37;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/39370;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)/12;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)/36;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/63360;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/72910;
                        break;
                };
            };
            if($selectSel.value === "p"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000000032808398950131237;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*304800;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*304.8;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*30.48;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)*3.281;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/3281;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*12;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)/3;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/5280;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/6076;
                        break;
                };
            };
            if($selectSel.value === "y"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)/0.000000001093613298337708;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)*914400;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)*914.4;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*91.44;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)/1.094;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)/1094;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*36;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)*3;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)/1760;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/2025;
                        break;
                };
            };
            if($selectSel.value === "mil"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000000000006213711922373339;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000000006213711922373338;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)/0.000000621371192237334;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*160900;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)*1609;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)*1.609;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*63360;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)*5280;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)*1760;
                        break;
                    case "miln":
                        calculo = parseFloat($escribir.innerHTML)/1.151;
                        break;
                };
            };
            if($selectSel.value === "miln"){
                switch ($selectDos.value) {
                    case "nm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000000000005399568034557236;
                        break;
                    case "mcm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000000005399568034557236;
                        break;
                    case "mm":
                        calculo = parseFloat($escribir.innerHTML)/0.0000005399568034557235;
                        break;
                    case "cm":
                        calculo = parseFloat($escribir.innerHTML)*185200;
                        break;
                    case "m":
                        calculo = parseFloat($escribir.innerHTML)*1852;
                        break;
                    case "km":
                        calculo = parseFloat($escribir.innerHTML)*1.852;
                        break;
                    case "in":
                        calculo = parseFloat($escribir.innerHTML)*72910;
                        break;
                    case "p":
                        calculo = parseFloat($escribir.innerHTML)*6076;
                        break;
                    case "y":
                        calculo = parseFloat($escribir.innerHTML)*2025;
                        break;
                    case "mil":
                        calculo = parseFloat($escribir.innerHTML)*1.151;
                        break;
                };
            };
            $resultado.innerHTML = ($selectSel.value === $selectDos.value) ?$escribir.innerHTML :calculo;
        };
    };
};