const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;
const pagesAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/pages?_embed&per_page=100`;
var postsArray = [];

async function getMyBlog() {
    try {

        // Get the API and create welcome message

        const fetchPosts = await fetch(CORSFIX + postsAPI);
        const fetchPages = await fetch(CORSFIX + pagesAPI);
        const resultPosts = await fetchPosts.json();
        const resultPages = await fetchPages.json();

        const makeFeelWelcome = document.querySelector(".welcome-message");

        makeFeelWelcome.innerHTML = `<h1 class="welcome-title">${resultPages[0].title.rendered}</h1>
                                        <div class="welcome-paragraph">${resultPages[0].content.rendered}</div>`

        
        
        
        // Search bar function

        const searchText = document.querySelector(".search-text");
        const searchButton = document.querySelector(".search-button");

       

        searchButton.addEventListener("click", searchFunction)

        function searchFunction() {
            let theSearchText = searchText.value.trim().toUpperCase();

            postsArray.push(searchText.value);

            for(i = 0; i < resultPosts.length; i++) {
                var checkTitle = resultPosts[i].title.rendered.trim().toUpperCase();
                var checkText = resultPosts[i].excerpt.rendered.trim().toUpperCase();
                if (checkTitle.includes(`${theSearchText}`) || checkText.includes(`${theSearchText}`)) {
                    const postsToShow = resultPosts[i].id;
                    postsArray.push(postsToShow);
                    localStorage.setItem("postList", JSON.stringify(postsArray));
                    window.location.href = "/searchresult.html"

                }
                else {
                    window.location.href = "/searchresult.html"
                }
            }
        }




        // THE BIG CAROUSEL MAKE IT SPIN!!!

        const carousel = document.querySelector(".index-carousel");
        const leftButtonCarousel = document.querySelector(".carousel__left-button");
        const rightButtonCarousel = document.querySelector(".carousel__right-button");
        function makeCarousel(countPages, readLengthCarousel) {
            carousel.innerHTML = "";
            for(let i = countPages; i < readLengthCarousel; i++) {
                let valueDif = resultPosts[i]._embedded["wp:term"][1][0].name;
                let resultDif = valueDif[3]; 

                let valueTime = resultPosts[i]._embedded["wp:term"][1][1].name;
                let resultTime = valueTime[4];

                carousel.innerHTML += `<a href="post.html?id=${resultPosts[i].id}"><div class="carousel-boxes postid-${resultPosts[i].id}">
                                            <div class="carousel__text">${resultPosts[i].title.rendered}</div>
                                            <div class="post-image id${resultPosts[i].id}" style="background-image: url(${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div>
                                            <div>Time used: ${resultDif} of 5</div>
                                            <div>Difficulty: ${resultTime} of 5</div>
                                         </div>
                                       </a>`;
                                       if(`${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}` === undefined) {
                                           continue;
                                       }
            }
        }
        

        leftButtonCarousel.addEventListener("click", previousCarousel);
        rightButtonCarousel.addEventListener("click", nextCarousel);

        function previousCarousel() {
            if (countPages > 0) {
                countPages = countPages - 1;
            }
            else {
                countPages = 0;
            }
            if (lengthCarousel <= widthNumber) {
                lengthCarousel = widthNumber;
            }
            else {
                lengthCarousel = lengthCarousel - 1;
            }

            makeCarousel(countPages, lengthCarousel);
            
        }

        function nextCarousel() {

            countPages = countPages + 1;

            if (countPages >= resultPosts.length - widthNumber) {
                countPages = resultPosts.length - widthNumber;
            };

            lengthCarousel = countPages + widthNumber;

            if(lengthCarousel >= resultPosts.length) {
                lengthCarousel = resultPosts.length  
            }

            makeCarousel(countPages, lengthCarousel);
            
        }

        var checkScreenWidth = window.innerWidth;
        function checkWidthScreen(checkScreenWidth) {
            if (checkScreenWidth >= 850) {
                widthNumber = 4;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else if (checkScreenWidth > 700 && checkScreenWidth < 850) {
                widthNumber = 3;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else if (checkScreenWidth > 550 && checkScreenWidth <= 700) {
                widthNumber = 2;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
            else {
                widthNumber = 1;
                countPages = 0;
                makeCarousel(countPages, widthNumber);
            }
        }

        checkWidthScreen(checkScreenWidth);

        var countPages = 0;
        var widthNumber;
        var lengthCarousel = widthNumber;

        window.addEventListener("resize", checkChangesScreen);

        function checkChangesScreen() {
            widthOutput = window.innerWidth;
            checkWidthScreen(widthOutput)
        };
    
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();



