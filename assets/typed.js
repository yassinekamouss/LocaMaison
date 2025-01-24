document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#typed")) {
        const options = {
            strings: [
                "Chez vous, où que vous soyez.",
                "LocaMaison, votre clé pour des séjours inoubliables."
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            backDelay: 1000,
        };
        new Typed("#typed", options);
    }
});
