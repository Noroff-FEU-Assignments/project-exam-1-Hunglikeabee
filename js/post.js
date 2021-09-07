const CORSFIX = `https://noroffcors.herokuapp.com/`;
const postsAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts?_embed&per_page=100`;
const mediaAPI = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/media?per_page=100`;

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
        const resultPosts = await fetchPosts.json();
        const resultMedia = await fetchMedia.json();
        console.log(resultPosts);
        console.log(resultMedia);
        

        for (let i = 0; i < resultPosts.length; i++) {
            if (resultPosts[i].id == id) {
                document.title = resultPosts[i].title.rendered;

                singlePost.innerHTML = `<div class="post postid-${resultPosts[i].id}"><div>${resultPosts[i].title.rendered}</div>${resultPosts[i].excerpt.rendered}`; 

                const postContainer = document.querySelector(`.postid-${resultPosts[i].id}`);
    
                for(let j = 0; j < resultMedia.length; j++) {
                    if(resultMedia[j].post === resultPosts[i].id) {
                        postContainer.innerHTML += `<img class="id${resultMedia[j].post}" src="${resultMedia[j].media_details.sizes.large.source_url}">
                                                    ${resultMedia[j].caption.rendered}`;
                    }
            }
        }
        }
    }
    catch(error) {
        console.log("An error occurred" + error)
    }
};

getMyBlog();