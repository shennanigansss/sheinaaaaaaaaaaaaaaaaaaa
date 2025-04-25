const cartItems = document.querySelectorAll('.cart-item');
const orderList = document.getElementById('order-list');
const totalDisplay = document.getElementById('total');

const order = {};

cartItems.forEach(item => {
  const plusBtn = item.querySelector('.plus');
  const minusBtn = item.querySelector('.minus');
  const quantityDisplay = item.querySelector('.quantity');
  const name = item.dataset.name;
  const price = parseInt(item.dataset.price);

  plusBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent);
    quantity++;
    quantityDisplay.textContent = quantity;
    order[name] = (order[name] || 0) + 1;
    updateOrder();
  });

  minusBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 0) {
      quantity--;
      quantityDisplay.textContent = quantity;
      order[name] = order[name] - 1;
      if (order[name] <= 0) delete order[name];
      updateOrder();
    }
  });
});

function updateOrder() {
  orderList.innerHTML = '';
  let total = 0;
  for (const item in order) {
    const quantity = order[item];
    const price = 20; // fixed price per item
    const li = document.createElement('li');
    li.textContent = `${item} x${quantity} - $${quantity * price}`;
    orderList.appendChild(li);
    total += quantity * price;
  }
  totalDisplay.textContent = total;
}

function checkout() {
  if (Object.keys(order).length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Order placed successfully!');
  }
}
