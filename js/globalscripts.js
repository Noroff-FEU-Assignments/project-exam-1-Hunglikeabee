/* Search bar function */

const searchText = document.querySelector(".search-text");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
    let valueInput = searchText.value.trim();
    window.location.href = `searchresult.html?search=${valueInput}`
});
searchText.addEventListener("keyup", (e) => {
    let pressedKey = e.key;
    let valueInput = searchText.value;
    if (pressedKey === "Enter") {
        window.location.href = `searchresult.html?search=${valueInput}`
    }
});



/* Scroll event navigation */
const hamburgerMenu = document.querySelector(".hamburger__dropdown-menu")
const headerMenu = document.querySelector(".header-menu")

function scrollFunction() {
    const scroll = window.scrollY;
    
    if (scroll > 100) {
        hamburgerMenu.classList.add("scrolled-hamburger")
        headerMenu.classList.add("scrolled-menu")
        document.body.classList.add("body-padding")

    }
    else  if ( scroll < 40){
        hamburgerMenu.classList.remove("scrolled-hamburger")
        headerMenu.classList.remove("scrolled-menu")
        document.body.classList.remove("body-padding")
    }
}
document.addEventListener("scroll", scrollFunction);


/* Dice on blogs */
function dicePicker(diceInput) {
    switch(diceInput) {
        case 6:
            diceToShow = `<i class="fas fa-dice-six"></i>`;
            break;
        case 5:
            diceToShow = `<i class="fas fa-dice-five"></i>`;
            break;
        case 4:
            diceToShow = `<i class="fas fa-dice-four"></i>`;
            break;
        case 3:
            diceToShow = `<i class="fas fa-dice-three"></i>`;
            break;
        case 2:
            diceToShow = `<i class="fas fa-dice-two"></i>`;
            break;
        case 1:
            diceToShow = `<i class="fas fa-dice-one"></i>`;
            break;
        default:
            diceToShow = `<i class="fas fa-dice-d6"></i>`;
    }
    return diceToShow;
}


/* Form validation universal functions */

function checkForm(value, length) {
    if(value.trim().length > length) {
        return true;
    }
    else {
        return false;
    }
};

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
};

function checkName() {
    if(checkForm(fullName.value, fulleNameLength)) {
        fullNameError.style.display = "none";
    }
};

function checkEmail() {
    if(validateEmail(email.value)) {
        emailError.style.display = "none";
    }
};

function checkSubject() {
    if(checkForm(subject.value, subjectLength)) {
        subjectError.style.display = "none";
    }
};

function checkTextArea() {
    if(checkForm(textArea.value, textAreaLength)) {
        textAreaError.style.display = "none";
    }
};

function checkFocusOutName() {
    if(checkForm(fullName.value, fulleNameLength)) {
        fullNameError.style.display = "none";
    }
    else {
        fullNameError.style.display = "block";
    }
};

function checkFocusOutEmail() {
    if(validateEmail(email.value)) {
        emailError.style.display = "none";
    }
    else {
        emailError.style.display = "block";
    }
};

function checkFocusOutSubject() {
    if(checkForm(subject.value, subjectLength)) {
        subjectError.style.display = "none";
    }
    else {
        subjectError.style.display = "block";
    }
};

function checkFocusOutTextArea() {
    if(checkForm(textArea.value, textAreaLength)) {
        textAreaError.style.display = "none";
    }
    else {
        textAreaError.style.display = "block";
    }
};