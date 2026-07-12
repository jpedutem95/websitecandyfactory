document.addEventListener("DOMContentLoaded", initHome);

// ==========================
// Language Menu
// ==========================

const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

if (languageBtn && languageMenu) {

    languageBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        languageMenu.classList.toggle("show");
    });

    document.addEventListener("click", function () {
        languageMenu.classList.remove("show");
    });

}

// ==========================
// Reusable Slider Function
// ==========================

function createSlider(slideSelector, prevSelector, nextSelector) {

    const slides = document.querySelectorAll(slideSelector);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    // Stop if slider doesn't exist
    if (!slides.length || !prevBtn || !nextBtn) {
        return;
    }

    let current = 0;

    function showSlide(index) {

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    nextBtn.addEventListener("click", function () {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);

    });

    prevBtn.addEventListener("click", function () {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        showSlide(current);

    });

    setInterval(function () {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current);

    }, 5000);

}

// ==========================
// Initialize Page
// ==========================

function initHome() {

    // Promotion Slider
    createSlider(".slide", ".prev", ".next");

    // Shop Banner Slider
    createSlider(".shop-slide", ".shop-prev", ".shop-next");

}


