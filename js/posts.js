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
                
                posts.innerHTML += `<a href="post.html?id=${resultPosts[i].id}"><div class="carousel-boxes postid-${resultPosts[i].id}"><div>${resultPosts[i].title.rendered}</div>${resultPosts[i].excerpt.rendered}</a>`;
                const postContainer = document.querySelector(`.postid-${resultPosts[i].id}`);
    
                for(let j = 0; j < resultMedia.length; j++) {
                    if(resultMedia[j].post === resultPosts[i].id) {
                        postContainer.innerHTML += `<button class="post-image"><img class="id${resultMedia[j].post}" src="${resultMedia[j].media_details.sizes.large.source_url}"></button>`;
                    }

                }
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
                


        /* Load more button */

        const nextButton = document.querySelector(".posts__get-next");
        nextButton.addEventListener("click", getNextPages);
        
        function getNextPages() {
            lengthPages = lengthPages + pageLengthVariable;
            if (lengthPages > resultPosts.length) {
                lengthPages = resultPosts.length;
            }
            makePostPage(countPages, lengthPages);
        }
    
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();