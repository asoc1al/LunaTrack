var img = document.createElement("img");
img.src = "Images/avatar.jpg";
var src = document.getElementById("avatar");
src.appendChild(img);
const tg = window.Telegram.WebApp;

// Перевод
$('.translate').click(function() {
    var lang = $(this).attr('id');
    console.log(lang);
});

//______________________________________________________________________________________________________

// Попапы

// Настройки: 
let settingsPopup = document.getElementById("settingsPopup");

function openSettings() {
    closeMarkPeriod();
    closeCalDay();
    settingsPopup.classList.add("open-popup");
}

function closeSettings() {
    settingsPopup.classList.remove("open-popup");
}

//______________________________________________________________________________________________________

// Отметить период: 

let markPeriodPopup = document.getElementById('calendar');
let calDay = document.getElementById('cal_day');

function openMarkPeriod() {
    markPeriodPopup.classList.add('open-mark');
}

function closeMarkPeriod() {
    markPeriodPopup.classList.remove("open-mark");
}

function openCalDay() {
    calDay.classList.add('open_cal_day');
}

function closeCalDay() {
    calDay.classList.remove("open_cal_day");
}

let calendar = document.querySelector('.calendar');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

const generateCalendar = (month, year) => {

    let calendarDays = calendar.querySelector('.calendar-days');
    let calendarHeaderYear = calendar.querySelector('#year');
    let firstDate = null;
    let secondDate = null;

    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendarDays.innerHTML = '';

    let currDate = new Date();
    if (month === undefined) month = currDate.getMonth();
    if (year === undefined) year = currDate.getFullYear();

    let calYear = document.getElementById('year');
    calYear.innerHTML = `${currDate.getFullYear()}`;

    let currMonth = `${monthNames[month]}`;
    let monthPicker = document.getElementById('month-picker');
    monthPicker.innerHTML = currMonth;
    calendarHeaderYear.innerHTML = year;

    let firstDay = new Date(year, month, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= firstDay.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - firstDay.getDay() + 1;
            day.innerHTML += `<span></span><span></span><span></span><span></span>`;
            if (i - firstDay.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }

            function printDateRange(date1, date2) {
                if (date1 > date2) {
                    [date1, date2] = [date2, date1];
                }
                let dateArray = [];
                let currentDate = new Date(date1);
                while (currentDate <= date2) {
                    dateArray.push(currentDate.getDate());
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dateArray.join(', ');
            }

            day.addEventListener('click', () => {
                let selectedDay = i - firstDay.getDay() + 1;
                if (!firstDate || (firstDate && secondDate)) {
                    firstDate = new Date(year, month, selectedDay);
                    secondDate = null;
                } else {
                    secondDate = new Date(year, month, selectedDay);
                    closeMarkPeriod();
                    openCalDay();
                    let title = document.getElementById("cal_day_title");
                    title.innerHTML = printDateRange(firstDate, secondDate);
                }
            });
        }
        calendarDays.appendChild(day);
    }
}

let monthList = calendar.querySelector('.month-list');

monthNames.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div data-month="${index}">${e}</div>`;
    month.querySelector('div').onclick = () => {
        monthList.classList.remove('show');
        currMonth.value = index;
        generateCalendar(index, currYear.value);
    }
    monthList.appendChild(month);
});

let monthPicker = calendar.querySelector('#month-picker');

monthPicker.onclick = () => {
    monthList.classList.add('show');
}

let currDate = new Date();

let currMonth = { value: currDate.getMonth() };
let currYear = { value: currDate.getFullYear() };

generateCalendar(currMonth.value, currYear.value);

//______________________________________________________________________________________________________

// Темная тема

let styleMode = localStorage.getItem('styleMode');
const themeToggle = document.getElementById('themeToggle');

const enableDarkStyle = () => {
    document.body.setAttribute('dark', '');
    localStorage.setItem('styleMode', 'dark');
    themeToggle.checked = true;
}

const disableDarkStyle = () => {
    document.body.removeAttribute('dark');
    localStorage.setItem('styleMode', 'light');
    themeToggle.checked = false;
}

const changeTheme = (isChecked) => {
    if (isChecked) {
        enableDarkStyle();
    } else {
        disableDarkStyle();
    }
}

if (styleMode === 'dark') {
    enableDarkStyle();
}

themeToggle.addEventListener('change', (event) => {
    changeTheme(event.target.checked);
});

//______________________________________________________________________________________________________

// Информация о пользователе

const userInfoBlock = document.getElementById("user-info");
const userInfo = window.Telegram.WebApp.initDataUnsafe;

function getUserInfo(userInfo) {
    if (userInfo) {
        userInfoBlock.innerHTML = `
            ID: ${userInfo.id || "Не указано"} <br>
            Имя: ${userInfo.first_name || "Не указано"} <br>
            Фамилия: ${userInfo.last_name || "Не указано"} <br>
            Username: ${userInfo.username || "Не указано"} <br>
            Язык: ${userInfo.language_code || "Не указано"} <br>
            Премиум: ${userInfo.is_premium ? "Да" : "Нет"} <br>`;
    } else {
        userInfoBlock.innerHTML = "Данные пользователя не найдены.";
    }
}
getUserInfo(userInfo.user);

//______________________________________________________________________________________________________

window.Telegram.WebApp.expand();

// Получение темы Telegram

Telegram.WebApp.ready(() => {
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

//______________________________________________________________________________________________________

var day = new Date();
var month = day.getMonth();
var monthNamesRu = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
document.getElementById('month').innerHTML = monthNamesRu[month];

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayOfWeek = day.getDay();
var elements = document.getElementsByClassName(days[dayOfWeek]);
for (var i = 0; i < elements.length; i++) {
    elements[i].style.fontWeight = "900";
}

var dayId = days[dayOfWeek];
var dayNum = document.getElementById(dayId);
dayNum.style.fontSize = '19px';
dayNum.style.background = "grey";
dayNum.style.width = '34px';
dayNum.style.height = '34px';
dayNum.style.marginTop = '-2px';

//______________________________________________________________________________________________________

function getDatesOfCurrentWeek() {
    var today = new Date();
    var dayOfWeek = today.getDay();
    var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    var monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    var dates = [];
    var variables = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (var i = 0; i < 7; i++) {
        var currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + i);
        dates.push(currentDate);
        var element = document.getElementById(variables[i]);
        if (element) {
            element.textContent = currentDate.getDate();
        } else {
            console.warn(`Element with id ${variables[i]} not found`);
        }
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
    } else if ((day % 10 >= 2 && day % 10 <= 4) && (day % 100 < 10 || day % 100 >= 20)) {
        return 'дня';
    } else {
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
document.getElementById('period_days').innerHTML = `${daysLeft} ${getDaySuffix(daysLeft)}`;

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
    var ovulationDay = 14;
    if (currentDay >= ovulationDay - error && currentDay <= ovulationDay + error) {
        return lang === 'en' ? 'high' : "высокая";
    } else {
        return lang === 'en' ? 'low' : "низкая";
    }
}

if (userInfo.language_code === 'ru'){
    lang = 'ru';
} else{
    lang = 'en';
}
var result = getPregnancyChance(startDate, cycleLength);
let pregnancy_chance = document.getElementById('pregnancy_chance');
pregnancy_chance.innerHTML = `${pregnancy_chance.textContent} ${result}`