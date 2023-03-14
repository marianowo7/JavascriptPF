let carrito = [];

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

function checkLocalStorage() {
  if (localStorage.length > 0) {
    carrito = JSON.parse(localStorage.getItem("Producto de carrito"));
  }
}

function guardarEnLocalStorage() {
  let storedCarrito = [];
  if (localStorage.getItem("Producto de carrito")) {
    storedCarrito = JSON.parse(localStorage.getItem("Producto de carrito"));
  }
  const updatedCarrito = [...storedCarrito, ...carrito];
  const enJSON = JSON.stringify(updatedCarrito);
  localStorage.setItem("Producto de carrito", enJSON);
}

const addButtons = document.querySelectorAll(".buy_but");
addButtons.forEach((addButton) => {
  addButton.addEventListener("click", () => {
    const card = addButton.closest(".producto_card");
    const name = card.querySelector(".nombre_producto").innerText;
    const price = card.querySelector(".precio_producto").innerText;
    const product = new Product(name, price);
    carrito.push(product);
    console.log(carrito);
    localStorage.clear();
    guardarEnLocalStorage();
    Toastify({
      text: "Producto añadido al Carrito!",
      backgroundColor: "green",
      gravity: "bottom",
      duration: 1300,
    }).showToast();
  });
});

checkLocalStorage();
