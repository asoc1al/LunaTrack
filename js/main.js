var img = document.createElement("img");
img.src = "Images/avatar.jpg";
var src = document.getElementById("avatar");
src.appendChild(img);





// var days = [
//   'Воскресенье',
//   'Понедельник',
//   'Вторник',
//   'Среда',
//   'Четверг',
//   'Пятница',
//   'Суббота'
// ];
// var day = new Date();
// var transformation = day.getDay();
// document.getElementById('dayweek').innerHTML = days[transformation];

var day = new Date();
mounth = day.getMonth();
monthNames = [
                    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
                ];
document.getElementById('mounth').innerHTML = monthNames[mounth];


var days = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];
weekday = day.getDay() - 1;
var elements = document.getElementsByClassName(days[weekday]);
console.log(days[weekday]);
for (var i = 0; i < elements.length; i++) {
            elements[i].style.fontWeight = "900";
        }

function getDatesOfCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Получаем номер дня недели (воскресенье - 0, понедельник - 1, ...)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Определяем смещение до понедельника
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset); // Получаем дату понедельника

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + i);
        dates.push(currentDate.getDate()); // Добавляем только число дня
    }

    return dates;
}

const datesOfWeek = getDatesOfCurrentWeek();
datesOfWeek.forEach(date => console.log(date));

