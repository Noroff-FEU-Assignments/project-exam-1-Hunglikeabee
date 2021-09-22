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
    
    if (scroll > 130) {
        headerMenu.classList.add("scrolled-menu")

    }
    else  if ( scroll < 30){
        headerMenu.classList.remove("scrolled-menu")
    }
}

document.addEventListener("scroll", scrollFunction);