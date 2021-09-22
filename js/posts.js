const postsAPI = `https://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;

async function getMyBlog() {
    try {
        const fetchPosts = await fetch(postsAPI);
        const resultPosts = await fetchPosts.json();

        const pageLengthVariable = 4;
        var countPages = 0;
        var lengthPages = 4;
    

        const posts = document.querySelector(".posts__container");

        function makePostPage(countPages, lengthPages) {
            posts.innerHTML = "";
            for(let i = countPages; i < lengthPages; i++) {
                let valueDif = resultPosts[i]._embedded["wp:term"][1][0].name;
                let resultDif = parseInt(valueDif[3]);

                let difficultyDice;
                switch(resultDif) {
                    case 6:
                        difficultyDice = `<i class="fas fa-dice-six"></i>`;
                        break;
                    case 5:
                        difficultyDice = `<i class="fas fa-dice-five"></i>`;
                        break;
                    case 4:
                        difficultyDice = `<i class="fas fa-dice-four"></i>`;
                        break;
                    case 3:
                        difficultyDice = `<i class="fas fa-dice-four"></i>`;
                        break;
                    case 2:
                        difficultyDice = `<i class="fas fa-dice-two"></i>`;
                        break;
                    case 1:
                        difficultyDice = `<i class="fas fa-dice-one"></i>`;
                        break;
                    default:
                        difficultyDice = `<i class="fas fa-dice-d6"></i>`;
                }

                let valueTime = resultPosts[i]._embedded["wp:term"][1][1].name;
                let resultTime = parseInt(valueTime[4]);

                let timeDice;
                switch(resultTime) {
                    case 6:
                        timeDice = `<i class="fas fa-dice-six"></i>`;
                        break;
                    case 5:
                        timeDice = `<i class="fas fa-dice-five"></i>`;
                        break;
                    case 4:
                        timeDice = `<i class="fas fa-dice-four"></i>`;
                        break;
                    case 3:
                        timeDice = `<i class="fas fa-dice-four"></i>`;
                        break;
                    case 2:
                        timeDice = `<i class="fas fa-dice-two"></i>`;
                        break;
                    case 1:
                        timeDice = `<i class="fas fa-dice-one"></i>`;
                        break;
                    default:
                        timeDice = `<i class="fas fa-dice-d6"></i>`;
                }
                
                posts.innerHTML += `<a href="post.html?id=${resultPosts[i].id}">
                                    <div class="posts postid-${resultPosts[i].id}">
                                    <h2 class="posts-title">${resultPosts[i].title.rendered}</h2>
                                    <div class="posts-image" style="background-image: url(${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div>
                                    <div class="time-dif">
                                        <div aria-hidden="true">Time used: ${timeDice}</div>
                                        <div aria-hidden="true">Difficulty: ${difficultyDice}</div>
                                    </div><div class="text-posts" aria-hidden="true">${resultPosts[i].excerpt.rendered}</div></div></a>
                                    <div class="divider-line"></div>`;
    
            }
        }
        
        makePostPage(countPages, lengthPages);
                


        //Sorting things out

        const sortBy = document.querySelector("#sortby")
        sortBy.addEventListener("change", selectSort);

        function selectSort() {
            if (sortBy.value == "difficulty") {
                function fixOrder(a, b) {
                    if (a._embedded["wp:term"][1][0].name < b._embedded["wp:term"][1][0].name){
                    return -1;
                    }
                    if (a._embedded["wp:term"][1][0].name > b._embedded["wp:term"][1][0].name){
                    return 1;
                    }
                    return 0;
                }
                resultPosts.sort(fixOrder);
                makePostPage(countPages, lengthPages);
            }
            if (sortBy.value == "time") {
                function fixOrder(a, b) {
                    if (a._embedded["wp:term"][1][1].name < b._embedded["wp:term"][1][1].name){
                    return -1;
                    }
                    if (a._embedded["wp:term"][1][1].name > b._embedded["wp:term"][1][1].name){
                    return 1;
                    }
                    return 0;
                }
                resultPosts.sort(fixOrder);
                makePostPage(countPages, lengthPages);
            }
        }


        /* Load more button */

        const nextButton = document.querySelector(".posts__button-more");
        nextButton.addEventListener("click", getNextPages);
        
        function getNextPages() {
            lengthPages = lengthPages + pageLengthVariable;
            if (lengthPages >= resultPosts.length) {
                lengthPages = resultPosts.length;
                nextButton.style.display = "none";
            }
            makePostPage(countPages, lengthPages);
        }
    
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();