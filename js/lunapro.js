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
