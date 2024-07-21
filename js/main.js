var img = document.createElement("img");
img.src = "Images/avatar.jpg";
var src = document.getElementById("avatar");
src.appendChild(img);
const tg = window.Telegram.WebApp;



//______________________________________________________________________________________________________

//Popups

// Settings: 

let settingsPopup = document.getElementById("settingsPopup");

function openSettings(){
    CloseMarkPeriod();
    CloseCalDay();
    settingsPopup.classList.add("open-popup");
}
function closeSettings(){
    settingsPopup.classList.remove("open-popup")
}

//______________________________________________________________________________________________________

// Mark Period: 

let MarkPeriodPopup = document.getElementById('calendar');
let CalDay = document.getElementById('cal_day');

function OpenMarkPeriod() {
    MarkPeriodPopup.classList.add('open-mark');
}
function CloseMarkPeriod(){
    MarkPeriodPopup.classList.remove("open-mark");
}
function OpenCalDay() {
    CalDay.classList.add('open_cal_day');
}
function CloseCalDay(){
    CalDay.classList.remove("open_cal_day");
}


let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')
    let firstDate = null;
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

    // get first day of month
    
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
                if (date1 > date2) {
                    [date1, date2] = [date2, date1];
                }
                let dateArray = [];
                let currentDate = new Date(date1);
                while (currentDate <= date2) {
                    dateArray.push(currentDate.getDate()); // Добавляем только день
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dateArray.join(', ');
            }
            // Add event listener for clicking on the date
            day.addEventListener('click', () => {
                let selectedDay = i - first_day.getDay() + 1;
                if (!firstDate || (firstDate && secondDate)) {
                    // firstDate = new Date(year, month, selectedDay);
                    firstDate = new Date(year, month, selectedDay);
                    secondDate = null;
                    // console.log(`First date selected: ${firstDate.toDateString()}`);
                } else {
                    secondDate = new Date(year, month, selectedDay);
                    // console.log(`Second date selected: ${secondDate.toDateString()}`);
                    // printDateRange(firstDate, secondDate);
                    CloseMarkPeriod();
                    OpenCalDay();
                    title = document.getElementById("cal_day_title");
                    // console.log(`Clicked date: ${i - first_day.getDay() + 1}-${curr_month}-${year}`);
                    title.innerHTML = printDateRange(firstDate, secondDate);


                }
            });
        }
        calendar_days.appendChild(day)
    }
}

// day.addEventListener('click', () => {
//                 CloseMarkPeriod();
//                 OpenCalDay();
//                 title = document.getElementById("cal_day_title");
//                 console.log(`Clicked date: ${i - first_day.getDay() + 1}-${curr_month}-${year}`);
//                 title.innerHTML = `${i - first_day.getDay() + 1}.${curr_month}.${year}`;

//             });


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

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)



// document.querySelector('#prev-year').onclick = () => {
//     --curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

// document.querySelector('#next-year').onclick = () => {
//     ++curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }



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

// USER INFO

const user_info_block = document.getElementById("user-info");
const user_info = window.Telegram.WebApp.initDataUnsafe;
window.Telegram.WebApp.isVerticalSwipesEnabled(false);
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
// Фото: ${user_info.photo_url || "Нет фото"}`;
// console.log(get_user_info(user_info.user));
get_user_info(user_info.user);

  
//______________________________________________________________________________________________________

window.Telegram.WebApp.expand()

// Get telegram theme

// Инициализация WebApp
Telegram.WebApp.ready(() => {
    
    // Получение текущих параметров темы
    const themeParams = Telegram.WebApp.themeParams;
    // console.log('Текущие параметры темы:', themeParams);

    // Проверка, тёмная тема или светлая
    if (themeParams.bg_color && isDarkColor(themeParams.bg_color)) {
        enableDarkStyle();
    } else {
        disableDarkStyle();
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
        // console.log('Новые параметры темы:', newThemeParams);

        if (newThemeParams.bg_color && isDarkColor(newThemeParams.bg_color)) {
            enableDarkStyle();
        } else {
            disableDarkStyle();
        }
    });
});



//______________________________________________________________________________________________________
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
//______________________________________________________________________________________________________

function getCurrentDay(startDate, cycleLength) {
    var today = new Date();
    var timeDifference = today - startDate;
    var dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference % cycleLength;
}

//______________________________________________________________________________________________________


function getPregnancyChance(startDate, cycleLength, lang) {
    var error = 2;
    var currentDay = getCurrentDay(startDate, cycleLength, lang);
    var ovulationDay = 14;  // День овуляции в цикле
    if (currentDay >= ovulationDay - error && currentDay <= ovulationDay + error) {
        return lang === 'en' ? 'high' : "высокая";
    } else{
        return lang === 'en' ? 'low' : "низкая";
    }
    
}

// if (currentDay >= ovulationDay - error && currentDay <= ovulationDay + error) {
//     if (lang === 'en'){
//         return 'high'
//     } else{ 
//         return "высокая";
//     }
// } else if (lang === 'en'){
//     return 'low';
// } else{ 
//     return "низкая";
// }

// if (currentDay >= ovulationDay - error && currentDay <= ovulationDay + error) {
//         return lang === 'en' ? 'high' : "высокая";
//     } else {
//         return lang === 'en' ? 'low' : "низкая";
//     }
// }

// console.log(lang)
let lang = 'ru';
$('.translate').click(function() {
    lang = $(this).attr('id');
});

if (user_info.language_code === 'ru'){
    lang = 'ru';
} else{
    lang = 'en'
}

var result = getPregnancyChance(startDate, cycleLength, lang);
pregnancy_chance = document.getElementById('pregnancy_chance');
pregnancy_chance.innerHTML = `${pregnancy_chance.textContent} ${result} `;

