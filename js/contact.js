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



/* Check contact form */

const fulleNameLength = 5;
const subjectLength = 15;
const textAreaLength = 25;


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

fullName.addEventListener("focusout", () => {
    checkButton();
    checkFocusOutName();
});

email.addEventListener("focusout", () => {
    checkButton();
    checkFocusOutEmail();
});

subject.addEventListener("focusout", () => {
    checkButton();
    checkFocusOutSubject();
});

textArea.addEventListener("focusout", () => {
    checkButton();
    checkFocusOutTextArea();
});

function checkButton() {
    if(checkForm(fullName.value, fulleNameLength) && checkForm(subject.value, subjectLength) && checkForm(textArea.value, textAreaLength) && validateEmail(email.value)) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
        message.style.display = "none";
    }

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
    button.disabled = true;
};

form.addEventListener("submit", validateForm);