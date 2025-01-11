let varUltimoNum = "", puntos = "0", punto = false, ultimoBotonPresionado = false, vezPuntoEnCuadrado = 0, vezPuntoRaizCuadrada = 0; 
export function standar(boton) {
    const zonaOpe = document.getElementById("zona-operaciones"),
        zonaIngre = document.getElementById("numero-ingresado");
    function Clear() {
        zonaOpe.innerText = "";
        zonaIngre.innerText = "0";
        varUltimoNum = "";
        punto = false;
        puntos = "";
    }
    function ImprimirEnPantalla(res) { 
        varUltimoNum = res;
        zonaOpe.innerText += res; 
        if("+-*/".includes(res)){
            puntos += (punto)?"1":"0";
            punto = false;
        }
        if("." === res) punto = true;
    }
    function Delete() {
        let arr = zonaOpe.innerText.split(""), nuevoArr = [], res = "";
        if (zonaOpe.innerText != "") {
            let numFor = 1;
            if ("+-*/".includes(arr[(arr.length - 1)])) {
                punto = ((puntos.slice((puntos.length - 1), puntos.length)) == "1") ? true: false;
                puntos = puntos.slice(0, (puntos.length - 1));
                numFor = (("+" === arr[(arr.length - 1)]) && ("e" === arr[(arr.length - 2)])) ? 2 : 1;
            }
            if ("." === arr[(arr.length - 1)]) punto = false;
            for (let i = 0; i < (arr.length - numFor); i++) nuevoArr.push(arr[i]);
            nuevoArr.forEach(el => res += el);
            zonaOpe.innerText = res;
            varUltimoNum = nuevoArr[(nuevoArr.length - ((numFor === 1) ? 1: 3))];
            if (")" === arr[(arr.length - 1)]){
                zonaOpe.innerText = zonaOpe.innerText.split("").reverse().join().replaceAll(",","").replace("-(","").split("").reverse().join().replaceAll(",","");
            }
            if (zonaOpe.innerText == "") varUltimoNum = "";
            //console.log(varUltimoNum)
        }
    }
    function Negacion() {
        let cadenaConParentesis = zonaOpe.innerText.replaceAll("/", " ").replaceAll("*", " ").replaceAll("+", " ").replaceAll("(-", " ").replaceAll(")", " ").replaceAll("-", " ").split(" "), i = 1, parente = "";
        let ultimoNum = cadenaConParentesis[(cadenaConParentesis.length - i)],
            cadena = zonaOpe.innerText.slice(0, (zonaOpe.innerText.length - ultimoNum.length));
        zonaOpe.innerText = `${cadena}(-${ultimoNum})${parente}`;
        varUltimoNum = ")";
    }
    function UnoEntreX() {
        let cadenaConParentesis = zonaOpe.innerText.replaceAll("/", " ").replaceAll("*", " ").replaceAll("+", " ").replaceAll("(-", " ").replaceAll(")", " ").replaceAll("-", " ").split(" "), ultimoNum, cadenaSin = zonaOpe.innerText.replaceAll("/", " ").replaceAll("*", " ").replaceAll("+", " ").replaceAll("-", " ").split(" "), cadena;
        (cadenaSin[(cadenaSin.length - 2)] === "(")
            ?(() => { 
                ultimoNum = `(-${cadenaConParentesis[(cadenaConParentesis.length - 2)]})`; varUltimoNum = ")"; 
            })()
            :(() => { ultimoNum = `${
                cadenaConParentesis[(cadenaConParentesis.length - 1)]}`; varUltimoNum = "0";//puse este numero(0) para que se asigne un valor numerico
            })();
        cadena = zonaOpe.innerText.slice(0, (zonaOpe.innerText.length - ultimoNum.length));
        zonaOpe.innerText = `${cadena}1/${ultimoNum}`;
    }
    function AlCuadrado() {
        let numero, arr;
        function elevar() {
            if (varUltimoNum !== ")"){
                arr =zonaOpe.innerText.replaceAll("/", " ").replaceAll("*", " ").replaceAll("+", " ").replaceAll("(-", " ").replaceAll(")", " ").replaceAll("-", " ").split(" ");
                let secondNum = (arr[(arr.length - 2)] != undefined) ? arr[(arr.length - 2)].split(""): "123";
                (secondNum[(secondNum.length - 1)] === "e")
                    ?(() => {
                        numero = parseFloat(`${arr[(arr.length - 2)]}+${arr[(arr.length - 1)]}`)*parseFloat(`${arr[(arr.length - 2)]}+${arr[(arr.length - 1)]}`);
                        for (let i = 0; i < (arr[(arr.length - 1)].length + arr[(arr.length - 2)].length); i++) Delete();
                        vezPuntoEnCuadrado++;
                    })()
                    :(() => {
                        numero = parseFloat(arr[(arr.length - 1)])*parseFloat(arr[(arr.length - 1)]);
                        for (let i = 0; i < arr[(arr.length - 1)].length; i++) Delete();
                    })();
                zonaOpe.innerText += `${numero}`;
                varUltimoNum = "9";
            }
            if (vezPuntoEnCuadrado === 1) {
                puntos += "1";
                punto = false;
            }
        }
        elevar();
        if(varUltimoNum === ")"){
           Delete();
           elevar();
        }
        `${numero}`.split("").forEach(el => {if(el === "+") ultimoBotonPresionado = true;})
     }
     function RaizCuadrada() {
        let numero, arr;
        function elevar() {
            if (varUltimoNum !== ")"){
                arr =zonaOpe.innerText.replaceAll("/", " ").replaceAll("*", " ").replaceAll("+", " ").replaceAll("(-", " ").replaceAll(")", " ").replaceAll("-", " ").split(" ");
                let secondNum = (arr[(arr.length - 2)] != undefined) ? arr[(arr.length - 2)].split(""): "123";
                (secondNum[(secondNum.length - 1)] === "e")
                    ?(() => {
                        numero = Math.sqrt(parseFloat(`${arr[(arr.length - 2)]}+${arr[(arr.length - 1)]}`));
                        for (let i = 0; i < (arr[(arr.length - 1)].length + arr[(arr.length - 2)].length); i++) Delete();
                    })()
                    :(() => {
                        numero = Math.sqrt(parseFloat(arr[(arr.length - 1)]));
                        for (let i = 0; i < arr[(arr.length - 1)].length; i++) Delete();
                    })();
                for (let i = 0; i < `${numero}`.length; i++) {
                    if (`${numero}`.split("")[i] === ".")vezPuntoRaizCuadrada = 1;
                }
                zonaOpe.innerText += `${numero}`;
                varUltimoNum = "9";
            }
            if (vezPuntoRaizCuadrada === 1) {
                //puntos += "1";
                punto = true;
            }
        }
        elevar();
        if(varUltimoNum === ")"){
           Delete();
           elevar();
        }
        `${numero}`.split("").forEach(el => {
            if(el === "+") ultimoBotonPresionado = true;
        })
     }
     function Igual() {
        let arrResOrdenado = zonaOpe.innerText.split(""), strNums = "", strOpe = "", arrStrNums = [];
        for (let i = 0; i < arrResOrdenado.length; i++) {
            if ("0123456789.e".includes(arrResOrdenado[i])) strNums += arrResOrdenado[i];
            else {
                if (strNums.split("")[strNums.split("").length - 1] === " ") strOpe += arrResOrdenado[i];
                else {
                    strNums += " ";
                    strOpe += arrResOrdenado[i];
                }
            }
        }
        strOpe = strOpe.replaceAll("(-)", "~").split("");
        strNums = strNums.split(" ");
        for (let i = 0; i < strNums.length; i++) {
            if (strNums[i] !== "") arrStrNums.push(strNums[i]);
        }
        let arrNumsF = [], arrOpeF = [], ope = 0;
        for (let i = 0; i < arrStrNums.length; i++) {
            let numero = "";
            if (strOpe[ope] == "~") numero = `-${arrStrNums[i]}`;
            if (arrStrNums[i].split("")[arrStrNums[i].split("").length - 1] === "e") {
                numero += (strOpe[ope + 1] === "~") ? `${arrStrNums[i]}-${arrStrNums[(i + 1)]}` : `${arrStrNums[i]}+${arrStrNums[(i + 1)]}`;
                ope++;
                i++;
            }
            ////console.log(ope)
            if (strOpe[ope] !== "~") arrOpeF.push(strOpe[ope]);
            if (numero == "") numero = arrStrNums[i];
            ope++;
            arrNumsF.push(parseFloat(numero));
        }
        /* //console.log(arrNumsF);
        //console.log(arrOpeF); */
        let resultado = arrNumsF[0];
        for (let i = 0; i < arrOpeF.length; i++) {
            //console.log(resultado)
            switch (arrOpeF[i]) {
                case "+":
                    resultado += arrNumsF[(i + 1)];
                    break;
                case "*":
                    resultado *= arrNumsF[(i + 1)];
                    break;
                case "/":
                    resultado /= arrNumsF[(i + 1)];
                    break;
                case "-":
                    resultado -= arrNumsF[(i + 1)];
                    break;
                default:
                    break;
            }
        }
        document.getElementById("memory_zone").innerHTML += `
            <article>
                <div class="memory_zone-num-ope">${zonaOpe.innerText}</div>
                <div class="memory_zone-num-p">${resultado}</div>
            </article>`;
        Clear();
        zonaIngre.innerText = resultado;
     }
     function Modulo() {}
     if (zonaOpe.innerText.includes("Infinity") || zonaOpe.innerText.includes("NaN")) Clear();
    switch (boton.textContent) {
        case " ": document.getElementById("memory_zone").innerHTML = "";
            break;
        case "C": Clear();
            break;
        case "CE": Clear();
            break;
        case "=": if (zonaOpe.innerText !== "") Igual();
            break;
        case "": Delete();
            break;
        case "%": Modulo();
            break;
        default:
            if (varUltimoNum == "") {
                if ("0123456789".includes(boton.textContent)) ImprimirEnPantalla(boton.textContent);
            }
            else{
                if (ultimoBotonPresionado) {
                    vezPuntoEnCuadrado = 0;
                    vezPuntoRaizCuadrada = 0;
                    if ("0123456789)".includes(varUltimoNum) && ("+-*/".includes(boton.textContent))){ 
                        ImprimirEnPantalla(boton.textContent); 
                        ultimoBotonPresionado = false;
                    }
                    else if ("0123456789".includes(boton.textContent) && ("+-*/".includes(varUltimoNum))){ 
                        ImprimirEnPantalla(boton.textContent); 
                        ultimoBotonPresionado = false;
                    }
                    else if ("+-*/".includes(varUltimoNum) && "+-*/".includes(boton.textContent)) { 
                        ImprimirEnPantalla(boton.textContent); 
                        Delete();
                        ultimoBotonPresionado = false;
                    }
                    else if ((boton.textContent == "x^2") && "0123456789)".includes(varUltimoNum)) {
                        AlCuadrado();
                        ultimoBotonPresionado = false;
                    }
                    else if ("0123456789)".includes(varUltimoNum) && (boton.textContent == "2√x")) {
                        RaizCuadrada();
                        ultimoBotonPresionado = false;
                    }
                } else {
                    if ("0123456789".includes(varUltimoNum) && "0123456789".includes(boton.textContent)) ImprimirEnPantalla(boton.textContent);
                    else if ("0123456789".includes(varUltimoNum) && (boton.textContent == ".") && (punto == false)) ImprimirEnPantalla(boton.textContent);
                    else if ("0123456789".includes(boton.textContent) && (varUltimoNum == ".")) ImprimirEnPantalla(boton.textContent);
                    else if ("0123456789)".includes(varUltimoNum) && ("+-*/".includes(boton.textContent))) ImprimirEnPantalla(boton.textContent);
                    else if ("0123456789".includes(boton.textContent) && ("+-*/".includes(varUltimoNum))) ImprimirEnPantalla(boton.textContent);
                    else if ("+-*/".includes(varUltimoNum) && "+-*/".includes(boton.textContent)) { ImprimirEnPantalla(boton.textContent); Delete(); } 
                    else if ((boton.textContent == "+/-") && "0123456789".includes(varUltimoNum)) Negacion();
                    else if ("0123456789)".includes(varUltimoNum) && (boton.textContent == "1/x")) UnoEntreX();
                    else if ((boton.textContent == "x^2") && "0123456789)".includes(varUltimoNum)) AlCuadrado();
                    else if ("0123456789)".includes(varUltimoNum) && (boton.textContent == "2√x")) RaizCuadrada();
                }
            }
            break;
    }
}