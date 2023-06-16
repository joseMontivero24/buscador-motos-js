// VARIABLES
const scrollUp = document.querySelector('#scrollTop');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const cilindrada = document.querySelector('#cilindrada');
const color = document.querySelector('#color');


// btn para ir al inicio
window.onscroll = () =>{ // Mostrar u ocultar el botón al hacer scroll
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    scrollUp.classList.add('show');
  }else{
    scrollUp.classList.remove('show');
  }

  scrollUp.onclick = () =>{ // Ir al inicio de la página al presionar el botón
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  cilindrada: '',
  color: ''
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  mostrarMotos(motos); // muestra las motos al cargar

  // llenar las opciones de años
  llenarSelect();
})

// Event listener para los selectores de busqueda
marca.addEventListener('change', e => {
  datosBusqueda.marca = e.target.value;
  filtrarMotos();
});
year.addEventListener('change', e => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarMotos();
});
minimo.addEventListener('change', e => {
  datosBusqueda.minimo = e.target.value;
  filtrarMotos();
});
maximo.addEventListener('change', e => {
  datosBusqueda.maximo = e.target.value;
  filtrarMotos();
});
cilindrada.addEventListener('change', e => {
  datosBusqueda.cilindrada = e.target.value;
  filtrarMotos();
});

color.addEventListener('change', e => {
  datosBusqueda.color = e.target.value;
  filtrarMotos();
});

// FUNCIONES

function mostrarMotos(motos) {
  limpiarHTML(); // ELIMINA EL HTML PREVIO

  motos.forEach((moto) => {
    const motoHTML = document.createElement('div');
    motoHTML.classList.add('card');

    const { marca, modelo, year, cilindrada, precio, color, imagen } = moto;

    motoHTML.innerHTML = `
      <img src="${imagen}" alt="${marca} ${modelo}">
      <div class="card-info">
        <h3>${marca} ${modelo}</h3>
        <p>Año: ${year}</p>
        <p>Precio: ${precio}</p>
        <p>Cilindrada: ${cilindrada} cc</p>
        <p>Color: ${color}</p>
      </div>
    `;

    // insertar en el html
    resultado.appendChild(motoHTML);
  });
}

  

// limpiar html
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los años de select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //  agrega los años en el html
  }
}

// funcion que filtra en base a la busqueda
function filtrarMotos() {
  const resultado = motos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarCilindrada)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarMotos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No hay resultados. Busca con otros términos de búsqueda.';
  resultado.appendChild(noResultado);
}

function filtrarMarca(moto) {
  const { marca } = datosBusqueda;

  if (marca) {
    return moto.marca === marca;
  }
  return moto;
}

function filtrarYear(moto) {
  const { year } = datosBusqueda;

  if (year) {
    return moto.year === year;
  }
  return moto;
}

function filtrarMinimo(moto) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return moto.precio >= minimo;
  }
  return moto;
}

function filtrarMaximo(moto) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return moto.precio <= maximo;
  }
  return moto;
}

function filtrarCilindrada(moto) {
  const { cilindrada } = datosBusqueda;

  if (cilindrada) {
    return moto.cilindrada >= cilindrada;
  }
  return moto;
}

function filtrarColor(moto) {
  const { color } = datosBusqueda;

  if (color) {
    return moto.color === color;
  }
  return moto;
}


    

