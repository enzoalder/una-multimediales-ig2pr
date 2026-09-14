
// VARIABLES
// para guardar la cantidad de obras
let cantidadObras = 0;

// contador de obras cargadas
let obrasCargadas = 0;

// Array para guardar las obras
let obras = [];

// Acumulador para la duración de las obras
let duracionTotal = 0;

// BUSCAMOS LOS ELEMENTOS DEL HTML

// Formulario de cantidad
let formCantidad = document.getElementById("formCantidad");
let cantidad = document.getElementById("cantidad");

// Sección de obras
let seccionObras = document.getElementById("seccionObras");
let formObra = document.getElementById("formObra");

let nombre = document.getElementById("nombre");
let duracion = document.getElementById("duracion");
let peso = document.getElementById("peso");

let btnObra = document.getElementById("btnObra");
let contador = document.getElementById("contador");

// Sección de parámetros
let seccionParametros =
    document.getElementById("seccionParametros");

let formParametros =
    document.getElementById("formParametros");

let tiempo =
    document.getElementById("tiempo");

let costo =
    document.getElementById("costo");

// Sección de resultados
let seccionResultados =
    document.getElementById("seccionResultados");

let btnReiniciar =
    document.getElementById("btnReiniciar");


// 
// 1ro INGRESAR CANTIDAD DE OBRAS


formCantidad.addEventListener("submit", function(event) {

    // Evita que el formulario recargue la página
    event.preventDefault();

    // Convierte el valor ingresado a número
    let cantidadIngresada = Number(cantidad.value);

    // Valida para que sean mínimo 2 obras
    if (cantidadIngresada < 2) {

        alert("Debe ingresar 2 obras o más.");

        return;
    }


    // Guarda la cantidad
    cantidadObras = cantidadIngresada;

    // Deshabilitamos el campo y el botón
    cantidad.disabled = true;
    formCantidad.querySelector("button").disabled = true;

    // Mostramos la sección para cargar obras
    seccionObras.classList.remove("oculto");

    // Ponemos el cursor en el primer campo
    nombre.focus();
});

// 2do INGRESAR LOS DATOS DE LAS OBRAS

formObra.addEventListener("submit", function(event) {

    // Evitamos recargar la página
    event.preventDefault();

    // Obtenemos los valores
    let nombreObra = nombre.value.trim();
    let duracionObra = Number(duracion.value);
    let pesoObra = Number(peso.value);

    // VALIDACIÓN DEL NOMBRE

    if (nombreObra === "") {

        alert("Debe ingresar el nombre de la obra.");
        nombre.focus();
        return;
    }

    // VALIDACIÓN DE LA DURACIÓN

    if (duracionObra < 1) {

        alert("La duración debe ser de 1 minuto o más.");
        duracion.focus();
        return;
    }

    // VALIDACIÓN DEL PESO

    if (pesoObra < 2) {

        alert("El peso debe ser de 2 MB o más.");
        peso.focus();
        return;
    }

    // GUARDA LA OBRA

    let obra = {
        nombre: nombreObra,
        duracion: duracionObra,
        peso: pesoObra
    };


    // Agrega la obra al array
    obras.push(obra);

    // Aumenta el contador
    obrasCargadas++;

    // Suma la duración
    duracionTotal = duracionTotal + duracionObra;

    // Actualizamos el texto del contador
    contador.textContent =
        "Obras cargadas: " +
        obrasCargadas +
        " de " +
        cantidadObras;


    // Limpia los campos
    formObra.reset();

    // VERIFICA SI CARGÓ TODAS LAS OBRAS

    if (obrasCargadas === cantidadObras) {

        // Deshabilitamos los campos
        nombre.disabled = true;
        duracion.disabled = true;
        peso.disabled = true;

        btnObra.disabled = true;


        // Mostramos el siguiente paso
        seccionParametros.classList.remove("oculto");


        // Ponemos el cursor en el primer campo
        tiempo.focus();

    }

});

// 3ro INGRESAR TIEMPO Y COSTO


