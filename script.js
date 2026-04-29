// Base de datos de los 10 autos actualizados con la propiedad "imagen"
const carData = [
    {
        id: 1, marca: "Toyota", modelo: "Land Cruiser 300", anio: 2024,
        precio: "650.000.000", estado: "Importado", kilometraje: "0",
        motor: "3.3L V6 Twin-Turbo", puertas: "5", traccion: "4x4",
        placaTerminada: "N/A", placaDe: "N/A", transmision: "Automática",
        combustible: "Diésel", color: "Blanco Perla", carroceria: "SUV",
        imagen: "toyota-land-cruiser.jpg"
    },
    {
        id: 2, marca: "Chevrolet", modelo: "Corvette Z06", anio: 2023,
        precio: "950.000.000", estado: "Importado", kilometraje: "5.000",
        motor: "5.5L V8", puertas: "2", traccion: "RWD",
        placaTerminada: "8", placaDe: "Bogotá", transmision: "Automática 8 vel",
        combustible: "Gasolina", color: "Rojo", carroceria: "Coupé",
        imagen: "chevrolet-corvette-z06.jpg"
    },
    {
        id: 3, marca: "Mazda", modelo: "CX-90", anio: 2024,
        precio: "280.000.000", estado: "Importado", kilometraje: "0",
        motor: "3.3L Inline 6 Turbo", puertas: "5", traccion: "AWD",
        placaTerminada: "N/A", placaDe: "N/A", transmision: "Automática 8 vel",
        combustible: "Gasolina/MHEV", color: "Rojo Artesano", carroceria: "SUV",
        imagen: "mazda-cx90.jpg"
    },
    {
        id: 4, marca: "BMW", modelo: "M4 Competition", anio: 2022,
        precio: "600.000.000", estado: "Importado", kilometraje: "15.000",
        motor: "3.0L Twin-Turbo L6", puertas: "2", traccion: "RWD",
        placaTerminada: "3", placaDe: "Medellín", transmision: "Automática 8 vel",
        combustible: "Gasolina", color: "Gris Brooklyn", carroceria: "Coupé",
        imagen: "bmw-m4-competition.jpg"
    },
    {
        id: 5, marca: "Audi", modelo: "e-tron GT", anio: 2023,
        precio: "720.000.000", estado: "Importado", kilometraje: "0",
        motor: "Eléctrico Dual", puertas: "4", traccion: "Quattro (AWD)",
        placaTerminada: "N/A", placaDe: "N/A", transmision: "Automática 2 vel",
        combustible: "Eléctrico", color: "Negro Mito", carroceria: "Sedán Deportivo",
        imagen: "audi-etron-gt.jpg"
    },
    {
        id: 6, marca: "Toyota", modelo: "Corolla", anio: 2022,
        precio: "110.000.000", estado: "Usado", kilometraje: "35.000",
        motor: "1.8L Híbrido", puertas: "5", traccion: "FWD",
        placaTerminada: "5", placaDe: "Cali", transmision: "e-CVT",
        combustible: "Híbrido", color: "Plata", carroceria: "SUV",
        imagen: "toyota-corolla.jpg"
    },
    {
        id: 7, marca: "Chevrolet", modelo: "Tracker", anio: 2021,
        precio: "95.000.000", estado: "Usado", kilometraje: "42.000",
        motor: "1.2L Turbo", puertas: "5", traccion: "FWD",
        placaTerminada: "1", placaDe: "Barranquilla", transmision: "Automática 6 vel",
        combustible: "Gasolina", color: "Azul", carroceria: "SUV",
        imagen: "chevrolet-tracker.jpg"
    },
    {
        id: 8, marca: "Mazda", modelo: "3 Hatchback", anio: 2020,
        precio: "135.000.000", estado: "Usado", kilometraje: "28.000",
        motor: "2.5L Skyactiv-G", puertas: "5", traccion: "FWD",
        placaTerminada: "9", placaDe: "Bucaramanga", transmision: "Automática 6 vel",
        combustible: "Gasolina", color: "Gris Machine", carroceria: "Hatchback",
        imagen: "mazda-3-hatchback.jpg"
    },
    {
        id: 9, marca: "BMW", modelo: "X3", anio: 2019,
        precio: "210.000.000", estado: "Usado", kilometraje: "55.000",
        motor: "2.0L TwinPower Turbo", puertas: "5", traccion: "AWD",
        placaTerminada: "4", placaDe: "Bogotá", transmision: "Automática 8 vel",
        combustible: "Gasolina", color: "Blanco Alpino", carroceria: "SUV",
        imagen: "bmw-x3.jpg"
    },
    {
        id: 10, marca: "Audi", modelo: "A4", anio: 2021,
        precio: "160.000.000", estado: "Usado", kilometraje: "60.000",
        motor: "2.0L TFSI MHEV", puertas: "4", traccion: "FWD",
        placaTerminada: "7", placaDe: "Pereira", transmision: "S tronic 7 vel",
        combustible: "Gasolina/MHEV", color: "Gris Manhattan", carroceria: "Sedán",
        imagen: "audi-a4.jpg"
    }
];

