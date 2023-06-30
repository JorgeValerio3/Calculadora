export function dark_mode(e) {
    function light() {
        document.querySelector("body").classList.add("light");
        document.querySelector(".dark_mode i").classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("darkMode", "light")
    }
    function dark() {
        document.querySelector("body").classList.remove("light");
        document.querySelector(".dark_mode i").classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("darkMode", "dark")
    }
    if (e.type === "click") {
        if (localStorage.getItem("darkMode") === "light") dark();
        else if (localStorage.getItem("darkMode") === "dark") light();
        else dark();
    } else {
        if (localStorage.getItem("darkMode") === "light") light();
        else if (localStorage.getItem("darkMode") === "dark") dark();
        else light();
    }
}