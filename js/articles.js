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

// Dark mode

let styleMode = localStorage.getItem('styleMode');



const ChangeTheme = (isChecked) => {
    if (isChecked) {
        document.body.setAttribute('dark', '')
    } else{
        document.body.removeAttribute('dark')
    }
}



//______________________________________________________________________________________________________
// Swiper

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    mousewheel: true,
    keyboard: true,
});