formParametros.addEventListener("submit", function(event) {

    // Evita recargar la página
    event.preventDefault();

    // Convierte los valores a números
    let tiempoMB = Number(tiempo.value);
    let costoMB = Number(costo.value);

    // VALIDAR TIEMPO

    if (tiempoMB < 10) {

        alert(
            "El tiempo debe ser de 10 milisegundos o más."
        );
        tiempo.focus();
        return;
    }

    // VALIDAR COSTO

    if (costoMB < 20) {

        alert(
            "El costo debe ser de $20 o más por MB."
        );
        costo.focus();
        return;
    }



    // DESHABILITAMOS LOS PARÁMETROS

    tiempo.disabled = true;
    costo.disabled = true;
    formParametros.querySelector("button").disabled = true;


    // 1. DURACIÓN TOTAL

    document.getElementById("resultadoTotal").textContent =
        duracionTotal;

    // 2. DURACIÓN PROMEDIO

    let duracionPromedio =
        duracionTotal / obras.length;

    document.getElementById("resultadoPromedio").textContent =
        duracionPromedio.toFixed(2);

    // 3. BUSCAR LA OBRA MÁS LARGA

    // Arranca suponiendo que la primera
    // obra es la de mayor duración

    let obraMayor = obras[0];

    // Recorre el resto de las obras
    for (let i = 1; i < obras.length; i++) {

        if (obras[i].duracion > obraMayor.duracion) {
            obraMayor = obras[i];
        }
    }


    // Muestra el nombre de la obra
    document.getElementById("resultadoMayor").textContent =
        obraMayor.nombre;

    // 4. TIEMPO DE TRANSFERENCIA
    // Multiplica el peso de la obra
    // por el tiempo por MB

    let transferencia =
        obraMayor.peso * tiempoMB;

    // Lo pasamos a segundos
    let transferenciaSegundos =
        transferencia / 1000;

    let resultadoTransferencia =
        document.getElementById("resultadoTransferencia");

    // Si tarda menos de un segundo,
    // mostramos el resultado en verde

    if (transferencia < 1000) {
        resultadoTransferencia.textContent =
            transferencia +
            " ms";
        resultadoTransferencia.className = "verde";
    }
    // Si tarda un segundo o más,
    // mostramos el resultado en rojo
    else {
        resultadoTransferencia.textContent =
            transferencia +
            " ms (" +
            transferenciaSegundos.toFixed(2) +
            " segundos)";
        resultadoTransferencia.className = "rojo";
    }

    // 5. PRESUPUESTO ANUAL
    // Primero calcula cuánto cuesta
    // almacenar todas las obras durante un mes
    let pesoTotal = 0;

    for (let i = 0; i < obras.length; i++) {
        pesoTotal = pesoTotal + obras[i].peso;
    }

    let costoMensual = pesoTotal * costoMB;

    // Después multiplica por 12 meses
    let presupuestoAnual =
        costoMensual * 12;

    // Mostra el resultado
    document.getElementById("resultadoPresupuesto").textContent =
        presupuestoAnual.toFixed(2);

    // MUESTRA LOS RESULTADOS
    seccionResultados.classList.remove("oculto");

    // HABILITA REINICIAR

    btnReiniciar.disabled = false;

});


// 4to REINICIAR EL SISTEMA

btnReiniciar.addEventListener("click", function() {

    // Vuelven las variables a su estado inicial

    cantidadObras = 0;
    obrasCargadas = 0;
    obras = [];
    duracionTotal = 0;


    // Se limpian los formularios

    formCantidad.reset();
    formObra.reset();
    formParametros.reset();


    // SE VUELVE A HABILITAR LOS CAMPOS

    cantidad.disabled = false;
    formCantidad.querySelector("button").disabled = false;
    nombre.disabled = false;
    duracion.disabled = false;
    peso.disabled = false;
    btnObra.disabled = false;
    tiempo.disabled = false;
    costo.disabled = false;
    formParametros.querySelector("button").disabled = false;

    // SE OCULTAN LAS SECCIONES

    seccionObras.classList.add("oculto");
    seccionParametros.classList.add("oculto");
    seccionResultados.classList.add("oculto");

    // Se pone el contador en cero

    contador.textContent =
        "Obras cargadas: 0";

    // Se deshabilita nuevamente reiniciar

    btnReiniciar.disabled = true;

    // Se pone el cursor en cantidad
    cantidad.focus();

});