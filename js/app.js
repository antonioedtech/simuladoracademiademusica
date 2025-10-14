// CONSTANTES Y ARRAYS DE DATOS

// Array de cursos disponibles
const CURSOS = [
    { nombre: "canto", costo: 5000 },
    { nombre: "teclado", costo: 5000 },
    { nombre: "bajo", costo: 5000 },
    { nombre: "batería", costo: 5000 },
    { nombre: "guitarra eléctrica", costo: 5000 },
    { nombre: "guitarra acústica", costo: 5000 },
    { nombre: "violín", costo: 5000 },
];

const DESCUENTO_PORCENTAJE = 10;
const STORAGE_KEY = 'alumnosInscritos';

// Constructor (Clase) para los objetos de alumno
class Alumno {
    constructor(nombre, curso, costoFinal, aplicaDescuento) {
        this.nombre = nombre;
        this.curso = curso;
        this.costoFinal = costoFinal;
        this.aplicaDescuento = aplicaDescuento;
    }
  }

// Referencias del DOM 
const formInscripcion = document.getElementById('formulario-inscripcion');
const selectCurso = document.getElementById('curso');
const resultadoDiv = document.getElementById('resultado-inscripcion');
const seccionResumen = document.getElementById('seccion-resumen');
const btnVerAlumnos = document.getElementById('btn-ver-alumnos');
const listaAlumnosUl = document.getElementById('lista-alumnos');
const seccionAlumnos = document.getElementById('seccion-alumnos');


// FUNCIONES DE PROCESAMIENTO

/**
 * Calcula el costo final del curso.
 * @param {string} nombreCurso - Nombre del curso seleccionado.
 * @param {boolean} aplicaDescuento - Indica si aplica el descuento.
 * @returns {number} Costo final.
 */
function calcularCosto(nombreCurso, aplicaDescuento) {
    // Busca el objeto curso para obtener el costo base (escalabilidad)
    const cursoObj = CURSOS.find(curso => curso.nombre === nombreCurso);
    let costoBase = cursoObj ? cursoObj.costo : 0;

    if (aplicaDescuento) {
        // Aplicar descuento
        return costoBase - (costoBase * (DESCUENTO_PORCENTAJE / 100));
    }
    return costoBase;
}


// FUNCIONES DE MANIPULACIÓN DEL DOM (SALIDA)

/**
 * Llena el <select> de cursos al cargar la página.
 */
function cargarCursosEnDOM() {
    CURSOS.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.nombre;
        // Capitaliza la primera letra para mostrar
        option.textContent = curso.nombre.charAt(0).toUpperCase() + curso.nombre.slice(1);
        selectCurso.appendChild(option);
    });
}

/**
 * Muestra el resumen de la inscripción en el HTML.
 * @param {Alumno} nuevoAlumno - El objeto alumno recién creado.
 */
function mostrarResumenDOM(nuevoAlumno) {
    seccionResumen.classList.remove('resumen-oculto'); // Muestra la sección

    resultadoDiv.innerHTML = `
        <h3>¡Felicidades, ${nuevoAlumno.nombre}!</h3>
        <p>Te has inscrito en la clase de <strong>${nuevoAlumno.curso.toUpperCase()}</strong>.</p>
        <p class="costo-final">
            Costo Total: 
            <strong>$${nuevoAlumno.costoFinal.toFixed(2)}</strong> 
            ${nuevoAlumno.aplicaDescuento ? '(Con descuento aplicado)' : ''}
        </p>
    `;
}

/**
 * Muestra la lista de todos los alumnos guardados en LocalStorage.
 */
function listarAlumnosDOM() {
    const alumnos = obtenerAlumnosDeStorage();
    listaAlumnosUl.innerHTML = ''; // Limpia la lista

    if (alumnos.length === 0) {
        listaAlumnosUl.innerHTML = '<li>No hay alumnos inscritos aún.</li>';
        return;
    }

    alumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${alumno.nombre}</strong> - Clase: ${alumno.curso.toUpperCase()} 
            ($${alumno.costoFinal.toFixed(2)})
        `;
        listaAlumnosUl.appendChild(li);
    });
    
    seccionAlumnos.classList.remove('alumnos-oculto'); // Muestra la lista
}


// FUNCIONES DE LOCALSTORAGE

/**
 * Obtiene el array de alumnos guardado en LocalStorage.
 * @returns {Array<Alumno>}
 */
function obtenerAlumnosDeStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    // Si no hay datos, devuelve un array vacío
    return data ? JSON.parse(data) : [];
}

/**
 * Guarda un nuevo alumno en LocalStorage.
 * @param {Alumno} nuevoAlumno - Objeto alumno a guardar.
 */
function guardarAlumnoEnStorage(nuevoAlumno) {
    const alumnos = obtenerAlumnosDeStorage();
    alumnos.push(nuevoAlumno);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
}


// MANEJO DE EVENTOS (ENTRADA)

/**
 * Maneja el evento de envío del formulario.
 * @param {Event} e - Evento de envío del formulario.
 */
function handleInscripcion(e) {
    e.preventDefault(); // Detiene el comportamiento por defecto (recargar la página)

    // Lectura de datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const curso = document.getElementById('curso').value;
    const aplicaDescuento = document.getElementById('aplicar-descuento').checked;

    // Validación simple 
    if (!nombre || !curso) {
        // Se usa el DOM para un mensaje de error
        resultadoDiv.innerHTML = '<p class="error-msg">Por favor, completa todos los campos requeridos.</p>';
        seccionResumen.classList.remove('resumen-oculto');
        return;
    }

    // Procesamiento
    const costoFinal = calcularCosto(curso, aplicaDescuento);

    // Creación del objeto y LocalStorage
    const nuevoAlumno = new Alumno(nombre, curso, costoFinal, aplicaDescuento);
    guardarAlumnoEnStorage(nuevoAlumno); // Guarda el alumno

    // Salida (Modificación del DOM)
    mostrarResumenDOM(nuevoAlumno);
    formInscripcion.reset(); // Limpia el formulario después de la inscripción
}

/**
 * Inicializa la aplicación, carga datos y configura eventos.
 */
function init() {
    // Carga inicial del DOM
    cargarCursosEnDOM();

    // Eventos (Homogéneo y centralizado)
    formInscripcion.addEventListener('submit', handleInscripcion);
    btnVerAlumnos.addEventListener('click', listarAlumnosDOM);
}

// Inicia la aplicación al cargar el script
init();