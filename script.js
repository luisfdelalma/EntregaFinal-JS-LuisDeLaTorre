fetch("./productos.json")
    .then(response => response.json())
    .then(productos => {

let columnaTienda = document.getElementById("columnaProductos")
let filtrosSeccion = document.getElementById("filtroSeccion")
renderTiendaTodo(productos)

let botonTodo = document.getElementById("filtroPrincipalTodo")
botonTodo.addEventListener("click", tiendaFiltradaTodo)
let botonMoto = document.getElementById("filtroPrincipalMotos")
botonMoto.addEventListener("click", tiendaFiltradaMotos)
let botonAccesorio = document.getElementById("filtroPrincipalAccesorios")
botonAccesorio.addEventListener("click", tiendaFiltradaAccesorios)

let carrito = []
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
rendCarrito(carrito)

function tiendaFiltradaTodo(e) {
    let productosTodos = productos
    renderTiendaTodo(productosTodos)
}

function renderTiendaTodo(array) {
    filtrosSeccion.innerHTML = ""
        columnaTienda.innerHTML =""
    for (const acce of array) {
        let tarjetaAcce = document.createElement("div")
        tarjetaAcce.className = "cardAcce"
        tarjetaAcce.id = acce.referencia
        tarjetaAcce.innerHTML =
        `<h4>${acce.tipo}</h4>
        <img src=${acce.imgurl} alt=${acce.referencia}>
        <p>${acce.categoria} ${acce.marca}</p> 
        <p>${acce.referencia}</p>
        <button class="botonAcce" id="${acce.referencia}">Añadir al carrito</button>
        `
        columnaTienda.appendChild(tarjetaAcce)
    }
    let botonAcce = document.getElementsByClassName("botonAcce")
    for (const boton of botonAcce) {
        boton.addEventListener("click", addCarritoAcce)
    }
}
function tiendaFiltradaMotos(e) {
    let productosFiltradosMotos = productos.filter(producto =>
        producto.tipo.includes(botonMoto.value)
        )
    renderTiendaFiltradaMotos(productosFiltradosMotos)
}
function renderTiendaFiltradaMotos(arrayMoto) {
    filtrosSeccion.innerHTML = ""
    let filtrosMotos=document.createElement("div")
        filtrosMotos.className="filtros"
        filtrosMotos.innerHTML=
        `
        <div class="checkFiltro">
        <input class="filtroCheckMarca" type="checkbox" id="marcaMotos1" name="filtroCheckMarca" value="Yamaha">
        <label for="Yamaha">Yamaha</label>
        <input class="filtroCheckMarca" type="checkbox" id="marcaMotos2" name="filtroCheckMarca" value="Honda">
        <label for="Honda">Honda</label>
        <input class="filtroCheckMarca" type="checkbox" id="marcaMotos3" name="filtroCheckMarca" value="Suzuki">
        <label for="Suzuki">Suzuki</label>
        </div>
        `
        filtrosSeccion.appendChild(filtrosMotos)

        renderizarTiendaMotosFiltrada(arrayMoto)
        let filtroMarcasCheck = document.getElementsByClassName("filtroCheckMarca")

        for (let i = 0; i < filtroMarcasCheck.length; i++) {
    filtroMarcasCheck[i].addEventListener("change", filtrarTiendaMoto)    
        }

        function filtrarTiendaMoto(e){
            let marcasFiltradas = Array.from(filtroMarcasCheck).filter(input=>input.checked).map(input=>input.value)
            let tiendaFiltradaMarcasCheckbox =
            arrayMoto.filter(producto =>
                producto.marca.includes(marcasFiltradas.find(le=>le===producto.marca))
                )
            if (tiendaFiltradaMarcasCheckbox.length===0) {
                renderizarTiendaMotosFiltrada(arrayMoto)
            } else {
                renderizarTiendaMotosFiltrada(tiendaFiltradaMarcasCheckbox)
            }
        }

    function renderizarTiendaMotosFiltrada(arrayMoto){
        columnaTienda.innerHTML =""
    for (const acce of arrayMoto) {
        let tarjetaAcce = document.createElement("div")
        tarjetaAcce.className = "cardAcce"
        tarjetaAcce.id = acce.referencia
        tarjetaAcce.innerHTML =
        `<h4>${acce.tipo}</h4>
        <img src=${acce.imgurl} alt=${acce.referencia}>
        <p>${acce.categoria} ${acce.marca}</p> 
        <p>${acce.referencia}</p>
        <p>Cilindraje: ${acce.cilindraje} cc</p>
        <p>Sistema ABS: ${acce.sisAbs}</p>
        <p>Potencia: ${acce.potencia} HP</p>
        <p>Torque: ${acce.torque} Nm</p>
        <p>Precio: $${acce.precio}</p>
        <button class="botonAcce" id="${acce.referencia}">Añadir al carrito</button>
        `
        columnaTienda.appendChild(tarjetaAcce)
    }
    let botonAcce = document.getElementsByClassName("botonAcce")
    for (const boton of botonAcce) {
        boton.addEventListener("click", addCarritoAcce)
    }
}
}
function tiendaFiltradaAccesorios(e) {
    let productosFiltradosAccesorios = productos.filter(producto =>
        producto.tipo.includes(botonAccesorio.value)
        )
    renderTiendaFiltradaAccesorios(productosFiltradosAccesorios)
}
function renderTiendaFiltradaAccesorios(arrayAcce) {
    filtrosSeccion.innerHTML = ""
    let filtrosAcce=document.createElement("div")
        filtrosAcce.className="filtros"
        filtrosAcce.innerHTML=
        `
        <div class="checkFiltro">
        <input class="filtroCheckMarca" type="checkbox" id="catAcce1" name="filtroCheckAcce1" value="Casco">
        <label for="catAcce1">Cascos</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce2" name="filtroCheckAcce2" value="Vestuario">
        <label for="catAcce2">Vestuario</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce3" name="filtroCheckAcce3" value="Guantes">
        <label for="catAcce3">Guantes</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce4" name="filtroCheckAcce4" value="Maleta/Baúl">
        <label for="catAcce4">Maletas/Baules</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce5" name="filtroCheckAcce5" value="Intercomunicador">
        <label for="catAcce5">Intercomunicadores</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce6" name="filtroCheckAcce6" value="Soportes">
        <label for="catAcce6">Soportes</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce7" name="filtroCheckAcce7" value="Seguridad">
        <label for="catAcce7">Seguridad</label>
        <input class="filtroCheckMarca" type="checkbox" id="catAcce8" name="filtroCheckAcce8" value="Gafas">
        <label for="catAcce8">Gafas</label>
        </div>
        `
        filtrosSeccion.appendChild(filtrosAcce)

        renderizarTiendaAcceFiltrada(arrayAcce)
        let filtroCategoriaCheck = document.getElementsByClassName("filtroCheckMarca")

        for (let i = 0; i < filtroCategoriaCheck.length; i++) {
    filtroCategoriaCheck[i].addEventListener("change", filtrarTiendaAcce)    
        }

        function filtrarTiendaAcce(e){
            let categoriasFiltradas = Array.from(filtroCategoriaCheck).filter(input=>input.checked).map(input=>input.value)
            let tiendaFiltradaMarcasCheckbox =
            arrayAcce.filter(producto =>
                producto.categoria.includes(categoriasFiltradas.find(le=>le===producto.categoria))
                )
            if (tiendaFiltradaMarcasCheckbox.length===0) {
                renderizarTiendaAcceFiltrada(arrayAcce)
            } else {
                renderizarTiendaAcceFiltrada(tiendaFiltradaMarcasCheckbox)
            }
        }

    function renderizarTiendaAcceFiltrada(arrayMoto){
        columnaTienda.innerHTML =""
    for (const acce of arrayMoto) {
        let tarjetaAcce = document.createElement("div")
        tarjetaAcce.className = "cardAcce"
        tarjetaAcce.id = acce.referencia
        tarjetaAcce.innerHTML =
        `<h4>${acce.tipo}</h4>
        <img src=${acce.imgurl} alt=${acce.referencia}>
        <p>${acce.categoria} ${acce.marca}</p> 
        <p>${acce.referencia}</p>
        <p>Precio: $${acce.precio}</p>
        <button class="botonAcce" id="${acce.referencia}">Añadir al carrito</button>
        `
        columnaTienda.appendChild(tarjetaAcce)
    }
    let botonAcce = document.getElementsByClassName("botonAcce")
    for (const boton of botonAcce) {
        boton.addEventListener("click", addCarritoAcce)
    }
}
}

function addCarritoAcce(e) {
    Toastify({
        text: "Producto agregado al carrito con éxito",
        className: "toast",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
        }).showToast()
    console.log(e.target.id)
    let prodBuscado = productos.find(producto => producto.referencia == e.target.id)
    let posProdBuscado = carrito.findIndex(producto => producto.referencia === prodBuscado.referencia)
    if (posProdBuscado != -1) {
        carrito[posProdBuscado].unidades++
        carrito[posProdBuscado].subtotal = carrito[posProdBuscado].unidades * carrito[posProdBuscado].precioUnitario
    } else {
        carrito.push({
            referencia: prodBuscado.referencia,
            nombre: prodBuscado.marca + " " + prodBuscado.referencia,
            precioUnitario: prodBuscado.precio,
            unidades: 1,
            subtotal: prodBuscado.precio
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    rendCarrito(carrito)
}
function rendCarrito(arrayDeProductos) {
    columnaCarrito.innerHTML = ""
    for (const producto of arrayDeProductos) {
        columnaCarrito.innerHTML += `
        <div class="elementoCarrito">
        <p><b>Producto:</b> ${producto.nombre}</p>
        <p><b>Precio unitario:</b> $${producto.precioUnitario}</p>
        <p><b>Cantidad:</b> ${producto.unidades}</p>
        <p><b>Subtotal:</b> $${(producto.subtotal).toFixed(2)}</p>
        <hr>
        </div>
        `
    }
    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    if (total > 0) {
        columnaCarrito.innerHTML += `
        <h3>TOTAL: $${total.toFixed(2)}</h3>
        `
    }
}
let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", vaciarCarrito)
function vaciarCarrito(e) {
    console.log("Compra realizada")
    swal({
        title: "Compra realizada con éxito!",
        text: "Gracias por confiar en TodoMotos para realizar sus compras!",
        icon: "success",
        button: "Seguir",
        })
    localStorage.removeItem("carrito")
    carrito = []
    rendCarrito(carrito)
}
    })