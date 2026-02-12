// Данные фруктов
let fruits = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Элементы DOM
const basketpage = document.getElementById("basketpage");
const basketitem = document.getElementById("basketitem");
const cartBtn = document.getElementById("cartBtn");
const closeBtn = document.getElementById("closeCart");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("foundb");
const quantitySpan = document.querySelector(".quantity");

// Загрузка фруктов из JSON
async function loadFruits() {
  try {
    const res = await fetch('./fructscontainer.json');
    fruits = await res.json();
    renderFruits();
    updateCartQuantity();
  } catch (e) {
    console.error('Ошибка загрузки JSON:', e);
  }
}

// Отрисовка карточек фруктов
function renderFruits() {
  const container = document.querySelector('.fruct-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  fruits.forEach(f => {
    const box = document.createElement('div');
    box.className = 'fructbox';

    const img = document.createElement('img');
    img.src = f.image;
    img.alt = f.name;

    const desc = document.createElement('div');
    desc.className = 'fruit-description';

    const h3 = document.createElement('h3');
    h3.className = 'fruit-name';
    h3.textContent = f.name;

    const p = document.createElement('p');
    p.innerHTML = f.description;

    const price = document.createElement('span');
    price.className = 'fruit-price';
    price.textContent = f.price;

    const btn = document.createElement("button");
    btn.className = "addCartBtn";
    btn.textContent = f.korzin;
    btn.onclick = () => addToCart(f);

    desc.appendChild(h3);
    desc.appendChild(p);
    desc.appendChild(price);
    desc.appendChild(btn);
    
    box.appendChild(img);
    box.appendChild(desc);
    container.appendChild(box);
  });
}

// Получение всех карточек
function getBoxes() {
  return document.querySelectorAll('.fructbox');
}

// Фильтрация фруктов по поиску
function filterFruits() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    getBoxes().forEach(box => box.style.display = '');
    return;
  }

  getBoxes().forEach(box => {
    const name = box.querySelector('.fruit-name')?.textContent.toLowerCase() || '';
    const description = box.querySelector('.fruit-description p')?.textContent.toLowerCase() || '';
    const alt = box.querySelector('img')?.alt.toLowerCase() || '';
    const price = box.querySelector('.fruit-price')?.textContent.toLowerCase() || '';
    
    const match = name.includes(query) || description.includes(query) || alt.includes(query) || price.includes(query);
    box.style.display = match ? '' : 'none';
  });
}

// Обработчики поиска
searchButton.addEventListener('click', filterFruits);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') filterFruits();
});
searchInput.addEventListener('input', () => {
  if (!searchInput.value.trim()) {
    getBoxes().forEach(box => box.style.display = '');
  }
});

// Открыть корзину
function openCart() {
  if (basketpage) {
    basketpage.classList.add('active');
    renderCart();
  }
}

// Закрыть корзину
function closeCart() {
  if (basketpage) {
    basketpage.classList.remove('active');
  }
}

// Добавить в корзину
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartQuantity();
  renderCart();
}

// Обновить счетчик товаров
function updateCartQuantity() {
  if (quantitySpan) {
    quantitySpan.textContent = cart.length;
  }
}

// Отрисовка корзины
function renderCart() {
  if (!basketitem) return;
  
  basketitem.innerHTML = '';
  
  if (cart.length === 0) {
    basketitem.innerHTML = '<p>Корзина пуста</p>';
    return;
  }
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${item.name} - ${item.price}</span>
      <button class="remove-btn" data-index="${index}">✕</button>
    `;
    basketitem.appendChild(cartItem);
  });

  // Удаление товара из корзины
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartQuantity();
      renderCart();
    });
  });
}

// Закрытие корзины по клику вне окна
window.addEventListener('click', (e) => {
  if (basketpage && e.target === basketpage) {
    closeCart();
  }
});

// Инициализация событий
if (cartBtn) cartBtn.addEventListener('click', openCart);
if (closeBtn) closeBtn.addEventListener('click', closeCart);

// Запуск
loadFruits();