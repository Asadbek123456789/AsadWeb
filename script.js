const resources = {
    uz: { translation: { login_p: "Boshqaruv paneliga xush kelibsiz!", login_btn: "Kirish", hero_h1: "Yuqori Sifatli Raqamli Yechimlar", hero_p: "Men Asadbek — murakkab web-saytlar va Telegram botlar yaratuvchi tajribali dasturchiman." }},
    en: { translation: { login_p: "Welcome to the management panel!", login_btn: "Enter", hero_h1: "High-Quality Digital Solutions", hero_p: "I am Asadbek — an experienced developer creating complex websites and Telegram bots." }},
    ru: { translation: { login_p: "Добро пожаловать в панель управления!", login_btn: "Войти", hero_h1: "Высококачественные цифровые решения", hero_p: "Я Асадбек — опытный разработчик веб-сайтов и Telegram-ботов." }}
};

i18next.init({ lng: 'uz', resources }, function() { updateContent(); });
function updateContent() { document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = i18next.t(el.getAttribute('data-i18n')); }); }

// HAMMA YOQDAN TUSHADIGAN PROFESSIONAL BARGLAR EFFEKTI
function createPremiumLeaves() {
    const container = document.getElementById('leaves-container');
    const leafColors = ['#e67e22', '#d35400', '#f1c40f', '#e74c3c', '#ba5c12'];
    
    // 35 ta haqiqiy va hamma tomondan tushadigan barglar
    for (let i = 0; i < 35; i++) {
        let leaf = document.createElement('div');
        leaf.classList.add('leaf');
        
        // Ekranning hamma qismidan boshlanadi (0 dan 100vw gacha)
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.backgroundColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        
        // Har xil o'lcham - realizm berish uchun
        const scale = Math.random() * 0.6 + 0.6;
        leaf.style.transform = `scale(${scale})`;
        
        leaf.style.animationDuration = (Math.random() * 6 + 5) + 's';
        leaf.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(leaf);
    }
}

// WINDOW LOAD
window.addEventListener('load', () => {
    createPremiumLeaves();
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('zoom-out');
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.getElementById('login-overlay').classList.remove('hidden');
            }, 400);
        }, 600);
    }, 3000);
});

// TUGMANING CARD TASHQARISIGA CHIQIB, MATRIX CHEGARADA QOCHISHI
const loginBtn = document.getElementById('login-btn');
const email = document.getElementById('email');
const pass = document.getElementById('password');

document.addEventListener('mousemove', (e) => {
    // Agar login/parol kiritilmagan bo'lsa va kompyuter bo'lsa qochadi
    if ((email.value.trim() === "" || pass.value.trim() === "") && window.innerWidth > 768) {
        const btnRect = loginBtn.getBoundingClientRect();
        
        // Tugmaning ayni vaqtdagi markazi
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        // Sichqoncha va tugma markazi o'rtasidagi masofa
        const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

        // Yaqinlashish radiusi 90px bo'lganda qochish ishga tushadi
        if (distance < 90) {
            // Card chegarasidan chiqadi, lekin ekranda yo'qolib ketmaydi (Nazorat kodi)
            // Maksimal qochish radiusi x o'qida -180px dan 180px gacha, y o'qida -120px dan 120px gacha
            const escapeX = (Math.random() - 0.5) * 360; 
            const escapeY = (Math.random() - 0.5) * 240;

            // Karta atrofidagi tashqi hududga otiladi
            loginBtn.style.transform = `translate(${escapeX}px, ${escapeY}px)`;
        }
    }
});

// INPUT TO'LDIRILSA CHAQOQN JOYIGA (DIV ICHIGA) SILIQ QAYTADI
function checkInputs() {
    if (email.value.trim() !== "" && pass.value.trim() !== "") {
        loginBtn.style.transform = "translate(0px, 0px)";
    }
}
email.addEventListener('input', checkInputs);
pass.addEventListener('input', checkInputs);

// ASADWEB TEPAGA QAYTISH TUGMASI LOGIKASI
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// TIZIMGA KIRISH VA FONAR FAOLIYATI
const mask = document.getElementById('flashlight-mask');
let isFlashlightActive = false;

loginBtn.addEventListener('click', () => {
    if (email.value.trim() !== "" && pass.value.trim() !== "") {
        document.getElementById('login-overlay').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('login-overlay').style.display = "none";
            if(window.innerWidth > 768) {
                mask.classList.remove('hidden');
                isFlashlightActive = true;
            }
            document.getElementById('main-site').classList.remove('hidden');
        }, 500);
    }
});

document.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 768 && isFlashlightActive) {
        mask.style.setProperty('--x', `${e.clientX}px`);
        mask.style.setProperty('--y', `${e.clientY}px`);
    }
});

// "F" BOSILGANDA FONAR ON/OFF
document.addEventListener('keydown', (e) => {
    if (isFlashlightActive && (e.key === 'f' || e.key === 'F')) {
        mask.classList.toggle('disabled-flash');
    }
});

// Mobil burger
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});
