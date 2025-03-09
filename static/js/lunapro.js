document.addEventListener('DOMContentLoaded', function () {
    const avatarElement = document.getElementById('avatar');
    if (!avatarElement.dataset.initialized) {
        // Логика для аватара
        avatarElement.dataset.initialized = true;
    }

    const settingsElement = document.getElementById('settings');
    if (!settingsElement.dataset.initialized) {
        // Логика для кнопки настроек
        settingsElement.dataset.initialized = true;
    }
});



Telegram.WebApp.ready(); // Убедитесь, что WebApp API готов

Telegram.WebApp.disableClosingConfirmation();

const user = window.Telegram.WebApp.initDataUnsafe.user; // Получаем объект user
const user_photo_url = user?.photo_url; // Получаем URL фотографии пользователя

// console.log("!!!!!!!!user_photo_url:", JSON.stringify(user_photo_url, null, 2));

if (user_photo_url) {
    // Если фото профиля доступно
    var img = document.createElement('img');
    img.src = user_photo_url; 
    var userPhotoElement = document.getElementById('avatar');
    userPhotoElement.appendChild(img);
} else {
    // Если фото профиля недоступно, используем альтернативную картинку

    var img = document.createElement('img');
    img.src = '../static/img/avatar.jpg' // Устанавливаем URL картинки по умолчанию
    var userPhotoElement = document.getElementById('avatar');
    userPhotoElement.appendChild(img);

    console.log("Фото профиля отсутствует:", JSON.stringify(user_photo_url, null, 2));
}





// ______________________________________________________________________________________________________

// Popups

let settingsPopup = document.getElementById("settingsPopup");

function openSettings(){
    settingsPopup.classList.add("open-popup")
}
function closeSettings(){
    settingsPopup.classList.remove("open-popup")
}

Telegram.WebApp.BackButton.hide();


// ______________________________________________________________________________________________________

// Dark mode

let styleMode = localStorage.getItem('styleMode');
const themeToggle = document.getElementById('themeToggle');

const enableDarkStyle = () => {
    document.body.setAttribute('dark', '')
    localStorage.setItem('styleMode', 'dark');
    themeToggle.checked = true;
}
const disableDarkStyle = () => {
    document.body.removeAttribute('dark');
    localStorage.setItem('styleMode', 'light');
    themeToggle.checked = false;
}

const ChangeTheme = (isChecked) => {
    if (isChecked) {
        enableDarkStyle()
    } else{
        disableDarkStyle()
    }
}

if (styleMode === 'dark') {
    enableDarkStyle();
}

themeToggle.addEventListener('change', (event) => {
    ChangeTheme(event.target.checked);
});


//______________________________________________________________________________________________________


document.addEventListener('DOMContentLoaded', function () {
    const avatarElement = document.getElementById('avatar');
    if (avatarElement && !avatarElement.dataset.initialized) {
        // Устанавливаем флаг, чтобы не инициализировать повторно
        avatarElement.dataset.initialized = true;

        // Добавляем аватар только один раз
        const img = document.createElement("img");
        img.src = '/static/img/avatar.jpg';
        img.alt = 'Avatar';
        avatarElement.appendChild(img);
    }

    const settingsElement = document.getElementById('settings');
    if (settingsElement && !settingsElement.dataset.initialized) {
        settingsElement.dataset.initialized = true;

        // Инициализация логики настроек, если требуется
    }
});

// Функция для подключения динамических стилей и скриптов
function loadStylesAndScripts(cssFile, jsFile) {
    // Удаляем старые стили
    document.querySelectorAll('link[data-dynamic="true"]').forEach(style => style.remove());

    // Удаляем старые скрипты
    document.querySelectorAll('script[data-dynamic="true"]').forEach(script => script.remove());

    // Подключаем новый CSS
    if (cssFile) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        link.dataset.dynamic = 'true';
        document.head.appendChild(link);
    }

    // Подключаем новый JS
    if (jsFile) {
        const script = document.createElement('script');
        script.src = jsFile;
        script.dataset.dynamic = 'true';
        script.defer = true;
        document.body.appendChild(script);
    }
}

// Пример вызова
loadStylesAndScripts('/static/main/css/lunapro.css', '/static/main/js/lunapro.js');

Telegram.WebApp.ready(); // Убедитесь, что WebApp API готов
Telegram.WebApp.disableClosingConfirmation();
