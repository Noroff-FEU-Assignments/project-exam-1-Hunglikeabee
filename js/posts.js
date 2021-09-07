const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;
const mediaAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/media?per_page=100`;

async function getMyBlog() {
    try {
        const fetchPosts = await fetch(CORSFIX + postsAPI);
        const fetchMedia = await fetch(CORSFIX + mediaAPI);
        const resultPosts = await fetchPosts.json();
        const resultMedia = await fetchMedia.json();
        console.log(resultPosts);
        console.log(resultMedia);


        const pageLengthVariable = 4;
        var countPages = 0;
        var lengthPages = 4;
    

        const posts = document.querySelector(".posts__container");

        function makePostPage(countPages, lengthPages) {
            posts.innerHTML = "";
            for(let i = countPages; i < lengthPages; i++) {
                
                posts.innerHTML += `<div class="carousel-boxes postid-${resultPosts[i].id}"><div>${resultPosts[i].title.rendered}</div>`;
                
                const postContainer = document.querySelector(`.postid-${resultPosts[i].id}`);
    
                for(let j = 0; j < resultMedia.length; j++) {
                    if(resultMedia[j].post === resultPosts[i].id) {
                        postContainer.innerHTML += `<button class="post-image"><img class="id${resultMedia[j].post}" src="${resultMedia[j].media_details.sizes.large.source_url}"></button>`;
                    }
                   
                    
                }
    
                posts.innerHTML += `${resultPosts[i].excerpt.rendered}`   
            }
        }
        
        makePostPage(countPages, lengthPages);


        /* Modal attempt */

        const postImages = document.querySelectorAll(".post-image");

        postImages.forEach(function(imagesDoes) {
                imagesDoes.addEventListener("click", displayModal)
        });

        function displayModal() {
            console.log("hey")
        }
                



        /* Previous and Next buttons for posts */

        const nextButton = document.querySelector(".posts__get-next");
        const previousButton = document.querySelector(".posts__get-previous");

        nextButton.addEventListener("click", getNextPages);
        previousButton.addEventListener("click", getPreviousPages);

        function getNextPages() {
            countPages = countPages + pageLengthVariable;
            lengthPages = lengthPages + pageLengthVariable;
            if (lengthPages > resultPosts.length) {
                lengthPages = resultPosts.length;
                countPages = resultPosts.length - pageLengthVariable;
            }
            makePostPage(countPages, lengthPages);
        }

        function getPreviousPages() {
            countPages = countPages - pageLengthVariable;
            lengthPages = lengthPages - pageLengthVariable;
            if (countPages < 0) {
                lengthPages = pageLengthVariable;
                countPages = 0;
            }
            makePostPage(countPages, lengthPages);
        }


    
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();