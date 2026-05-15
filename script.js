// i18next Tarjimalar
const resources = {
    uz: { translation: {
        login_p: "Dasturchi Asadbek portaliga xush kelibsiz!", login_btn: "Kirish",
        nav_courses: "Kurslar", nav_teachers: "Ustozlar", nav_reviews: "Mijozlar",
        hero_h1: "Kelajak Dasturiy Yechimlari", hero_p: "Men Asadbek — murakkab web-saytlar va Telegram botlar yaratuvchi tajribali dasturchiman. Sizning g'oyalaringizni mukammal kodga aylantiraman.",
        rights: "Barcha huquqlar himoyalangan."
    }},
    en: { translation: {
        login_p: "Welcome to Asadbek Developer Portal!", login_btn: "Enter",
        nav_courses: "Courses", nav_teachers: "Teachers", nav_reviews: "Reviews",
        hero_h1: "Future Digital Solutions", hero_p: "I am Asadbek — an experienced developer creating complex websites and Telegram bots. I turn your ideas into perfect code.",
        rights: "All rights reserved."
    }},
    ru: { translation: {
        login_p: "Добро пожаловать в портал Асадбека!", login_btn: "Войти",
        nav_courses: "Курсы", nav_teachers: "Учителя", nav_reviews: "Отзывы",
        hero_h1: "Цифровые решения будущего", hero_p: "Я Асадбек — опытный разработчик веб-сайтов и Telegram-ботов. Я превращаю ваши идеи в идеальный код.",
        rights: "Все права защищены."
    }}
};

i18next.init({ lng: 'uz', resources }, function() { updateContent(); });

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = i18next.t(el.getAttribute('data-i18n'));
    });
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    i18next.changeLanguage(e.target.value, updateContent);
});

// SICHQONCHA NURI EFFEKTI
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// TUGMA QOCHISH EFFEKTI (UZoqQA QOCHISH)
const loginBtn = document.getElementById('login-btn');
const email = document.getElementById('email');
const pass = document.getElementById('password');

loginBtn.addEventListener('mouseover', function(e) {
    if (email.value.trim() === "" || pass.value.trim() === "") {
        // Ekran kengligi va balandligini hisobga olgan holda uzoqqa qochadi
        const x = Math.random() * (window.innerWidth - 200) - window.innerWidth / 2;
        const y = Math.random() * (window.innerHeight - 200) - window.innerHeight / 2;
        
        this.style.position = "absolute";
        this.style.transform = `translate(${x}px, ${y}px)`;
        this.style.transition = "0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"; // Sakrash effekti
    }
});

// Ma'lumot yozilsa tugma joyiga qaytadi
[email, pass].forEach(input => {
    input.addEventListener('input', () => {
        loginBtn.style.position = "static";
        loginBtn.style.transform = "translate(0,0)";
    });
});

// KIRISH
loginBtn.addEventListener('click', () => {
    if (email.value.trim() !== "" && pass.value.trim() !== "") {
        document.getElementById('login-overlay').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('login-overlay').style.display = "none";
            const main = document.getElementById('main-site');
            main.classList.remove('hidden');
            main.style.opacity = "1";
            main.style.transition = "1s ease";
        }, 500);
    }
});