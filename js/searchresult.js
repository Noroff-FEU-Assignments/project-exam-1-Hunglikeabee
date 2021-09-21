const getParameter = document.location.search;
const theParameter = new URLSearchParams(getParameter);
const searchQuery = theParameter.get("search")

const postsAPI = `https://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100&search=${searchQuery}`;



async function getMyBlog() {
    try {

        const fetchPosts = await fetch(postsAPI);
        const resultPosts = await fetchPosts.json();

        const searchContainer = document.querySelector(".search-result");

        const searchParameter = document.querySelector(".search-parameter");


        console.log(resultPosts)
        if(resultPosts.length === 0) {
            searchParameter.innerHTML = `Could not find any blogs matching your search: <p class="search-error">${searchQuery}</p>`
        }
        else {
            searchParameter.innerHTML = `<h1>Search result for:</h1> <h2>"${searchQuery}"</h2>`
            searchContainer.innerHTML = "";
            for(let i = 0; i < resultPosts.length; i++) {

                for(let j = 0; j < resultPosts.length; j++) {
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
                        searchContainer.innerHTML += `<a href="post.html?id=${resultPosts[j].id}">
                                                        <div class="posts postid-${resultPosts[j].id}">
                                                        <div class="title">${resultPosts[j].title.rendered}</div>
                                                        <div class="posts-image" style="background-image: url(${resultPosts[j]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div>
                                                        <div class="time-dif">
                                                            <div>Time used: ${timeDice}</div>
                                                            <div>Difficulty: ${difficultyDice}</div>
                                                        </div>${resultPosts[j].excerpt.rendered}</div></a>
                                                        <div class="divider-line"></div>`;
                
    
                }
    
            }
        }        
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
}

getMyBlog();