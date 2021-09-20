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

fullName.addEventListener("focusout", () => {
    checkButton();
    checkName();
});

email.addEventListener("focusout", () => {
    checkButton();
    checkEmail();
});

subject.addEventListener("focusout", () => {
    checkButton();
    checkSubject();
});

textArea.addEventListener("focusout", () => {
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
};

function checkButton() {
    if(checkForm(fullName.value, 5) && checkForm(subject.value, 15) && checkForm(textArea.value, 25) && validateEmail(email.value)) {
        button.disabled = false;
    }
    else {
        message.innerHTML = "";
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

async function validateForm(event) {
    event.preventDefault();
    message.style.display = "grid";
    message.innerHTML = "Message sendt!"

    const commentsAPI = `https://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/contact-form-7/v1/contact-forms/195/feedback`;
    
    const formData = event.target;
    const body = new FormData(formData);
    const options = {
        method: "POST",
        body
    }
    
    try {
        const getComments = await fetch(commentsAPI, options);
        getComments;
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
    
    form.reset();
    button.disabled = "true";
};

form.addEventListener("submit", validateForm);