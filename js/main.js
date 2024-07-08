document.addEventListener('DOMContentLoaded', (event) => {
    // USER INFO
    const user_info_block = document.getElementById("user-info");

    // Логирование данных initDataUnsafe
    console.log("initDataUnsafe:", window.Telegram.WebApp.initDataUnsafe);

    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

    function get_user_info(user_info) {
        console.log("User info object:", user_info);
        if (user_info) {
            user_info_block.innerHTML = `
                ID: ${user_info.id || "Не указано"} <br>
                Имя: ${user_info.first_name || "Не указано"} <br>
                Фамилия: ${user_info.last_name || "Не указано"} <br>
                Username: ${user_info.username || "Не указано"} <br>
                Язык: ${user_info.language_code || "Не указано"} <br>
                Премиум: ${user_info.is_premium ? "Да" : "Нет"} <br>
                Фото: ${user_info.photo_url ? `<img src="${user_info.photo_url}" alt="Фото пользователя">` : "Нет фото"}`;
        } else {
            user_info_block.innerHTML = "Данные пользователя не найдены.";
        }
    };

    if (initDataUnsafe && initDataUnsafe.user) {
        console.log("Данные пользователя:", initDataUnsafe.user);
        get_user_info(initDataUnsafe.user);
    } else {
        console.log("initDataUnsafe или initDataUnsafe.user не определены");
        user_info_block.innerHTML = "Ошибка получения данных пользователя.";
    }
});
