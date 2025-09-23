// CONSTANTES Y ARRAYS DE DATOS

// Array de cursos disponibles
const cursos = [
    "canto",
    "teclado",
    "bajo",
    "batería",
    "guitarra eléctrica",
    "guitarra acústica",
    "violín"
];

// Precio base de curso
const PRECIO_BASE = 5000;

// Descuento en porcentaje
const DESCUENTO = 10;

// ====== FUNCIONES PRINCIPALES ======

  returns {string} 
 
function solicitarCurso() {
    let mensajeCursos = "Clases disponibles:\n";
    cursos.forEach(curso => {
        mensajeCursos += `- ${curso.charAt(0).toUpperCase() + curso.slice(1)}\n`;
    });
    
    return prompt(mensajeCursos + "\nPor favor, elige una clase:").toLowerCase();
}

   param {string} cursoElegido 
   returns {boolean} 
 
function validarCurso(cursoElegido) {
   
    return cursos.includes(cursoElegido);
}

   param {boolean} aplicaDescuento 
   returns {number} 
 
function calcularCosto(aplicaDescuento) {
    if (aplicaDescuento) {
        // descuento del 10%
        return PRECIO_BASE - (PRECIO_BASE * (DESCUENTO / 100));
    }
    return PRECIO_BASE;
}

  Resumen de la inscripción al usuario.
   param {string} nombreUsuario
   param {string} cursoInscrito
   param {number} costoFinal
  
function mostrarResumen(nombreUsuario, cursoInscrito, costoFinal) {
    const mensaje = `
    ¡Hola, ${nombreUsuario}!

    Te has inscrito con éxito en la clase de "${cursoInscrito}".

    El costo total de tu clase es: $${costoFinal}.

    ¡Te esperamos!
    `;

    console.log("=== Resumen de Inscripción ===");
    console.log(mensaje);
    console.log("===============================");
    
    alert(mensaje);
}

function iniciarSimulador() {
    let continuar = true;

    while (continuar) {

        const nombreUsuario = prompt("¡Bienvenido a la academia! ¿Cuál es tu nombre?").trim();

        if (nombreUsuario) { 
            const cursoElegido = solicitarCurso();

            if (validarCurso(cursoElegido)) {
                
                const quiereDescuento = confirm("¿Quieres un 10% de descuento por ser estudiante del bootcamp?");
                
                const costoFinal = calcularCosto(quiereDescuento);
                
                mostrarResumen(nombreUsuario, cursoElegido, costoFinal);

            } else {
                alert(`Lo sentimos, la clase de "${cursoElegido}" no está disponible.`);
                console.warn(`Intento de inscripción a curso no disponible: "${cursoElegido}"`);
            }
        } else {
            alert("No ingresaste un nombre. Por favor, inténtalo de nuevo.");
        }

        // Pregunta para bucle
        continuar = confirm("¿Quieres realizar otra consulta o inscripción?");
    }

    alert("Gracias por usar el simulador. ¡Hasta pronto!");
}

iniciarSimulador();