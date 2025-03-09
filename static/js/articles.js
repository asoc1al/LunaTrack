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



Telegram.WebApp.ready(); // Убедитесь, что WebApp API готов

Telegram.WebApp.disableClosingConfirmation();
//______________________________________________________________________________________________________

//Popups

let settingsPopup = document.getElementById("settingsPopup");

function openSettings(){
    settingsPopup.classList.add("open-popup")
}
function closeSettings(){
    settingsPopup.classList.remove("open-popup")
}


// Показываем кнопку "Назад"
Telegram.WebApp.BackButton.show();

Telegram.WebApp.BackButton.onClick(function() {
    // Возвращаемся к списку статей
    window.location.href = './articles.html';
});

// Перехват кликов по ссылке на Teletype
document.querySelectorAll('a.swiper-slide').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Останавливаем стандартное поведение ссылки

        const teletypeUrl = link.getAttribute('href'); // Получаем URL Teletype

        // // Открываем Teletype в новом Web App окне
        // Telegram.WebApp.openWebApp(url_ = teletypeUrl);
    
        // Открываем Teletype в новом окне или вкладке
        window.open(teletypeUrl, '_blank');

    });
});


//______________________________________________________________________________________________________

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

// Swiper

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    mousewheel: true,
    keyboard: true,
});