// ==========================
// Initialize Page
// ==========================
document.addEventListener("DOMContentLoaded", initHome);

function initHome() {

    // Initialize all sliders
    const sliders = document.querySelectorAll(".slider");

    // Do something once for every item in the collection.
    sliders.forEach(function (slider) {
        createSlider(slider);
    });

}

// Reusable Slider Function
function createSlider(slider) {

    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const pagination = slider.querySelector(".pagination");
    const playPauseBtn = slider.querySelector(".play-pause");

    // Stop if no slides exist
    if (!slides.length) {
        return;
    }

    // This keeps track of which slide is currently active.
    let current = 0;
    // Variable to hold the timer reference
    let slideInterval;

    // Mobile swipe variables
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    // Slider state
    let isHovering = false;
    let isVisible = true;

    // User-controlled pause variable 
    let isManuallyPaused = false;


    // Check whether automatic sliding is allowed
    function shouldAutoSlide() {
        return !isHovering && isVisible && !isManuallyPaused;
    }


    // Automatic Slide Control
    function startAutoSlide() {

        // Do not start if automatic sliding is not allowed
        if (!shouldAutoSlide()) {
            return;
        }

        clearInterval(slideInterval);

        slideInterval = setInterval(function () {

            // Don't change slides unless automatic sliding is allowed
            if (!shouldAutoSlide()) {
                clearInterval(slideInterval);
                return;
            }

            current++;

            if (current >= slides.length) {
                current = 0;
            }

            showSlide(current, "next");

        }, 5000);
    }
    

    // IntersectionObserver
    const observer = new IntersectionObserver(function (entries) {

        isVisible = entries[0].isIntersecting;

        if (isVisible) {

            // Restart automatic sliding when visible
            startAutoSlide();

        }

        else {

            // Stop the timer when completely off-screen
            clearInterval(slideInterval);

        }

    }, {
        threshold: 0
    });

    observer.observe(slider);


    // Lazy Loading Images
    slides.forEach(function (slide, slideNumber) { 

        const image = slide.querySelector("img"); 

        if (image) {

            // Load the first image immediately.
            if (slideNumber === 0) { 
                image.loading = "eager"; 
            }

            // Load the remaining images only when needed. 
            else { 
                image.loading = "lazy"; 
            } 
        } 
    });
   
    // Create Pagination
    if (pagination) {

        slides.forEach(function (slide, slideNumber) {

            const dot = document.createElement("button");

            dot.classList.add("dot");

            // prevents accidental form submission
            dot.type = "button";

            // improves accessibility
            dot.setAttribute(
                "aria-label", 
                `Go to slide ${slideNumber + 1}`
            );

            dot.addEventListener("click", function () {

                if (slideNumber === current) {
                    return;
                }

                if (slideNumber > current) {
                    current = slideNumber;
                    showSlide(current, "next");
                }

                else if (slideNumber < current) {
                    current = slideNumber;
                    showSlide(current, "prev");
                }

                // Only restart if the user has not paused the slideshow. 
                if (!isManuallyPaused) { 
                    startAutoSlide(); 
                }

            });

            pagination.appendChild(dot);

        });

    }


    // Show Slide
    function showSlide(slideNumber, direction) {

        slides.forEach(function (slide) {

            slide.classList.remove(
                "active", 
                "moving-left", 
                "moving-right"
            );

        });

        const activeSlide = slides[slideNumber];

        activeSlide.classList.add("active");

        if (direction === "next") {
            activeSlide.classList.add("moving-left");
        }

        else if (direction === "prev") {
            activeSlide.classList.add("moving-right");
        }


        // Update pagination
        if (pagination) {

            const dots = pagination.querySelectorAll(".dot");

            dots.forEach(function (dot) {
                dot.classList.remove("active");
            });

            dots[slideNumber].classList.add("active");

        }

    }


    // Next Slide
    function navigateNext() {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        showSlide(current, "next");

        // Do not restart automatic sliding 
        // if the user has manually paused it. 
        if (!isManuallyPaused) { 
            startAutoSlide(); 
        }

    }

    // Previous Slide
    function navigatePrev() {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        showSlide(current, "prev");

        // Do not restart automatic sliding 
        // if the user has manually paused it. 
        if (!isManuallyPaused) { 
            startAutoSlide(); 
        }

    }


    // Play / Pause Control 
    function togglePlayPause() { 

        if (!playPauseBtn) {
            return;
        }

        if (isManuallyPaused) { 
            
            // Resume slideshow 
            isManuallyPaused = false; 
            playPauseBtn.textContent = "⏸"; 
            playPauseBtn.setAttribute("aria-label", "Pause slideshow"); 
            playPauseBtn.setAttribute("aria-pressed", "false"); 
            
            startAutoSlide(); 
        } 
        
        else { 
            
            // Permanently pause until the user presses Play 
            isManuallyPaused = true; 
            
            clearInterval(slideInterval); 
            
            playPauseBtn.textContent = "▶"; 
            playPauseBtn.setAttribute("aria-label", "Play slideshow"); 
            playPauseBtn.setAttribute("aria-pressed", "true"); 
        } 
    }


    // Initialize first slide
    showSlide(current);
    // Start automatic sliding
    startAutoSlide();

    // Desktop Hover Controls
    slider.addEventListener("mouseenter", function () {

        isHovering = true;

        clearInterval(slideInterval);

    });

    slider.addEventListener("mouseleave", function () {

        isHovering = false;

        // Only restart if the user has not 
        // manually paused the slideshow. 
        if (!isManuallyPaused) { 
            startAutoSlide(); 
        }

    });

    // Play / Pause Button
    if (playPauseBtn) { 
        playPauseBtn.addEventListener("click", function () { 
            togglePlayPause(); 
        }); 
    }


    // Next Button
    if (nextBtn) {

        nextBtn.addEventListener("click", function () {
            navigateNext();
        });

    }

    
    // Previous Button
    if (prevBtn) {

        prevBtn.addEventListener("click", function () {
            navigatePrev();
        });

    }

    // Keyboard Navigation
    slider.addEventListener("keydown", function (e) {

        // Only respond to left and right arrow keys
        if (e.key === "ArrowLeft") {

            e.preventDefault();
            navigatePrev();

        }

        else if (e.key === "ArrowRight") {

            e.preventDefault();
            navigateNext();

        }

    });


    // Mobile Touch/Swipe
    slider.addEventListener("touchstart", function (e) {

        touchStartX = e.changedTouches[0].screenX;

    }, { passive: true });


    slider.addEventListener("touchend", function (e) {

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    }, { passive: true });


    // Handle Swipe Direction
    function handleSwipe() {

        const swipeDistance = touchEndX - touchStartX;

        // Swiped Left → Show Next Slide
        if (swipeDistance < -swipeThreshold) {
            navigateNext();
        }

        // Swiped Right → Show Previous Slide
        else if (swipeDistance > swipeThreshold) {
            navigatePrev();
        }

    }

}


