const slidertransform123 = document.querySelector(".slider-inner123");
const previousbutton1 = document.querySelector(".slider-prev-btn");
const nextbutton1 = document.querySelector(".slider-next-btn");

let currentSlide123 = 0;

function goToSlide(slide1) {
    slidertransform123.style.transform = `translateX(-${slide1 * 100}%)`;
    currentSlide123 = slide1;
}

function nextSlide() {
    console.log("next");
    if (currentSlide123 === 1) {
        goToSlide(0);
    } else {
        goToSlide(currentSlide123 + 1);
    }
}

function prevSlide() {
    console.log("previous");
    if (currentSlide123 === 0) {
        goToSlide(1);
    } else {
        goToSlide(currentSlide123 - 1);
    }
}

nextbutton1.addEventListener("click", nextSlide);
previousbutton1.addEventListener("click", prevSlide);

