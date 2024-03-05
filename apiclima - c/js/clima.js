// Crear selectores
const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=> {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad);
    // console.log(pais);


    // Vamos a validar los campos antes de enviarlos
    if (ciudad==='' || pais ==='') {    
        mostrarError('Los campos son obligatorios')
        return
    }else{
        // console.log('campos llenos');
        consultarAPI(ciudad,pais)
    }
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alertaMsj = document.createElement('div');       
        alertaMsj.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','relative','max-w-md','mx-auto','mt-6','text-center')
        alertaMsj.innerHTML = `
        <strong class="font-bold">Error</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;
        contenedor.appendChild(alertaMsj);

        setTimeout(()=>{
            alertaMsj.remove();
        },3000);

    }
}

function consultarAPI(ciudad,pais){
    // url
    // imprimir resultado

    const appid = '8260c827989993c7ede4df778ac3e4af'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    spinner()

    fetch(url)
        .then(respuesta=>{
            return respuesta.json();
        })
        .then(datos=>{
            console.log(datos);
            limpiarHTML();

            // Validacion
            if (datos.cod ==='404') {
                mostrarError('La ciudad ingresada no ha sido encontrada, mi pana');
            }else{
                mostrarClima(datos);
            }
        })
        .catch(error=>{
            console.log(error);
        })
}

function mostrarClima(datos) {
    // console.log('mostrar datos clima');    

    const {name, main:{temp, temp_max, temp_min}} = datos;

    const grados = kelvinACent(temp);
    // console.log(grados);
    const min = kelvinACent(temp_min);
    const max = kelvinACent(temp_max);

    // armar estructura HTML
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-blod','text-2xl');

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${grados} &#8451`
    tempActual.classList.add('font-bold','text-6xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = ` Min: ${min} &#8451`
    tempMinima.classList.add('text-xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = ` Max: ${max} &#8451`
    tempMaxima.classList.add('text-xl');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual)
    resultadoDiv.appendChild(tempMinima)
    resultadoDiv.appendChild(tempMaxima)

    resultado.appendChild(resultadoDiv);
}

function kelvinACent(grados) {
    return parseInt(grados - 273.15)
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }    
}

function spinner() {
    limpiarHTML()

    
    const divSpinner = document.createElement('p');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"><div>
    <div class="sk-circle2 sk-circle"><div>
    <div class="sk-circle3 sk-circle"><div>
    <div class="sk-circle4 sk-circle"><div>
    <div class="sk-circle5 sk-circle"><div>
    <div class="sk-circle6 sk-circle"><div>
    <div class="sk-circle7 sk-circle"><div>
    <div class="sk-circle8 sk-circle"><div>
    <div class="sk-circle9 sk-circle"><div>
    <div class="sk-circle10 sk-circle"><div>
    <div class="sk-circle11 sk-circle"><div>
    <div class="sk-circle12 sk-circle"><div>
    `

    resultado.appendChild(divSpinner)
}








// const formulario = document.querySelector('#formulario');

// formulario.addEventListener('submit', buscarClima);

// function buscarClima(e) {
//     e.preventDefault();

//     const ciudad = document.querySelector('#ciudad').value;
//     const pais = document.querySelector('#pais').value;

//     console.log(ciudad, pais);

//     if (ciudad==="" || pais==="") {
//         console.log('Campos vacios');        
//     }else{
//         // console.log('campos llenos');
//         consultarApi(ciudad,pais)
//     }
// }

// function consultarApi(ciudad, pais) {
//     const appid = `58873e255b75fc538b4df5514e2537b9`

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

//     fetch(url)
//     .then(respuesta=>{return respuesta.json()})
//     .then(datos=>{console.log(datos)
//         if (datos.cod === '404') {
//                 console.log('La ciudad no ha sido encontrada');
//         }else{
//             console.log('ciudad correcta');
//         }
//     })
//         .catch(error=>console.log(error))

// }
