/* Search bar function */

const searchText = document.querySelector(".search-text");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
    let valueInput = searchText.value.trim();
    window.location.href = `searchresult.html?search=${valueInput}`
});
searchText.addEventListener("keyup", (e) => {
    let pressedKey = e.key;
    let valueInput = searchText.value;
    if (pressedKey === "Enter") {
        window.location.href = `searchresult.html?search=${valueInput}`
    }
});



/* Scroll event navigation */

const headerMenu = document.querySelector(".header-menu")

function scrollFunction() {
    const scroll = window.scrollY;
    
    if (scroll > 100) {
        headerMenu.classList.add("scrolled-menu")
        document.body.classList.add("body-padding")

    }
    else  if ( scroll < 1){
        headerMenu.classList.remove("scrolled-menu")
        document.body.classList.remove("body-padding")
    }
}
document.addEventListener("scroll", scrollFunction);