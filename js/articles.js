var img = document.createElement("img");
img.src = "Images/avatar.jpg";
var src = document.getElementById("avatar");
src.appendChild(img);
//______________________________________________________________________________________________________

//Popups

let settingsPopup = document.getElementById("settingsPopup");

function openSettings(){
    settingsPopup.classList.add("open-popup")
}
function closeSettings(){
    settingsPopup.classList.remove("open-popup")
}


Telegram.WebApp.BackButton.show();

Telegram.WebApp.BackButton.onClick(function() {
    window.location.href = './articles.html';
});

// Перехват ссылок на Teletype
document.querySelectorAll('a.teletype-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Останавливаем стандартное поведение ссылки
        const teletypeUrl = link.getAttribute('href'); // Получаем ссылку

        // Логика открытия ссылки в новом окне или в другом контексте
        window.open(teletypeUrl, '_blank'); // Открываем Teletype в новом окне или вкладке
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