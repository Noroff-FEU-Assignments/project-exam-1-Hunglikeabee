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

        // const getSomethingOnPage = document.querySelector(".welcome-message");

    
        // THE BIG CAROUSEL MAKE IT SPIN!!!

        const carousel = document.querySelector(".index-carousel");
        // const leftButtonCarousel = document.querySelector(".carousel__left-button");
        // const rightButtonCarousel = document.querySelector(".carousel__right-button");
        function makeCarousel(readLengthCarousel) {
            carousel.innerHTML = "";
            for(let i = 0; i < readLengthCarousel; i++) {
                
                carousel.innerHTML += `<div class="carousel-boxes postid-${resultPosts[i].id}"><div>${resultPosts[i].title.rendered}</div>
                                       <div class="post-image id${resultPosts[i].id}" style="background-image: url(${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})"></div`;
                                       if(`${resultPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}` === undefined) {
                                           continue;
                                       }
            }
        }
        



   

 

        function setCarouselWidth(checkWidthBrowser) {
            if(checkWidthBrowser > 800) {
                var widthNumber = 4;
                makeCarousel(widthNumber);
            }
            else if (checkWidthBrowser <= 800 && checkWidthBrowser > 650) {
                var widthNumber = 3;
                makeCarousel(widthNumber);
            }
            else if (checkWidthBrowser <= 650 && checkWidthBrowser > 500) {
                var widthNumber = 2;
                makeCarousel(widthNumber);
            }
            else if (checkWidthBrowser <= 500) {
                var widthNumber = 1;
                makeCarousel(widthNumber);
            }
        }

     
        console.log(document.body.offsetWidth);
        console.log(window.matchMedia)
        
        var checkWidthBrowser = window.matchMedia;
        setCarouselWidth(checkWidthBrowser);
        // checkWidthBrowser.addListener(setCarouselWidth);
        console.log(checkWidthBrowser)
        


        // function changePostLinks(theCheck) {
        //     if (theCheck.matches) {
        //        makeCarousel(theCheck.length)
                
        //     }
        //     console.log(theCheck);
        // }



        // var oneCarousel = window.matchMedia("(max-width: 500px)");
        // var twoCarousel = window.matchMedia("(max-width: 650px)");
        // var threeCarousel = window.matchMedia("(max-width: 800px)");
        // var fourCarousel = window.matchMedia("(min-width: 801px)")

        // changePostLinks(oneCarousel);
        // changePostLinks(twoCarousel);
        // changePostLinks(threeCarousel);
        // changePostLinks(fourCarousel);
        // oneCarousel.addListener(changePostLinks);
        // twoCarousel.addListener(changePostLinks);
        // threeCarousel.addListener(changePostLinks);
        // fourCarousel.addListener(changePostLinks);


        // function checkWidthScreen(widthScreen) {
        //     if (widthScreen.media = "min-width: 801p") {
        //         var widthNumber = 4;
        //         makeCarousel(widthNumber);
        //     }
        //     else if (widthScreen.media = "max-width: 800px") {
        //         var widthNumber = 3;
        //         makeCarousel(widthNumber);
        //     }
        //     console.log(widthScreen)
        // }
    

        // var widthScreenMin = window.matchMedia("(min-width: 801px)");
        // var widthScreen800 = window.matchMedia("(max-width: 800px)");
        // var widthScreen650 = window.matchMedia("(max-width: 650px)");
        // var widthScreen500 = window.matchMedia("(max-width: 500px)");
        // checkWidthScreen(widthScreen800);
        // checkWidthScreen(widthScreen650);
        // checkWidthScreen(widthScreen500);
        // checkWidthScreen(widthScreenMin);
        // widthScreen800.addListener(checkWidthScreen);
        // widthScreen650.addListener(checkWidthScreen);
        // widthScreen500.addListener(checkWidthScreen);
        // widthScreenMin.addListener(checkWidthScreen);





        // function checkIt(listenerCheck) {
        //     if (window.matchMedia("(min-width: 801px)")) {
        //         var widthNumber = 4;
        //         makeCarousel(widthNumber);
        //     }
        //     else if (window.matchMedia("(max-width: 800px)")) {
        //         var widthNumber = 3;
        //         makeCarousel(widthNumber);
        //     }
        //     else if (window.matchMedia("(max-width: 650px)")) {
        //         var widthNumber = 2;
        //         makeCarousel(widthNumber);
        //     }
        //     else if (window.matchMedia("(max-width: 500px)")) {
        //         var widthNumber = 1;
        //         makeCarousel(widthNumber);
        //     }

        // }
        // // checkIt();
        // console.log("Hey " + window.matchMedia(""))
        // var theCheck = window.matchMedia("");

        // theCheck.addListener(checkIt);
        // console.log(theCheck);

        // function checkWidthMin(widthScreenMin) {
        //     if(widthScreenMin.matches) {
        //         var widthNumber = 4;
        //         makeCarousel(widthNumber);
        //     }  
        // }
        
        // function checkWidth500(widthScreen500) {
        //     if(widthScreen500.matches) {
        //         var widthNumber = 1;
        //         makeCarousel(widthNumber);
        //     }
        //     else {
        //         var widthNumber = 2;
        //         makeCarousel(widthNumber);
        //     }
        // }

        // function checkWidth650(widthScreen650) {
        //     if(widthScreen650.matches) {
        //         var widthNumber = 2;
        //         makeCarousel(widthNumber);
        //     }
        //     else {
        //         var widthNumber = 3;
        //         makeCarousel(widthNumber);
        //     }
        // }

        // function checkWidth800(widthScreen800) {
        //     if(widthScreen800.matches) {
        //         var widthNumber = 3;
        //         makeCarousel(widthNumber);
        //     }
        //     else {
        //         var widthNumber = 4;
        //         makeCarousel(widthNumber);
        //     }
        // }
        
        // var widthScreenMin = window.matchMedia("(min-width: 801px)");
        // var widthScreen800 = window.matchMedia("(max-width: 800px)");
        // var widthScreen650 = window.matchMedia("(max-width: 650px)");
        // var widthScreen500 = window.matchMedia("(max-width: 500px)");
        // checkWidthMin(widthScreenMin);
        // checkWidth800(widthScreen800);
        // checkWidth650(widthScreen650);
        // checkWidth500(widthScreen500);
        // widthScreen800.addListener(checkWidth800);
        // widthScreen650.addListener(checkWidth650);
        // widthScreen500.addListener(checkWidth500);
        // widthScreenMin.addListener(checkWidthMin);
      



        console.log(resultPosts[0]._embedded[`wp:term`][1][0].name)
    
    }
    catch(error) {
        console.log("An error occurred " + error)
    }
};

getMyBlog();



