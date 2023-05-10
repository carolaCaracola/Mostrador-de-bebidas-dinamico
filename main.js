const items = document.querySelectorAll('.wine, .appleJuice, .kombucha, .cocaCola, .fanta, .nestea, .beer, .milk, .water');

items.forEach(item => {
  item.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', item.id);
    event.dataTransfer.effectAllowed = 'copy';
  });
});

const basket = document.querySelector('.basket');
let totalAmount = 0;
const cartItems = [];

basket.addEventListener('dragover', event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});

basket.addEventListener('drop', event => {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text/plain');

  // Obtener el precio y nombre del elemento
  const item = document.getElementById(itemId);
  const price = parseFloat(item.dataset.price);
  const name = item.alt;

  // Actualizar el precio total de la compra
  totalAmount += price;

  // Actualizar el elemento HTML con el nuevo precio total
  const amountBasket = document.getElementById('amountBasket');
  amountBasket.textContent = totalAmount.toFixed(2);

  // Agregar el elemento al carrito
  cartItems.push({ id: itemId, name: name, price: price });

  // Mostrar los elementos en la lista del carrito
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = '';
  cartItems.forEach(cartItem => {
    const li = document.createElement('li');
    li.textContent = `${cartItem.name} - €${cartItem.price.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', () => {
      removeCartItem(cartItem.id);
    });
    li.appendChild(removeButton);
    cartList.appendChild(li);
  });
});

function removeCartItem(itemId) {
  // Buscar el elemento en el carrito
  const cartItem = cartItems.find(item => item.id === itemId);

  if (cartItem) {
    // Obtener el precio del elemento a eliminar
    const price = cartItem.price;

    // Restar el precio del elemento eliminado al total de la compra
    totalAmount -= price;

    // Actualizar el elemento HTML con el nuevo precio total
    const amountBasket = document.getElementById('amountBasket');
    amountBasket.textContent = totalAmount.toFixed(2);

    // Eliminar el elemento del carrito
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    cartItems.splice(itemIndex, 1);

    // Eliminar el elemento de la lista del carrito
    const cartList = document.getElementById('cartItems');
    cartList.removeChild(cartList.childNodes[itemIndex]);
  }
}