



// ver 2
document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".container-cart-icon");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const closeCart = document.querySelector(".close-cart");

    // Mostrar el sidebar al hacer clic en el icono del carrito
    cartIcon.addEventListener("click", function() {
        cartSidebar.classList.toggle("open"); // Alternar la clase 'open' para mostrar u ocultar el sidebar
    });

    // Ocultar el sidebar al hacer clic en el botón de cerrar
    closeCart.addEventListener("click", function() {
        cartSidebar.classList.remove("open"); // Quitar la clase 'open' para ocultar el sidebar
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const cartButtons = document.querySelectorAll(".btn-add-cart"); // Seleccionar todos los botones de "Comprar"
    const cartItems = document.getElementById("cart-items"); // Elemento que contiene los elementos del carrito
    const buyButton = document.getElementById("buy-button"); // Botón para comprar
    const clearButton = document.getElementById("clear-button"); // Botón para borrar todos los elementos del carrito
    const totalPriceDisplay = document.getElementById("total-price"); // Elemento para mostrar el precio total

    let totalPrice = 0; // Variable para almacenar el precio total

    // Recorrer cada botón y agregar un event listener para el clic
    cartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const product = {
                name: button.parentElement.querySelector("h3").textContent.trim(),
                price: parseFloat(button.parentElement.querySelector("h4").textContent.trim().replace("$", "")), // Convertir el precio a un número
            };

            addToCart(product); // Llamar a la función para agregar el producto al carrito
            updateTotalPrice(); // Actualizar el precio total
        });
    });

    // Agregar evento clic a los elementos del carrito para poder eliminarlos
    cartItems.addEventListener("click", function(event) {
        if (event.target && event.target.nodeName === "LI") {
            const priceString = event.target.textContent.trim().split(" - ")[1]; // Obtener el precio del elemento
            const price = parseFloat(priceString.replace("$", "")); // Convertir el precio a un número
            totalPrice -= price; // Restar el precio del producto eliminado al precio total
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Actualizar el precio total mostrado
            event.target.remove(); // Eliminar el elemento del carrito al hacer clic en él
        }
    });

    // Agregar evento clic al botón "Comprar" para comprar los elementos del carrito
    buyButton.addEventListener("click", function() {
        alert("¡Gracias por tu compra!"); // Esta función podría ser reemplazada por una funcionalidad para procesar el pago
    });

    // Agregar evento clic al botón "Borrar" para eliminar todos los elementos del carrito
    clearButton.addEventListener("click", function() {
        cartItems.innerHTML = ""; // Borrar todos los elementos del carrito
        totalPrice = 0; // Reiniciar el precio total
        totalPriceDisplay.textContent = "$0.00"; // Actualizar el precio total mostrado
    });

    function addToCart(product) {
        // Crear un nuevo elemento de lista para el producto
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;

        // Crear un elemento de botón "X" para eliminar el producto del carrito
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");

        // Agregar evento clic al botón "X" para eliminar el producto del carrito
        deleteButton.addEventListener("click", function() {
            // Obtener el precio del producto eliminado
            const priceString = listItem.textContent.trim().split(" - ")[1];
            const price = parseFloat(priceString.replace("$", ""));
            totalPrice -= price; // Restar el precio del producto eliminado al precio total
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Actualizar el precio total mostrado
            listItem.remove(); // Eliminar el producto del carrito al hacer clic en "X"
        });

        listItem.appendChild(deleteButton); // Agregar el botón "X" al elemento de la lista
        cartItems.appendChild(listItem); // Agregar el elemento de la lista al carrito
    }

    // Función para actualizar el precio total
    function updateTotalPrice() {
        totalPrice = 0; // Reiniciar el precio total
        // Recorrer cada elemento del carrito y sumar los precios
        cartItems.querySelectorAll("li").forEach(function(item) {
            const priceString = item.textContent.trim().split(" - ")[1];
            const price = parseFloat(priceString.replace("$", ""));
            totalPrice += price; // Sumar el precio al total
        });
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Actualizar el precio total mostrado
    }
});
