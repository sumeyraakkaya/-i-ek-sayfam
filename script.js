// --- 1. 21 ÇIÇEK VE KENDİNE ÖZEL DEV GÖRSEL EMOJİLERİ ---
const initialFlowers = [
    { id: 1, name: "Orkide", meaning: "Zarafet, şıklık ve asil bir gurur.", price: 250, emoji: "🔮" },
    { id: 2, name: "Papatya", meaning: "Temiz sevgi, bolluk ve masumiyet.", price: 80, emoji: "🌼" },
    { id: 3, name: "Lilyum", meaning: "Güven, saflık ve doğurganlık.", price: 180, emoji: "⚜️" },
    { id: 4, name: "Şakayık", meaning: "Zenginlik, şans ve mutlu evlilik.", price: 300, emoji: "💮" },
    { id: 5, name: "Gül", meaning: "Aşk, tutku ve derin sevgi.", price: 120, emoji: "🌹" },
    { id: 6, name: "Lale", meaning: "Asalet, zarafet ve kusursuz aşk.", price: 90, emoji: "🌷" },
    { id: 7, name: "Karanfil", meaning: "İçtenlik, sevgi ve adanmışlık.", price: 70, emoji: "🌺" },
    { id: 8, name: "Menekşe", meaning: "Alçakgönüllülük ve tam sadakat.", price: 60, emoji: "🍇" },
    { id: 9, name: "Sümbül", meaning: "Bağlılık, sonsuz sevgi ve neşe.", price: 110, emoji: "🧬" },
    { id: 10, name: "Nergis", meaning: "Yeniden doğuş ve yeni başlangıçlar.", price: 130, emoji: "💛" },
    { id: 11, name: "Ortanca", meaning: "İçten gelen duygular ve minnettarlık.", price: 220, emoji: "💐" },
    { id: 12, name: "Krizantem", meaning: "Sadakat, dürüstlük ve uzun ömür.", price: 85, emoji: "🌻" },
    { id: 13, name: "Yasemin", meaning: "Güzellik, çekicilik ve maneviyat.", price: 160, emoji: "🤍" },
    { id: 14, name: "Zambak", meaning: "Görkem, saflık ve analık duygusu.", price: 140, emoji: "🕊️" },
    { id: 15, name: "Lavanta", meaning: "Huzur, sakinlik ve derin bağlılık.", price: 95, emoji: "🪻" },
    { id: 16, name: "Fulya", meaning: "Beklenen sevgi ve arzunun karşılığı.", price: 100, emoji: "🌟" },
    { id: 17, name: "Gelincik", meaning: "Hayal gücü, teselli ve hüzün.", price: 75, emoji: "🎈" },
    { id: 18, name: "Açelya", meaning: "Zarafet ve aşka duyulan saygı.", price: 190, emoji: "🌸" },
    { id: 19, name: "Begonvil", meaning: "Tutku, canlılık ve hoş geldiniz.", price: 210, emoji: "💖" },
    { id: 20, name: "Kamelya", meaning: "Kusursuz güzellik ve hayranlık.", price: 240, emoji: "❤️" },
    { id: 21, name: "Sarı Kantaron", meaning: "Şifa, koruma ve parlak bir gelecek.", price: 115, emoji: "☀️" }
];

if (!localStorage.getItem('flowers')) {
    localStorage.setItem('flowers', JSON.stringify(initialFlowers));
}
let flowersData = JSON.parse(localStorage.getItem('flowers'));

// --- 2. SELECTORS ---
const flowerGrid = document.getElementById('flower-grid');
const flowerForm = document.getElementById('flower-form');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const loader = document.getElementById('loader');

// --- 3. API SIMULATION ---
async function fetchFlowers() {
    showLoader(true);
    try {
        await fetch('https://jsonplaceholder.typicode.com/todos/1');
        return flowersData;
    } catch (error) {
        return flowersData;
    } finally {
        showLoader(false);
    }
}

