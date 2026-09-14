const botonNota = document.getElementById("btnNota");
const notaTexto = document.getElementById("notaTexto");

botonNota.addEventListener("click", function () {

    if (notaTexto.textContent === "") {

        notaTexto.textContent =
            "Los textos fueron generados por ChatGPT y adaptados a la consigna. Pueden contener errores. Las imágenes fueron recopiladas de Internet únicamente para su uso en este parcial.";

    } else {

        notaTexto.textContent = "";
    }

});