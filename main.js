let totalAmount = 0;
const items = document.querySelectorAll('.wine, .appleJuice, .kombucha, .cocaCola, .fanta, .nestea, .beer');

items.forEach(item => {
  item.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', item.id);
    event.dataTransfer.effectAllowed = 'move';
  });
});
const basket = document.querySelector('.basket');

basket.addEventListener('dragover', event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
});

basket.addEventListener('drop', event => {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text/plain');
  const item = document.getElementById(itemId);
  basket.appendChild(item);
  
  // Actualiza el precio total de la compra
  totalAmount += 1; // por ejemplo, se puede sumar 1€ por cada elemento añadido a la cesta
  const amountBasket = document.getElementById('amountBasket');
  amountBasket.textContent = totalAmount.toFixed(2); // muestra el precio con dos decimales
});
