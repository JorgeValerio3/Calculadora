export async function loadProgram(name = "standar", title = "Standar") {
    const ls = localStorage;
    try {
        const res = await fetch(`./programs/${name}.html`);
        const text = await res.text();
        ls.setItem("SeccionCalculadora", `${name},${title}`);
        document.getElementById("main").innerHTML = text;
        document.querySelector(".nombre-programa").innerHTML = title;
    } catch (error) {
        console.error("Error loading program html:", error);
    }
}