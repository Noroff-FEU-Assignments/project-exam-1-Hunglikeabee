const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;
const mediaAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/media?per_page=100`;
const commentsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/comments?per_page=100`;

const getParameter = document.location.search;
const theParameter = new URLSearchParams(getParameter);
const id = theParameter.get("id")

const singlePost = document.querySelector(".single-post");

if (id === null) {
    location.href = "/index.html";
}

async function getMyBlog() {  
    try {

        const fetchPosts = await fetch(CORSFIX + postsAPI);
        const fetchMedia = await fetch(CORSFIX + mediaAPI);
        const getComments = await fetch(CORSFIX + commentsAPI);
        const resultPosts = await fetchPosts.json();
        const resultMedia = await fetchMedia.json();
        const resultComments = await getComments.json();
        console.log(resultPosts);
        console.log(resultMedia);
        

        /* Fix order or images from wordpress based on title number */

        function fixOrder(a, b) {
            if (a.title.rendered < b.title.rendered){
            return -1;
            }
            if (a.title.rendered > b.title.rendered){
            return 1;
            }
            return 0;
        }
        resultMedia.sort(fixOrder);
            

        for (let i = 0; i < resultPosts.length; i++) {
            if (resultPosts[i].id == id) {
                document.title = resultPosts[i].title.rendered;

                singlePost.innerHTML = `<div class="post postid-${resultPosts[i].id}"><div class="title"><p>${resultPosts[i].title.rendered}</p</div></div><div class="content-text">${resultPosts[i].excerpt.rendered}</div>`; 

                const postContainer = document.querySelector(`.postid-${resultPosts[i].id}`);
    
                for(let j = 0; j < resultMedia.length; j++) {
                    if(resultMedia[j].post === resultPosts[i].id) {
                        postContainer.innerHTML += `<div class="id${resultMedia[j].post} modal" style="background-image: url(${resultMedia[j].media_details.sizes.large.source_url})"></div>
                                                    <div class="caption">${resultMedia[j].caption.rendered}</div>`;
                    }
            }
        }
        }


        const commentContainer = document.querySelector(".comment__container")
        function loadComments() {
            commentContainer.innerHTML = "";
            for (let m = 0; m < 5; m++) {
                if(resultComments[m].post == id) {
                    commentContainer.innerHTML += `<div class="comment ${resultComments[m].id}">
                                                    <h3 class="author-name">${resultComments[m].author_name}</h3>
                                                    <div class="post-date">${resultComments[m].date}</div>
                                                    ${resultComments[m].content.rendered}
                                                    </div>`
                }
            }
        }
        loadComments();





                /* Modal attempt */


                const modalContainer = document.querySelector(".modal__container");
                const postImages = document.querySelectorAll(".modal");
                const modalImage = document.querySelector(".modal__image-container");
                const modalClose = document.querySelector(".modal-close");

                postImages.forEach(function(imagesDoes) {
                        imagesDoes.addEventListener("click", displayModal)
                });
        
                function displayModal(event) {
                    console.log(event.target)
                    modalContainer.style.display = "flex";
                    modalImage.innerHTML = `<div class="modal-image" style="${event.target.attributes.style.textContent}"></div>
                    `
                }

                modalClose.addEventListener("click", () => {
                    modalContainer.style.display = "none";
                    modalImage.innerHTML = "";
                });

                window.addEventListener("click", closeModalWindow);

                function closeModalWindow(classClick) {
                    if(classClick.target === modalContainer) {
                        modalContainer.style.display = "none";
                    }
                }


    }
    catch(error) {
        console.log("An error occurred" + error)
    }
};

getMyBlog();





/* Comment form */

const fullName = document.querySelector("#comment__form-fullname");
const textArea = document.querySelector("#comment__form-textarea");

const form = document.querySelector("#comment__form");
const button = document.querySelector(".comment__form-button");
const message = document.querySelector(".comment__form-message");

const fullNameError = document.querySelector(".fullname-error");
const textAreaError = document.querySelector(".textarea-error");

fullName.addEventListener("keyup", () => {
    checkButton();
    checkName();
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

function checkTextArea() {
    if(checkForm(textArea.value, 25)) {
        textAreaError.style.display = "none";
    }
    else {
        textAreaError.style.display = "block";
    }
};

function checkButton() {
    if(checkForm(fullName.value, 5) && checkForm(textArea.value, 25)) {
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

    const nameForm = fullName.value.trim();
    const textForm = textArea.value.trim();

    sendTheForm(id, nameForm, textForm);
    
    form.reset();
    button.disabled = "true";
};

form.addEventListener("submit", validateForm);


async function sendTheForm(post, name, text) {

    const CORSFIX = `https://noroffcors.herokuapp.com/`;
    const commentsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/comments`;
        
    const formData = JSON.stringify({post: post, author_name: name, content: text, type: "comment"});


    const options = {
        method: "POST",
        body: formData,
        headers: {
        "Content-Type": "application/json"
        }
    };
    
    try {
        const getComments = await fetch(CORSFIX + commentsAPI, options);
        getMyBlog();
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};