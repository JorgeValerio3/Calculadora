let ope = true;

export function date_calculation(e, options) {
    if(e.target.matches(".dateOpe_select")){
        (e.target.value === "ope_1")
            ?(() => {
                ope = true;
                document.getElementById("resSelect").innerHTML = `  
                    <h3>Desde:</h3>
                    <input type="date" id="inputDateIngreso">
                    <h3>Hasta:</h3>
                    <input type="date" id="inputDateSalida">
                    <br>
                    <br>
                    <h3>Diferencia:</h3>
                    <h3 id="date_fecha"></h3>
                    <h3 id="date_fecha2"></h3>
                    <h4 class="date_alert">Para que se pueda mostrar el calculo Ingrese ambos parametros</h4>`;
            })()
            :(() => {
                ope = false;
                document.getElementById("resSelect").innerHTML = `  
                    <h3>Desde:</h3>
                    <input type="date" id="inputDateIngreso">
                    <br><br>
                    <form class="date_form">
                        <Label for="anadir">Añadir: </Label>
                        <input type="radio" id="anadir" name="2daparte">
                        <Label for="sustraer">Substraer: </Label>
                        <input type="radio" id="sustraer" name="2daparte">
                        <br><br>
                        <label for="anos">Años: </label>
                        <select id="anos">${options}</select>
                        <label for="meses">Meses: </label>
                        <select id="meses">${options}</select>
                        <label for="dias">Dias: </label>
                        <select id="dias">${options}</select>
                    </form>
                    <h3>Fecha:</h3>
                    <h3 id="date_fecha"></h3>
                    <h3 id="date_fecha2"></h3>
                    <h4 class="date_alert">Para que se pueda mostrar el calculo Ingrese ambos parametros</h4>`;
            })();
    };
    if(e.target.matches("#resSelect select") || e.target.matches("#resSelect input")){
        const intro = document.getElementById("inputDateIngreso"),
            zonaImpresion = document.getElementById("date_fecha"),
            zoneA = document.querySelector(".date_alert"),
            meses = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
            mesesNombre = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
        let resDias = 0;
        if (ope) {
            const outInfo = document.getElementById("inputDateSalida");
            if (intro.value != "" && outInfo.value != "") {
                let intArr = intro.value.split("-"), 
                    outArr = outInfo.value.split("-"),
                    bisiestos = 0,
                    fechaEntrada = parseInt(intArr[2]),
                    fechaSalida = parseInt(outArr[2]);
                //365 - (dias de año de inicio) + (((años-1 <= 0) ?0 :años-1) * 365) + (dias de año de finalizacion) 
                //obtener todos los dias de diferencia y luego dividirlo para obtener los años meses semanas y dias totales, BISISESTO = 2020
                //para calcular los años bisiestos entre los años
                const obtenerDias = () => {
                    let res;
                    for (let i = 0; i < parseInt(intArr[1]); i++) fechaEntrada += meses[i];
                    for (let i = 0; i < parseInt(outArr[1]); i++) fechaSalida += meses[i];
                    if ((parseInt(intArr[0]) - parseInt(outArr[0])) == 0) {
                        res = (fechaEntrada < fechaSalida) 
                            ?fechaSalida-fechaEntrada 
                            :fechaEntrada-fechaSalida;
                    } else if((parseInt(intArr[0]) - parseInt(outArr[0])) == 1 || (parseInt(intArr[0]) - parseInt(outArr[0])) == -1) {
                        /* si parseInt(intArr[0]) > parseInt(outArr[0])
                                la fecha comenzara en outArr[0] entonces le restamos 365 para obtener a partir la cantidad de dias del año que estaran en la lista conteo */
                        res = (parseInt(intArr[0]) > parseInt(outArr[0]))
                            ?(365 - fechaSalida) + fechaEntrada
                            :(365 - fechaEntrada) + fechaSalida;
                    } else {
                        let anos = (parseInt(intArr[0]) - parseInt(outArr[0])) < 0
                            ?(parseInt(intArr[0]) - parseInt(outArr[0])) * -1                              
                            :parseInt(intArr[0]) - parseInt(outArr[0]);
                        res = (parseInt(intArr[0]) > parseInt(outArr[0]))
                            ?(365 - fechaSalida) + fechaEntrada
                            :(365 - fechaEntrada) + fechaSalida;
                        for (let i = 1; i < anos; i++) res += 365;
                        if (anos > 3) {
                            for (let i = 2; i < anos; i += 4) bisiestos++;
                            res += bisiestos;
                        }
                    }
                    return res;
                }
                resDias = obtenerDias();
                const calculoAnosMesesDias = (dias) => {
                    let anos = 0, meses = 0, semanas = 0, espera = 0;
                    let cadenaFInal = " de Diferencia";
                    //console.log("Entro");
                    if (dias >= 365) {//Años
                        anos = parseInt(dias / 365);
                        espera = dias % 365;
                        if (anos > 0 && espera > 30) {//Meses
                            calcularMeses(espera);
                            if (espera >= 7) {//Semanas
                                calcularSemanas(espera);
                            }
                        }
                    }
                    if (anos === 0 && dias >= 30) {
                        calcularMeses(dias);
                        if (espera >= 7) {
                            calcularSemanas(espera);
                        }
                    }
                    if (anos === 0 && meses === 0 && dias >= 7) {
                        calcularSemanas(dias);
                    }
                    if (anos === 0 && meses === 0 && dias < 7) {
                        espera = dias;
                    }
                    function calcularMeses(value){
                        meses = parseInt(value / 30);
                        espera = value % 30;
                    }
                    function calcularSemanas(value){
                        semanas = parseInt(value / 7);
                        espera = value % 7;
                    }
                    cadenaFInal = ` - ${(anos > 0 ?anos + " Años - ":"")}${(meses > 0 ?meses + " Meses - ":"")}${(semanas > 0 ?semanas + " Semanas - ":"")}${(espera > 0 ?espera + " Dia - ":"")}`;
                    return cadenaFInal;
                };
                zonaImpresion.innerHTML = calculoAnosMesesDias(resDias);
                zoneA.innerHTML = "";
            } else {
                zoneA.innerHTML = "Para que se pueda mostrar el calculo Ingrese ambos parametros";
            }
        } else {//Por completar
            const radio1 = document.getElementById("anadir"),
                radio2 = document.getElementById("sustraer"),
                anos = parseInt(document.getElementById("anos").value),
                meses = parseInt(document.getElementById("meses").value),
                dias = parseInt(document.getElementById("dias").value);
            if ((radio1.checked || radio2.checked)/*  &&  */) {//validar que halla una fella puesta
                console.log(radio1.checked, radio1.value);
                if (radio1.checked) {
                    anadirSustraer(true);
                } else {
                    anadirSustraer(false);
                }
                function anadirSustraer(ope) {
                    console.log(intro.value, anos, meses, dias);
                    let $dias = dias,
                        $meses = meses,
                        $anos = anos,
                        $fecha = intro.value.split("-").reverse().map(el => parseInt(el));
                    console.log($fecha);
                    if(ope){
                        $anos += $fecha[2];
                        $meses += $fecha[1];
                        $dias += $fecha[0];
                        if($dias > 30){
                            $meses += parseInt($dias / 30.42);
                            $dias = parseInt($dias % 30.42);
                        }
                        if($meses > 11){
                            $anos += parseInt($meses / 12);
                            $meses = $meses % 12;
                        }
                    } else {
                        $fecha[2] -= $anos;
                        $fecha[1] -= $meses;
                        $fecha[0] -= $dias;
                        $anos = $fecha[2];
                        $meses = $fecha[1];
                        $dias = $fecha[0];
                        if($dias < -30){
                            $meses += parseInt($dias / 30.42);
                            $dias = parseInt($dias % 30.42);
                        }
                        if($dias < 1){
                            $dias += 30;
                            $meses -= 1;
                        }
                        if($meses < -12){
                            $anos += parseInt($meses / 12);
                            $meses = parseInt($meses % 12);
                        }
                        if($meses < 1){
                            $meses += 12;
                            $anos -= 1;
                        }
                    }
                    let resPrueba = [$dias, $meses, $anos];
                    console.log(resPrueba);
                    zonaImpresion.innerHTML = `${$dias} de ${mesesNombre[$meses]} de ${$anos}`;
                    zoneA.innerHTML = "";
                }
            } else {
                zoneA.innerHTML = "Para que se pueda mostrar el calculo Ingrese la Operacion";
            }
        }
    }
}