        /* Search bar function */

        const searchText = document.querySelector(".search-text");
        const searchButton = document.querySelector(".search-button");

        searchButton.addEventListener("click", () => {
            let valueInput = searchText.value.trim();
            window.location.href = `searchresult.html?search=${valueInput}`
        });
        searchText.addEventListener("keyup", (e) => {
            let pressedKey = e.key;
            console.log(pressedKey);
            let valueInput = searchText.value;
            console.log(valueInput);
            if (pressedKey === "Enter") {
                window.location.href = `searchresult.html?search=${valueInput}`
            }
        });