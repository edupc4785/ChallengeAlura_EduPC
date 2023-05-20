const textArea = document.querySelector(".texto_receptor");
const mensaje = document.querySelector(".texto_encriptado");
const regex = /[^a-z\s\n]/g;
const advertencia = document.querySelector(".informacion");

/* La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" */

function btnEncriptar() {
    if (verificarEspacios(textArea.value) == true){
        mensaje.value = "No se detectó texto válido"
        var duracion = 2500;
        setTimeout(function() {mensaje.value = ""; textArea.value = ""}, duracion);
    } else {
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
    }
}

function encriptar(stringEncriptado) {
    let matrizCodigo = [["e", "enter"],["i", "imes"],["a", "ai"],["o", "ober"],["u", "ufat"]];
    stringEncriptado = stringEncriptado.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptado.includes(matrizCodigo[i][0])) {
            stringEncriptado = stringEncriptado.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        } 
    }

    return stringEncriptado;
}

function btnDesencriptar() {
    if (verificarEspacios(textArea.value) == true){
        mensaje.value = "No se detecto texto valido"
    } else {
        const textoDesencriptado = desencriptar(textArea.value);
        mensaje.value = textoDesencriptado;}
}

function desencriptar(stringDesencriptado) {
    let matrizCodigo = [["e", "enter"],["i", "imes"],["a", "ai"],["o", "ober"],["u", "ufat"]];
    stringDesencriptado = stringDesencriptado.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptado.includes(matrizCodigo[i][1])) {
            stringDesencriptado = stringDesencriptado.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        } 
    }

    return stringDesencriptado;
}

function copiar() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value);
}

function eliminar() {
    textArea.value = "";
    mensaje.value = "";
}

textArea.addEventListener('input', 
    function() {
        let inputValue = textArea.value;
        if (regex.test(inputValue)) {
            //Evita que se pongan Mayusculas y Caracteres Especiales
            inputValue = inputValue.replace(regex, '');
            textArea.value = inputValue;

            // Advertencia MODIFICADOR
            advertencia.style.backgroundColor = "red";
            advertencia.style.color = "white";
            var duracion = 1000;
            setTimeout(function() {
                advertencia.style.backgroundColor = "transparent";
                advertencia.style.color = "#929292";
                }, duracion);
        }
    });

function verificarEspacios(texto) {
    if (texto.trim() === '') {
        return true;
    }
}

function teclaEnter(){
    let teclaEnter = window.event.keyCode;
    if (teclaEnter == 13) {
        btnEncriptar();
    }
}

window.addEventListener('keydown', teclaEnter);