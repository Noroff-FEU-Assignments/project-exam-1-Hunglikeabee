const fullName = document.querySelector("#contact__form-fullname");
const email = document.querySelector("#contact__form-email");
const subject = document.querySelector("#contact__form-subject");
const textArea = document.querySelector("#contact__form-textarea");
const form = document.querySelector("#contact__form");
const button = document.querySelector(".contact__form-button");
const message = document.querySelector(".contact__form-message");

const fullNameError = document.querySelector(".fullname-error");
const emailError = document.querySelector(".email-error");
const subjectError = document.querySelector(".subject-error");
const textAreaError = document.querySelector(".textarea-error");

fullName.addEventListener("keyup", () => {
    checkButton();
    checkName();
});

email.addEventListener("keyup", () => {
    checkButton();
    checkEmail();
});

subject.addEventListener("keyup", () => {
    checkButton();
    checkSubject();
});

textArea.addEventListener("keyup", () => {
    checkButton();
    checkTextArea();
});

function checkName() {
    if(checkForm(fullName.value, 5)) {
        fullNameError.style.display = "none";
    }
    else {
        fullNameError.style.display = "block";
    }
};

function checkEmail() {
    if(validateEmail(email.value)) {
        emailError.style.display = "none";
    }
    else {
        emailError.style.display = "block";
    }
};

function checkSubject() {
    if(checkForm(subject.value, 15)) {
        subjectError.style.display = "none";
    }
    else {
        subjectError.style.display = "block";
    }
};

function checkTextArea() {
    if(checkForm(textArea.value, 25)) {
        textAreaError.style.display = "none";
    }
    else {
        textAreaError.style.display = "block";
    }
}

function checkButton() {
    if(checkForm(fullName.value, 5) && checkForm(subject.value, 15) && checkForm(textArea.value, 25) && validateEmail(email.value)) {
        button.disabled = false;
    }
    else {
        message.innerHTML = "";
        button.disabled = true;
    }

};

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

form.addEventListener("submit", validateForm);