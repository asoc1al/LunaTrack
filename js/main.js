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

//______________________________________________________________________________________________________

// Get telegram theme

// Инициализация WebApp
Telegram.WebApp.ready();

// Получение текущих параметров темы
const themeParams = Telegram.WebApp.themeParams;
console.log('Текущие параметры темы:', themeParams);

// Проверка, тёмная тема или светлая
if (themeParams.bg_color && isDarkColor(themeParams.bg_color)) {
    console.log("Темная тема");
} else {
    console.log("Светлая тема");
}

// Функция для определения, является ли цвет тёмным
function isDarkColor(color) {
    // Удаление возможного символа #
    color = color.replace('#', '');

    // Преобразование цвета в RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Определение яркости цвета
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Если яркость меньше 128, цвет считается тёмным
    return brightness < 128;
}

// Слушатель изменений темы
Telegram.WebApp.onEvent('themeChanged', () => {
    const newThemeParams = Telegram.WebApp.themeParams;
    console.log('Новые параметры темы:', newThemeParams);

    if (newThemeParams.bg_color && isDarkColor(newThemeParams.bg_color)) {
        console.log("Темная тема");
    } else {
        console.log("Светлая тема");
    }
});



document.addEventListener('DOMContentLoaded', function() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        // const root = document.documentElement;


        const themeParams = tg.themeParams;
        const isDarkMode = themeParams.is_dark;
        const theme = isDarkMode ? 'dark' : 'light';

        if (theme === 'dark') {
            enableDarkStyle()
        } else {
            disableDarkStyle()
        }

        // const themeParams = tg.themeParams;


        // const bgColor = themeParams.bg_color;
        // const textColor = themeParams.text_color;
        // const weekdays = document.getElementsByClassName("weekdays")[0];
        // document.body.style.backgroundColor = bgColor;
        // weekdays.style.color = textColor;
        // root.style.setProperty('--bg-color', 'lightblue');
        // root.style.setProperty('--text-color', 'darkblue');



    //     let usercard = document.getElementById("settingsPopup");
    //     let p = document.getElementById('user-info');

    //     console.log('initDataUnsafe:', tg.initDataUnsafe);

    //     if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    //         // Отображаем данные пользователя на странице
    //         p.innerHTML = `
    //             ${userData.first_name} 
    //             ${userData.last_name} 
    //             ${userId}
    //         `;
    //     } else {
    //         console.log('User data not available');
    //         p.innerHTML = 'User information is not available.';
    //     }

    //     usercard.appendChild(p);

    // } else {
    //     console.error('Telegram.WebApp not available.');
    // }
    }
});


// document.addEventListener('DOMContentLoaded', function() {
//     const tg = window.Telegram.WebApp;
//     console.log('Telegram WebApp initialized:', tg);

//     const themeParams = tg.themeParams;
//     console.log('Theme parameters:', themeParams);

//     const bgColor = themeParams.bg_color;
//     document.body.style.backgroundColor = bgColor;

//     let usercard = document.getElementById("settingsPopup");
//     let p = document.getElementById('user-info');

//     console.log('initDataUnsafe:', tg.initDataUnsafe);

//     if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
//         console.log('User data available:', tg.initDataUnsafe.user);
//         p.innerHTML = `
//             ${tg.initDataUnsafe.user.first_name} 
//             ${tg.initDataUnsafe.user.last_name} 
//             ${tg.initDataUnsafe.user.id}
//         `;
//     } else {
//         console.log('User data not available');
//         p.innerHTML = 'User information is not available.';
//     }

//     usercard.appendChild(p);
// });

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



//______________________________________________________________________________________________________
var day = new Date();
mounth = day.getMonth();
monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
document.getElementById('mounth').innerHTML = monthNames[mounth];
var days = [
    'Sun', // Начинаем с 'Sun', чтобы соответствовать значениям getDay()
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
var day = new Date(); // Создаем объект Date
var weekday = day.getDay(); // Получаем день недели от 0 до 6
var elements = document.getElementsByClassName(days[weekday]);
for (var i = 0; i < elements.length; i++) {
    elements[i].style.fontWeight = "900";
}
//______________________________________________________________________________________________________
function getDatesOfCurrentWeek() {
    var today = new Date();
    var dayOfWeek = today.getDay(); // Получаем номер дня недели (воскресенье - 0, понедельник - 1, ...)
    var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Определяем смещение до понедельника
    var monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset); // Получаем дату понедельника
    var dates = [];
    var variables = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];
    for (var i = 0; i < 7; i++) {
        var currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + i);
        dates.push(currentDate);
        // Обновляем элементы HTML
        var element = document.getElementById(variables[i]);
        if (element) {
            element.textContent = currentDate.getDate();
        }
        else {
            console.warn("Element with id ".concat(variables[i], " not found"));
        }
        // Создаем переменные для каждой даты
        window[variables[i] + 'Date'] = currentDate;
    }
    return dates;
}
getDatesOfCurrentWeek();
//______________________________________________________________________________________________________
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function getNextPeriod(startDate, cycleLength) {
    return addDays(startDate, cycleLength);
}
function getDaySuffix(day) {
    if (day % 10 === 1 && day % 100 !== 11) {
        return 'день';
    }
    else if ((day % 10 >= 2 && day % 10 <= 4) && (day % 100 < 10 || day % 100 >= 20)) {
        return 'дня';
    }
    else {
        return 'дней';
    }
}
function daysUntil(date) {
    var today = new Date();
    var targetDate = new Date(date);
    var timeDifference = targetDate - today;
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}
var startDate = new Date('07/01/2024');
var cycleLength = 28;
var nextPeriodDate = getNextPeriod(startDate, cycleLength);
var daysLeft = daysUntil(nextPeriodDate);
document.getElementById('period_days').innerHTML = "".concat(daysLeft, " ").concat(getDaySuffix(daysLeft));
// console.log(`${daysLeft} ${getDaySuffix(daysLeft)}`);
//______________________________________________________________________________________________________

function getCurrentDay(startDate, cycleLength) {
    var today = new Date();
    var timeDifference = today - startDate;
    var dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference % cycleLength;
}

//______________________________________________________________________________________________________

function getPregnancyChance(startDate, cycleLength) {
    var error = 2;
    var currentDay = getCurrentDay(startDate, cycleLength);
    var ovulationDay = 14;  // День овуляции в цикле
    if (currentDay >= ovulationDay - error && currentDay <= ovulationDay + error) {
        // console.log("High");
        return "высокая";
    } else {
        // console.log("Low");
        return "низкая";
    }
}

var result = getPregnancyChance(startDate, cycleLength);
document.getElementById('pregnancy_chance').textContent = `Вероятность забеременеть ${result}`;
// document.getElementById('result').textContent = `Pregnancy chance is: ${result}`;
