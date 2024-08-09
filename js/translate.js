var arrLang = {
    'en': {
        'mon': 'Mon',
        'tue': 'Tue',
        'wed': 'Wed',
        'thu': 'Thu',
        'fri': 'Fri',
        'sat': 'Sat',
        'sun': 'Sun',
        'developing': 'In developing',
        'pregnancy_chance': `Chance of getting pregnant ${result}`,
        // 'cal_day_title': `From ${startDateFormatted} to ${endDateFormatted}`,
    },
    'ru': {
        'mon': 'Пн',
        'tue': 'Вт',
        'wed': 'Ср',
        'thu': 'Чт',
        'fri': 'Пт',
        'sat': 'Сб',
        'sun': 'Вс',
        'developing': 'В разработке',
        'pregnancy_chance': `Вероятность забеременеть ${result}`,
        // 'cal_day_title': `С ${startDateFormatted} по ${endDateFormatted}`,
    }
}

$(function() {
    $('.translate').click(function() {
        var lang = $(this).attr('id');

        $('.lang').each(function(index, item) {
            $(this).text(arrLang[lang][$(this).attr('key')]);
        });
    });
});