// Variables de Estado
let currentFiltroEstado = "Todos";
let currentFiltroMarca = "Todas";

// Elementos del DOM
const carGrid = document.getElementById('car-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const brandSelect = document.getElementById('brand-select');
const modal = document.getElementById('car-modal');
const closeModalBtn = document.getElementById('close-modal');

// Función para renderizar el catálogo con imágenes
function renderCars() {
    carGrid.innerHTML = ''; // Limpiar grid

    const filtrados = carData.filter(car => {
        const pasaEstado = currentFiltroEstado === "Todos" || car.estado === currentFiltroEstado;
        const pasaMarca = currentFiltroMarca === "Todas" || car.marca === currentFiltroMarca;
        return pasaEstado && pasaMarca;
    });

    if(filtrados.length === 0) {
        carGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No se encontraron vehículos con estos filtros.</p>';
        return;
    }

    filtrados.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div class="car-img-container" onclick="openModal(${car.id})">
                <img src="${car.imagen}" alt="${car.modelo}" class="car-thumbnail" onerror="this.src='https://via.placeholder.com/400x250/222222/ffffff?text=Falta+Imagen'">
            </div>
            <div class="car-info">
                <h3>${car.marca} ${car.modelo}</h3>
                <div class="price">$ ${car.precio}</div>
                <div class="brief-spec">${car.estado} • ${car.kilometraje} km</div>
                <button class="btn-detalles" onclick="openModal(${car.id})">VER DETALLES</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Eventos de Filtros de Estado
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFiltroEstado = e.target.getAttribute('data-estado');
        renderCars();
    });
});

// Evento de Filtro de Marca
brandSelect.addEventListener('change', (e) => {
    currentFiltroMarca = e.target.value;
    renderCars();
});

// Función para abrir el Modal y poblar datos e imágenes
window.openModal = function(id) {
    const car = carData.find(c => c.id === id);
    if(!car) return;

    document.getElementById('modal-title').textContent = `${car.marca} ${car.modelo} ${car.anio}`;
    document.getElementById('modal-price').textContent = `$ ${car.precio}`;
    
    // Inyectar la imagen grande en el modal
    document.getElementById('modal-image').innerHTML = `<img src="${car.imagen}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/800x600/222222/ffffff?text=Falta+Imagen'">`;

    // Poblar cuadrícula de especificaciones
    const specsHTML = `
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-gauge-high"></i></div><div class="spec-text"><span class="spec-label">Kilometraje</span><span class="spec-val">${car.kilometraje}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-car-battery"></i></div><div class="spec-text"><span class="spec-label">Motor</span><span class="spec-val">${car.motor}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-door-closed"></i></div><div class="spec-text"><span class="spec-label">Puertas</span><span class="spec-val">${car.puertas}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-gears"></i></div><div class="spec-text"><span class="spec-label">Tracción</span><span class="spec-val">${car.traccion}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-car-rear"></i></div><div class="spec-text"><span class="spec-label">Placa terminada en</span><span class="spec-val">${car.placaTerminada}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-regular fa-id-card"></i></div><div class="spec-text"><span class="spec-label">Placa de</span><span class="spec-val">${car.placaDe}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-car-side"></i></div><div class="spec-text"><span class="spec-label">Modelo</span><span class="spec-val">${car.modelo}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-regular fa-calendar"></i></div><div class="spec-text"><span class="spec-label">Año</span><span class="spec-val">${car.anio}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-gear"></i></div><div class="spec-text"><span class="spec-label">Transmisión</span><span class="spec-val">${car.transmision}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-gas-pump"></i></div><div class="spec-text"><span class="spec-label">Tipo de combustible</span><span class="spec-val">${car.combustible}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-palette"></i></div><div class="spec-text"><span class="spec-label">Color</span><span class="spec-val">${car.color}</span></div></div>
        <div class="spec-item"><div class="spec-icon"><i class="fa-solid fa-car"></i></div><div class="spec-text"><span class="spec-label">Tipo de carrocería</span><span class="spec-val">${car.carroceria}</span></div></div>
    `;
    
    document.getElementById('modal-specs').innerHTML = specsHTML;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 
}

// Cerrar modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
});

// Inicializar
renderCars();