const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;



async function getMyBlog() {
    try {

        const fetchPosts = await fetch(CORSFIX + postsAPI);
        const resultPosts = await fetchPosts.json();

        const searchContainer = document.querySelector(".search-result");
        const postItems = JSON.parse(localStorage.getItem("postList"));

        const searchParameter = document.querySelector(".search-parameter");



        if(postItems == null) {
            searchContainer.innerHTML = `Could not find any blogs matching your search.`
        }
        else {
            searchParameter.innerHTML = `<h2>Search result for: "${postItems[0]}"</h2>`
            searchContainer.innerHTML = "";
            for(let i = 0; i < postItems.length; i++) {

                console.log(postItems)
                for(let j = 0; j < resultPosts.length; j++) {
                    if(postItems[i] === resultPosts[j].id) {
                        let valueDif = resultPosts[j]._embedded["wp:term"][1][0].name;
                        let resultDif = valueDif[3]; 
        
                        let valueTime = resultPosts[j]._embedded["wp:term"][1][1].name;
                        let resultTime = valueTime[4];
                        searchContainer.innerHTML += `<a href="post.html?id=${resultPosts[j].id}">
                                                        <div class="posts postid-${resultPosts[j].id}">
                                                        <div class="title">${resultPosts[j].title.rendered}</div>
                                                        <div class="posts-image" style="background-image: url(${resultPosts[j]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div>
                                                        <div class="time-dif">
                                                            <div>Time used: ${resultTime} of 5</div>
                                                            <div>Difficulty: ${resultDif} of 5</div>
                                                        </div>${resultPosts[j].excerpt.rendered}</div></a>
                                                        <div class="divider-line"></div>`;
                }
    
                }
    
            }
        }
        
        localStorage.clear();
        

    }
    catch(error) {
        console.log("An error occurred " + error)
    }
}

getMyBlog();