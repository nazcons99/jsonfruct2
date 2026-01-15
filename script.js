//данные фруктов

const fruits = [
  {
    "name": "виноград",
    "image": "img/vinograd.jpg",
    "description": "Витамины: A, C, клетчатка<br>Польза: пищеварение, иммунитет"
  },
  {
  "name": "гранат",
  "image": "img/granat2.jpg",
  "description": "Витамины: калий, магний<br>Польза: энергия, настроение"
  },
  {
  "name": "вишня",
  "image": "img/vishenka.jpg",
  "description": "Витамины: C, A<br>Польза: восстановление, вкус"
  },

  {
    "name": "яблоко",
    "image": "img/apple.jpg",
    "description": "Витамины: C, K, клетчатка<br>Польза: сердце, пищеварение"
  },

  {
    "name": "кокос",
    "image": "img/coconut.jpg",
    "description": "Витамины: C, E, группы B<br>Польза: энергия, сердце, пищеварение"
  },
  {
    "name": "киви",
    "image": "img/civi.png",
    "description": "Витамины: C, K, E<br>Польза: иммунитет, пищеварение, кожа"
  },

  {
    "name": "персик",
    "image": "img/persik.jpg",
    "description": "Витамины: A, C, E<br>Польза: зрение, кожа"
  },
  {
    "name": "мандарин",
    "image": "img/mandarin.jpg",
    "description": "Витамины: C, A, B1<br>Польза: иммунитет, зрение"
  },
];

const input = document.getElementById('search');
const button = document.getElementById('foundb');
// Render fruits from the `fruits` array into the .fruct-container
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
      

    desc.appendChild(h3);
    desc.appendChild(p);
    box.appendChild(img);
    box.appendChild(desc);
    container.appendChild(box);
  });
}

function getBoxes() { return document.querySelectorAll('.fructbox');
}
 


function filterFruits() {
 
  let q = (input.value || '').trim().toLowerCase();

  // If query is empty, show all fruits
  if (!q) {
    getBoxes().forEach(b => b.style.display = '');
    return;
  }
  

  // Otherwise show only matching fruits (search in name, description, img alt)
  getBoxes().forEach(b => {
    const name = (b.querySelector('.fruit-name')?.textContent || '').toLowerCase();
    const desc = (b.querySelector('.fruit-description')?.textContent || '').toLowerCase();
    const alt = (b.querySelector('img')?.alt || '').toLowerCase();
    const match = name.includes(q) || desc.includes(q) || alt.includes(q);
    b.style.display = match ? '' : 'none';
  });
}

// initial render
renderFruits();

button.addEventListener('click', filterFruits);
input.addEventListener('keyup', (e) => { if (e.key === 'Enter') filterFruits(); });
input.addEventListener('input', () => { if (!input.value.trim()) getBoxes().forEach(b => b.style.display = ''); });