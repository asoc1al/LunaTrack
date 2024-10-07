var img = document.createElement("img");
img.src = "Images/avatar.jpg";
var src = document.getElementById("avatar");
src.appendChild(img);
const tg = window.Telegram.WebApp;

//______________________________________________________________________________________________________

//Popups

// Settings: 

let settingsPopup = document.getElementById("settingsPopup");

function openSettings() {
    CloseMarkPeriod();
    CloseCalDay();
    settingsPopup.classList.add("open-popup");
}
function closeSettings() {
    settingsPopup.classList.remove("open-popup")
}

// Telegram.WebApp.BackButton.hide();

//______________________________________________________________________________________________________

// Mark Period: 

let MarkPeriodPopup = document.getElementById('calendar');
let CalDay = document.getElementById('cal_day');

function OpenMarkPeriod() {
    MarkPeriodPopup.classList.add('open-mark');
}
function CloseMarkPeriod() {
    MarkPeriodPopup.classList.remove("open-mark");
}
function OpenCalDay() {
    CalDay.classList.add('open_cal_day');
}
function CloseCalDay() {
    CalDay.classList.remove("open_cal_day");
}

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let firstDate = null; // Переменная для хранения первой выбранной даты
// let startDate = new Date('08/01/2024');  // Предварительное значение, которое обновится после выбора даты
let startDate = new Date();
let cycleLength = 28;

function updateStartDate() {
    if (firstDate) {
        startDate = firstDate;
    }
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let secondDate = null;

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let cal_year = document.getElementById('year');
    cal_year.innerHTML = `${currDate.getFullYear()}`;

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }

            function printDateRange(date1, date2) {
                if (date1 && date2) {
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    const startDateFormatted = date1.toLocaleDateString(undefined, options);
                    const endDateFormatted = date2.toLocaleDateString(undefined, options);
                    return [startDateFormatted, endDateFormatted]
                }
                return ['', ''];
            }

            day.addEventListener('click', () => {
                let selectedDay = i - first_day.getDay() + 1;
                if (!firstDate || (firstDate && secondDate)) {
                    firstDate = new Date(year, month, selectedDay);
                    secondDate = null;
                    startDate = firstDate;  // Обновление startDate
                    updateStartDate();  // Обновляем startDate
                    updatePeriodDays(); // Обновляем количество дней
                } else {
                    secondDate = new Date(year, month, selectedDay);
                    CloseMarkPeriod();
                    OpenCalDay();
                    title = document.getElementById("cal_day_title");
                    dates = printDateRange(firstDate, secondDate);
                    title.innerHTML = `С ${dates[0]} по ${dates[1]}`;
                }
            });
        }
        calendar_days.appendChild(day)
    }
    return { firstDate, secondDate };
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value);

// Функция для обновления значения daysUntil на основе startDate
function updatePeriodDays() {
    var nextPeriodDate = getNextPeriod(startDate, cycleLength);
    var daysLeft = daysUntil(nextPeriodDate);
    document.getElementById('period_days').innerHTML = `${daysLeft} ${getDaySuffix(daysLeft)}`;
}

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
    } else {
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

// USER INFO

const user_info_block = document.getElementById("user-info");
const user_info = window.Telegram.WebApp.initDataUnsafe;
function get_user_info(user_info) {
    if (user_info) {
        user_info_block.innerHTML = `
                ID: ${user_info.id || "Не указано"} <br>
                Имя: ${user_info.first_name || "Не указано"} <br>
                Фамилия: ${user_info.last_name || "Не указано"} <br>
                Username: ${user_info.username || "Не указано"} <br>
                Язык: ${user_info.language_code || "Не указано"} <br>
                Премиум: ${user_info.is_premium ? "Да" : "Нет"} <br>`;
    } else {
        user_info_block.innerHTML = "Данные пользователя не найдены.";
    }
};

get_user_info(user_info.user);

//______________________________________________________________________________________________________

// Инициализация WebApp
Telegram.WebApp.ready(() => {
    // const { enableVerticalSwipes, disableVerticalSwipes } = useWebAppViewport()
    // disableVerticalSwipes()

    const themeParams = Telegram.WebApp.themeParams;

    if (themeParams.bg_color && isDarkColor(themeParams.bg_color)) {
        enableDarkStyle();
    } else {
        disableDarkStyle();
    }

    function isDarkColor(color) {
        color = color.replace('#', '');

        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness < 128;
    }

    Telegram.WebApp.onEvent('themeChanged', () => {
        const newThemeParams = Telegram.WebApp.themeParams;

        if (newThemeParams.bg_color && isDarkColor(newThemeParams.bg_color)) {
            enableDarkStyle();
        } else {
            disableDarkStyle();
        }
    });
});

// Расширяем Web App на весь экран
// const tg = window.Telegram.WebApp;
tg.expand();

// // Если нужно, ещё раз вызываем disableVerticalSwipes
// if (Telegram.WebApp.isVersionAtLeast("7.7")) {
//     const { disableVerticalSwipes } = useWebAppViewport();
//     disableVerticalSwipes();
// }


// ________________________________________________________________________________________
// ________________________________________________________________________________________

var day = new Date();
mounth = day.getMonth();
monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
document.getElementById('mounth').innerHTML = monthNames[mounth];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var day = new Date(); // Создаем объект Date
var weekday = day.getDay(); // Получаем день недели от 0 до 6
var elements = document.getElementsByClassName(days[weekday]);
for (var i = 0; i < elements.length; i++) {
    elements[i].style.fontWeight = "900";
}
var dayId = days[weekday];
var day_num = document.getElementById(dayId);
day_num.style.fontSize = '19px';
day_num.style.background = "grey";
day_num.style.width = '34px';
day_num.style.height = '34px';
day_num.style.marginTop = '-2px';

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

// function getNextPeriod(startDate, cycleLength) {
//     return addDays(startDate, cycleLength);
// }

function getNextPeriod(startDate, cycleLength) {
    var today = new Date();
    if (startDate > today) {
        return startDate;  // Если startDate уже в будущем, возвращаем её
    }
    return addDays(startDate, cycleLength);
}


function daysUntil(date) {
    var today = new Date();
    var timeDiff = date.getTime() - today.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

function getDaySuffix(day) {
    if (day === 1 || day === 21 || day === 31) {
        return 'день';
    } else if (day >= 2 && day <= 4 || day >= 22 && day <= 24) {
        return 'дня';
    } else {
        return 'дней';
    }
}

updatePeriodDays();  // Первоначальный вызов функции для установки значения при загрузке страницы

// Ваш основной код...

function daysUntil(date) {
    var today = new Date();
    var targetDate = new Date(date);
    var timeDifference = targetDate - today;
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}

// var cycleLength = 28;
var nextPeriodDate = getNextPeriod(startDate, cycleLength);
var daysLeft = daysUntil(nextPeriodDate);
document.getElementById('period_days').innerHTML = "".concat(daysLeft, " ").concat(getDaySuffix(daysLeft));

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
        return "высокая";
    } else {
        return "низкая";
    }
}

// Пример использования:

var result = getPregnancyChance(startDate, cycleLength);
var pregnancy_chance = document.getElementById('pregnancy_chance');
pregnancy_chance.innerHTML = `${pregnancy_chance.textContent} ${result} `;

//______________________________________________________________________________________________________

// Дополнительный код или функции...
