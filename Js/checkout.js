let carrito = [];

function checkLocalStorage() {
  if (localStorage.length > 0) {
    carrito = JSON.parse(localStorage.getItem("Producto de carrito"));
    renderizarProductos();
  }
}

function guardarEnLocalStorage() {
  const enJSON = JSON.stringify(carrito);
  localStorage.setItem("Producto de carrito", enJSON);
}

function renderizarProductos() {
  const container = document.querySelector(".productos_checkout");
  container.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    const coso = carrito[i];

    const nombre = document.createElement("td");
    nombre.innerHTML = coso.name;

    const precio = document.createElement("td");
    precio.innerHTML = (parseInt(coso.price) * 1.21).toFixed(2) + "$ USD";

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.addEventListener("click", () => {
      carrito.splice(i, 1);
      guardarEnLocalStorage();
      renderizarProductos();
      calcularValorFinaldeProductos();
      renderizarPrecio();
    });

    const tr = document.createElement("tr");
    tr.appendChild(nombre);
    tr.appendChild(precio);
    tr.appendChild(eliminar);

    container.appendChild(tr);
  }
}

function calcularValorFinaldeProductos() {
  let sumaTotal = 0;
  const precioTotal = document.getElementsByClassName("preciototal");
  carrito.forEach(function (producto) {
    sumaTotal += 1.21 * parseInt(producto.price);
  });
  return (precioTotal.innerHTML = "Total a pagar: $" + sumaTotal + "USD");
}
function renderizarPrecio() {
  const renderizarPrecio = document.querySelector(".Total_a_pagar");
  renderizarPrecio.innerHTML = "";

  const precioTotaldeProductos = document.createElement("h3");
  precioTotaldeProductos.innerHTML = calcularValorFinaldeProductos();
  renderizarPrecio.appendChild(precioTotaldeProductos);
}

const id = document.getElementsByClassName("sponsor")[0];
const cargandotxt = document.createElement("p");
cargandotxt.innerText = "Cargando sponsors...";
id.appendChild(cargandotxt);

fetch("../api/api.json")
  .then((response) => response.json())
  .then((data) => {
    setTimeout(() => {
      id.removeChild(cargandotxt);
      data.sponsors.forEach((sponsor) => {
        const image = document.createElement("img");
        image.setAttribute("id", "img-sponsor");
        image.src = sponsor.src;
        image.style.width = "70px";
        image.style.height = "70px";
        id.appendChild(image);
      });
    }, 1700);
  });

checkLocalStorage();
renderizarProductos();
renderizarPrecio();
