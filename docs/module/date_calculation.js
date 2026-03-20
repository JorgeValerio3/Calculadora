export function initDateCalc() {
    const $container = document.querySelector(".date_calculation");
    if (!$container) return null;

    const $selectOpe = $container.querySelector(".dateOpe_select");
    const $resSelect = document.getElementById("resSelect");

    function createOptions() {
        let opts = "";
        for (let i = 0; i <= 999; i++) {
            opts += `<option value="${i}">${i}</option>`;
        }
        return opts;
    }

    const view1 = `
        <h3>Desde:</h3>
        <input type="date" id="inputDateIngreso">
        <h3>Hasta:</h3>
        <input type="date" id="inputDateSalida">
        <br><br>
        <h3>Diferencia:</h3>
        <h3 id="date_fecha"></h3>
        <h4 class="date_alert">Ingrese ambos parametros</h4>`;

    const view2 = `
        <h3>Desde:</h3>
        <input type="date" id="inputDateIngreso">
        <br><br>
        <form class="date_form">
            <Label for="anadir">Sumar: </Label>
            <input type="radio" id="anadir" name="2daparte" value="add" checked>
            <Label for="sustraer">Restar: </Label>
            <input type="radio" id="sustraer" name="2daparte" value="sub">
            <br><br>
            <label for="anos">Años: </label><select id="anos">${createOptions()}</select>
            <label for="meses">Meses: </label><select id="meses">${createOptions()}</select>
            <label for="dias">Dias: </label><select id="dias">${createOptions()}</select>
        </form>
        <br>
        <h3>Fecha Resultante:</h3>
        <h3 id="date_fecha"></h3>
        <h4 class="date_alert">Ingrese parametros</h4>`;

    function renderView() {
        if ($selectOpe.value === "ope_1") {
            $resSelect.innerHTML = view1;
        } else {
            $resSelect.innerHTML = view2;
        }
    }

    function calculateDiff() {
        const d1Str = document.getElementById("inputDateIngreso")?.value;
        const d2Str = document.getElementById("inputDateSalida")?.value;
        const out = document.getElementById("date_fecha");
        const alert = document.querySelector(".date_alert");

        if (!d1Str || !d2Str) {
            alert.textContent = "Ingrese ambos parametros";
            out.textContent = "";
            return;
        }

        const d1 = new Date(d1Str);
        const d2 = new Date(d2Str);

        // Exact days
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let minDate = d1 < d2 ? d1 : d2;
        let maxDate = d1 < d2 ? d2 : d1;

        let years = maxDate.getFullYear() - minDate.getFullYear();
        let months = maxDate.getMonth() - minDate.getMonth();
        let days = maxDate.getDate() - minDate.getDate();

        if (days < 0) {
            months--;
            // get days in previous month
            const prevMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        let str = diffDays + " Dias Totales<br>";
        if (years > 0) str += `${years} Años, `;
        if (months > 0) str += `${months} Meses, `;
        str += `${days} Dias`;

        alert.textContent = "";
        out.innerHTML = str;
    }

    function calculateAddSub() {
        const dStr = document.getElementById("inputDateIngreso")?.value;
        const out = document.getElementById("date_fecha");
        const alert = document.querySelector(".date_alert");

        if (!dStr) {
            alert.textContent = "Ingrese la fecha base";
            out.textContent = "";
            return;
        }

        const anos = parseInt(document.getElementById("anos").value) || 0;
        const meses = parseInt(document.getElementById("meses").value) || 0;
        const dias = parseInt(document.getElementById("dias").value) || 0;
        const isAdd = document.getElementById("anadir").checked;

        const date = new Date(dStr);
        if (isAdd) {
            date.setFullYear(date.getFullYear() + anos);
            date.setMonth(date.getMonth() + meses);
            date.setDate(date.getDate() + dias);
        } else {
            date.setFullYear(date.getFullYear() - anos);
            date.setMonth(date.getMonth() - meses);
            date.setDate(date.getDate() - dias);
        }

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        alert.textContent = "";
        out.textContent = date.toLocaleDateString("es-ES", options);
    }

    function changeHandler(e) {
        if (e.target.matches(".dateOpe_select")) {
            renderView();
            return;
        }

        if ($selectOpe.value === "ope_1") {
            calculateDiff();
        } else {
            calculateAddSub();
        }
    }

    $container.addEventListener("change", changeHandler);
    $container.addEventListener("input", changeHandler); // for rapid number changes mapping

    renderView(); // Initial render

    return () => {
        $container.removeEventListener("change", changeHandler);
        $container.removeEventListener("input", changeHandler);
    };
}