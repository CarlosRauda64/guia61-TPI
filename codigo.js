/* DATOS PERSONALES
Nombre: Carlos Daniel Rauda Contreras
Carnet: RC22011
Asignatura: TPI 115 */
const endpoint = 'https://retoolapi.dev/iOvhhb/data'; // API endpoint
const tbody = document.querySelector('#tbody'); // elemento tbody
const btnAdd = document.querySelector('#add-btn'); // botón de agregar
const addContainer = document.querySelector('#add-container'); // contenedor de agregar
const btnCancelar = document.querySelector('#can-btn-forms'); // botón de cancelar
const btnAgregar = document.querySelector('#add-btn-forms'); // botón de agregar
const limpiarFiltrosBtn = document.querySelector('#limpiar-filtros'); // botón de limpiar filtros

// Función para mostrar artículos
function mostrarArticulos() {
    const main = document.querySelector('#main');
    main.classList.toggle('active');
}

// Función para obtener artículos
getArticulos = async () => {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        tbody.innerHTML = '';
        data.forEach((articulo) => {
            // Verifica que los campos no sean números
            if (isNaN(articulo.image) && isNaN(articulo.title) && isNaN(articulo.category) && isNaN(articulo.description)) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <tr>
                <td class="container-img"><img src="${articulo.image}" alt="${articulo.title}-img"></td>
                <td>${articulo.title}</td>
                <td>$${articulo.price}</td>
                <td>${articulo.category}</td>
                <td>${articulo.description}</td>
            <tr>
            `;
                tbody.appendChild(tr);
            }
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

//Se invoca para colocar los articulos en la tabla
getArticulos();

// Función para filtrar los articulos
filtrarArticulos = async () => {
    try {
        const filtroCategory = document.querySelector('#filtro-category').value;
        const filtroPrice = document.querySelector('#filtro-price').value;
        let buscar = ``;
        if (filtroCategory !== '') {
            buscar = `/?category=${filtroCategory}`;
        }else{
            buscar = ``;
        }
        const response = await fetch(`${endpoint}${buscar}`);
        let data = await response.json();
        tbody.innerHTML = '';
        if (filtroPrice === 'asc') {
            data = ordenarAscendente(data);
        } else if (filtroPrice === 'desc') {
            data = ordenarDescendente(data);
        }
        console.log(data);
        data.forEach((articulo) => {
            if (isNaN(articulo.image) && isNaN(articulo.title) && isNaN(articulo.category) && isNaN(articulo.description)) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <tr>
                <td class="container-img"><img src="${articulo.image}" alt="${articulo.title}-img"></td>
                <td>${articulo.title}</td>
                <td>$${articulo.price}</td>
                <td>${articulo.category}</td>
                <td>${articulo.description}</td>
            <tr>
            `;
                tbody.appendChild(tr);
            }
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

function ordenarAscendente(data) {
    return data.sort((a, b) => a.price - b.price);
}
function ordenarDescendente(data) {
    return data.sort((a, b) => b.price - a.price);
}

limpiarFiltrosBtn.addEventListener('click', () => {
    getArticulos();
    document.querySelector('#filtro-category').querySelector('option').selected = true;
    document.querySelector('#filtro-price').querySelector('option').selected = true;
});
