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

function validateForm(event) {
    event.preventDefault();
    message.style.display = "grid";
    message.innerHTML = "Message sendt!"

    const nameForm = fullName.trim().text;
    const emailForm = email.trim().text;
    const subjectForm = subject.trim().text;
    const textForm = textArea.trim().text;

    sendTheForm(nameForm, emailForm, subjectForm, textForm);
    
    form.reset();
    button.disabled = "true";
};

form.addEventListener("click", sendTheForm);
form.addEventListener("submit", validateForm);

const CORSFIX = `https://noroffcors.herokuapp.com/`;
const contactAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/contact-form-7/v1/contact-forms/`;

async function sendTheForm(name, email, subject, text) {
    
    // const formData = JSON.stringify({name: name, email: email, text: text});


    // const contactForm = {
    //     method: "POST",
    //     body: formInfo
    // }
    
    try {
        const getContact = await fetch(CORSFIX + contactAPI);
        const resultContact = await getContact.json();
        console.log(resultContact);

        console.log(contactForm)

    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