// --- 4. RENDERING & CRUD İŞLEMLERİ ---
async function renderFlowers(filterData = null) {
    const data = filterData || await fetchFlowers();
    flowerGrid.innerHTML = '';
    
    data.forEach(flower => {
        const flowerEmoji = flower.emoji || "🌸";
        const card = document.createElement('div');
        card.className = 'flower-card';
        card.innerHTML = `
            <div class="card-menu-container">
                <button class="three-dots-btn" onclick="toggleDropdown(event, ${flower.id})">⋮</button>
                <div class="dropdown-menu" id="dropdown-${flower.id}">
                    <button onclick="editFlower(${flower.id})">✏️ Düzenle</button>
                    <button class="delete-opt" onclick="deleteFlower(${flower.id})">🗑️ Sil</button>
                </div>
            </div>
            <div style="font-size: 80px; text-align: center; padding: 30px 0; background: rgba(0,0,0,0.02); border-bottom: 1px solid var(--border-color);">
                ${flowerEmoji}
            </div>
            <div class="flower-info">
                <div>
                    <h3>${flower.name}</h3>
                    <p class="meaning">"${flower.meaning}"</p>
                </div>
                <p class="price">${flower.price} TL</p>
            </div>
        `;
        flowerGrid.appendChild(card);
    });
}

// 3 Nokta Menüsünü Açıp Kapatma Fonksiyonu
function toggleDropdown(event, id) {
    event.stopPropagation();
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if(menu.id !== `dropdown-${id}`) menu.classList.remove('show');
    });
    const currentMenu = document.getElementById(`dropdown-${id}`);
    currentMenu.classList.toggle('show');
}

window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
});

// Ekleme / Güncelleme Formu
flowerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('flower-id').value;
    const name = document.getElementById('flower-name').value;
    const meaning = document.getElementById('flower-meaning').value;
    const price = Number(document.getElementById('flower-price').value);

    if (id) {
        flowersData = flowersData.map(f => f.id == id ? { ...f, name, meaning, price } : f);
        showToast("Çiçek başarıyla güncellendi! 📝");
    } else {
        const newFlower = { 
            id: Date.now(), name, meaning, price, emoji: "🌸"
        };
        flowersData.push(newFlower);
        showToast("Yeni çiçek kataloğa eklendi! 🌺");
    }

    localStorage.setItem('flowers', JSON.stringify(flowersData));
    resetForm();
    renderFlowers();
});

function deleteFlower(id) {
    if (confirm("Bu çiçeği silmek istediğinize emin misiniz?")) {
        flowersData = flowersData.filter(f => f.id !== id);
        localStorage.setItem('flowers', JSON.stringify(flowersData));
        showToast("Çiçek katalogdan kaldırıldı! 🗑️");
        renderFlowers();
    }
}

function editFlower(id) {
    const flower = flowersData.find(f => f.id === id);
    if (flower) {
        document.getElementById('flower-id').value = flower.id;
        document.getElementById('flower-name').value = flower.name;
        document.getElementById('flower-meaning').value = flower.meaning;
        document.getElementById('flower-price').value = flower.price;
        
        document.getElementById('submit-btn').innerText = 'Güncelle';
        document.getElementById('form-title').innerText = `Düzenle: ${flower.name}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function resetForm() {
    flowerForm.reset();
    document.getElementById('flower-id').value = '';
    document.getElementById('submit-btn').innerText = 'Kataloğa Ekle';
    document.getElementById('form-title').innerText = 'Yeni Çiçek Ekle';
}

// --- 5. ARAMA, TEMA VE RESPONSIVE SIDEBAR ---
function filterAndSort() {
    let filtered = flowersData.filter(f => 
        f.name.toLowerCase().includes(searchInput.value.toLowerCase()) || 
        f.meaning.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    if (sortSelect.value === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }
    renderFlowers(filtered);
}

searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

function showLoader(show) {
    loader.style.display = show ? 'block' : 'none';
}

// --- 6. CANVAS YAPRAK ANIMASYONU ---
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let petals = [];

class Petal {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 5 + 4;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 1.5 + 1;
        this.color = `rgba(242, ${Math.floor(Math.random() * 30) + 150}, 180, 0.65)`;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.04 - 0.02;
    }
    update() { this.x += this.speedX; this.y += this.speedY; this.angle += this.spin; this.size -= 0.04; }
    draw() {
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
}

let lastMove = 0;
window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMove > 25) {
        petals.push(new Petal(e.clientX, e.clientY));
        lastMove = now;
    }
});

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < petals.length; i++) {
        petals[i].update(); petals[i].draw();
        if (petals[i].size <= 0 || petals[i].y > canvas.height) { petals.splice(i, 1); i--; }
    }
    requestAnimationFrame(animatePetals);
}

animatePetals();
renderFlowers();