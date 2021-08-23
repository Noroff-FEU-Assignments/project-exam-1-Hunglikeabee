const CORSFIX = `https://noroffcors.herokuapp.com/`;
const API = `http://hunglikeabee.one/project-exam-1-Hunglikeabee/wp-json/wp/v2/posts`;

async function getMyBlog() {
    try {
        const fetchDB = await fetch(CORSFIX + API);
        const result = await fetchDB.json();
        console.log(result);
    }
    catch(error) {
        console.log("An error occurred" + error)
    }
};

getMyBlog()