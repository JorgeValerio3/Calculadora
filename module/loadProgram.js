export async function loadProgram(name = "standar", code = "Standar"/* name = "converter", code = " Currency" */) {
    const ls = localStorage;
    await fetch(`./programs/${name}.html`)
            .then(res => res.text())
            .then(text => {
                ls.setItem("SeccionCalculadora", `${name},${code}`);
                document.getElementById("main").innerHTML = text;
            })
            .catch(err => console.error(err));
    document.querySelector(".nombre-programa").innerHTML = code;

    /* document.getElementById("styles_programs").href = `css_programs/${name}.css`;
    const xhr = new XMLHttpRequest();
    document.getElementById("styles_programs").href = `css_programs/${name}.css`;
    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState != 4) return;
        document.getElementById("main").innerHTML = xhr.response;
    })
    xhr.open("GET", `./programs/${name}.html`);
    xhr.send();
    document.querySelector(".nombre-programa").innerHTML = code; */
}