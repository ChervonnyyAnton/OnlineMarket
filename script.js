(function() {
  const ITEM_DATA = [
      {name: 'A bottle of water', price: 30},
      {name: 'A chicken sandwich', price: 50},
      {name: 'A chocolate bar', price: 17},
      {name: 'An energy drink', price: 41},
      {name: 'Greek salad', price: 82}
  ];

  let cart = {};

  const resetButton = document.querySelector('#reset');
  const itemContainer = document.querySelector('#items');
  const totalElement = document.querySelector('#total');
  const deliveryOptionElement = document.querySelector('#deliveryOption');
  const addressElement = document.querySelector('#address');
  const orderButton = document.querySelector('#order');
  const ordersListElement = document.querySelector('#ordersList');

  function initialize() {
      ITEM_DATA.forEach(itemData => {
          itemContainer.appendChild(createItemElement(itemData));
      });

      resetButton.addEventListener('click', resetApp);
      deliveryOptionElement.addEventListener('change', handleDeliveryOptionChange);
      orderButton.addEventListener('click', handleOrderClick);

      updatePastOrders();
  }

  function createItemElement(itemData) {
      const container = document.createElement('div');
      container.className = 'item';

      const description = document.createElement('span');
      description.textContent = `${itemData.name} - ¥${itemData.price}`;
      container.appendChild(description);

      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = '0';
      quantityInput.max = '999';
      quantityInput.addEventListener('input', event => {
          cart[itemData.name] = Number(event.target.value);
          updateTotal();
      });
      container.appendChild(quantityInput);

      return container;
  }

  function updateTotal() {
      const total = Object.keys(cart).reduce((sum, itemName) => {
          const itemData = ITEM_DATA.find(data => data.name === itemName);
          return sum + itemData.price * cart[itemName];
      }, 0);

      totalElement.textContent = `Total: ¥${total}`;

      orderButton.disabled = !total || !deliveryOptionElement.value || (deliveryOptionElement.value === 'delivery' && !addressElement.value);
  }

  function handleDeliveryOptionChange() {
      if (deliveryOptionElement.value === 'delivery') {
          addressElement.style.display = 'block';
      } else {
          addressElement.style.display = 'none';
      }
      updateTotal();
  }

  function handleOrderClick() {
      if(deliveryOptionElement.value === 'pickup' && getTotalCost() > 500) {
          offerFreeDelivery();
      } else {
          placeOrder();
      }
  }

  function offerFreeDelivery() {
      if (confirm('Would you like to have your order delivered for free?')) {
          deliveryOptionElement.value = 'delivery';
          addressElement.style.display = 'block';
      }
  }

  function placeOrder() {
      const order = {
          items: {...cart},
          total: totalElement.textContent,
          type: deliveryOptionElement.value,
          address: deliveryOptionElement.value === 'delivery' ? addressElement.value : null,
          date: new Date().toISOString()
      };
      saveOrder(order);

      alert('Order completed');

      // Reset cart and UI
      cart = {};
      itemContainer.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
      deliveryOptionElement.value = '';
      addressElement.value = '';
      addressElement.style.display = 'none';
      updateTotal();
      updatePastOrders();
  }

  function getTotalCost() {
      return Object.keys(cart).reduce((sum, itemName) => {
          const itemData = ITEM_DATA.find(data => data.name === itemName);
          return sum + itemData.price * cart[itemName];
      }, 0);
  }

  function saveOrder(order) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
  }

  function updatePastOrders() {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      ordersListElement.innerHTML = '';
      orders.forEach((order, index) => {
          const orderElement = document.createElement('li');
          orderElement.textContent = `Order #${index + 1}: ${order.total} (Type: ${order.type}${order.address ? `, Address: ${order.address}` : ''})`;
          ordersListElement.appendChild(orderElement);
      });
  }

  function resetApp() {
      localStorage.clear();
      updatePastOrders();
      window.location.reload();
  }

  initialize();
})();
