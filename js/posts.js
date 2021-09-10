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
                let valueDif = resultPosts[i]._embedded["wp:term"][1][0].name;
                let resultDif = valueDif[3]; 

                let valueTime = resultPosts[i]._embedded["wp:term"][1][1].name;
                let resultTime = valueTime[4];
                
                posts.innerHTML += `<a href="post.html?id=${resultPosts[i].id}">
                                    <div class="posts postid-${resultPosts[i].id}">
                                    <div class="title">${resultPosts[i].title.rendered}</div>
                                    <div class="posts-image" style="background-image: url(${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div>
                                    <div class="time-dif">
                                        <div>Time used: ${resultTime} of 5</div>
                                        <div>Difficulty: ${resultDif} of 5</div>
                                    </div>${resultPosts[i].excerpt.rendered}</div></a>
                                    <div class="devider-line"></div>`;
    
            }
        }
        
        makePostPage(countPages, lengthPages);
                


        //Sorting things out

        const sortBy = document.querySelector("#sortby")
        sortBy.addEventListener("click", selectSort)

        function selectSort() {
            if (sortBy.value == "difficulty") {
                function fixOrder( a, b ) {
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
                function fixOrder( a, b ) {
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