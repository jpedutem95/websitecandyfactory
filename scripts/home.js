// ==========================
// Initialize Page
// ==========================
document.addEventListener("DOMContentLoaded", initHome);

function initHome() {

    // Promotion Slider
    createSlider(".slide", ".prev", ".next");

    // Shop Banner Slider
    createSlider(".shop-slide", ".shop-prev", ".shop-next");

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
// Loading Screen
// ==========================
window.addEventListener("load", function () {

    const loadingScreen = document.getElementById("loadingScreen");

    if (loadingScreen) {
        loadingScreen.classList.add("hide");
    }

});


// ==========================
// Dropdowns
// ==========================
const languageBtn = document.getElementById("languageBtn");
const languageMenu = document.getElementById("languageMenu");

const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");


// Close All Dropdowns
function closeAllDropdowns() {
    
    if (languageMenu) {
        languageMenu.classList.remove("show");
    }

    if (userDropdown) {
        userDropdown.classList.remove("show");
    }
}


// Language Menu
if (languageBtn && languageMenu) {

    languageBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        const isOpen = languageMenu.classList.contains("show");

        closeAllDropdowns();

        if (!isOpen) {
            languageMenu.classList.add("show");
        }
    });

}

// User Menu, Username / Password
if (userBtn && userDropdown) {

    userBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = userDropdown.classList.contains("show");

        closeAllDropdowns();

        if (!isOpen) {
            userDropdown.classList.add("show");
        }
    });

}


// ================================
// Close Language When Mouse Leaves
// ================================
const languageSwitcher = document.querySelector(".language-switcher");

if (languageSwitcher && languageMenu) {
    
    languageSwitcher.addEventListener("mouseleave", function () {
        languageMenu.classList.remove("show");
    });
}

// clicking inside the dropdown doesn't close it
if (userDropdown) {
    
    userDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

// Click Outside will close drop down
document.addEventListener("click", function () {
    closeAllDropdowns();
});



// ==========================
// Show / Hide Password
// ==========================
const toggleButtons = document.querySelectorAll(".togglePassword");

toggleButtons.forEach(function (button) {

    // Show / hide when clicked
    button.addEventListener("click", function () {

        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const icon = this.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });


    // Hide password when mouse leaves the eye
    button.addEventListener("mouseleave", function () {

        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const icon = this.querySelector("i");

        passwordInput.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    });

});

// =================================================
// Account Forms Create Account & Forgot Password
// =================================================
const createAccountBtn = document.getElementById("createAccountBtn");
const createAccountForm = document.getElementById("createAccountForm");

const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const loginForm = document.getElementById("loginForm");


// Create Account
if (createAccountBtn && createAccountForm) {

    createAccountBtn.addEventListener("click", function () {

        loginForm.style.display = "none";
        forgotPasswordForm.style.display = "none";

        createAccountForm.style.display = "block";

    });

}


// Forgot Password
if (forgotPasswordBtn && forgotPasswordForm) {

    forgotPasswordBtn.addEventListener("click", function () {

        loginForm.style.display = "none";
        createAccountForm.style.display = "none";

        forgotPasswordForm.style.display = "block";

    });

}


// Back to Login
const backToLoginButtons = document.querySelectorAll(".backToLogin");

backToLoginButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        forgotPasswordForm.style.display = "none";
        createAccountForm.style.display = "none";

        loginForm.style.display = "block";

    });

});

// ========================================
// Password Requirements for Create Account
// ========================================
const newPassword = document.getElementById("newPassword");

const lengthRequirement = document.getElementById("lengthRequirement");
const uppercaseRequirement = document.getElementById("uppercaseRequirement");
const numberRequirement = document.getElementById("numberRequirement");
const symbolRequirement = document.getElementById("symbolRequirement");

if (newPassword) {

    newPassword.addEventListener("input", function () {

        const value = this.value;

        const hasLength = value.length >= 12;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbol = /[^A-Za-z0-9]/.test(value);

        lengthRequirement.classList.toggle("valid", hasLength);
        uppercaseRequirement.classList.toggle("valid", hasUppercase);
        numberRequirement.classList.toggle("valid", hasNumber);
        symbolRequirement.classList.toggle("valid", hasSymbol);

    });

}


// ==================================
// Password Match for create account
// ==================================
const confirmPassword = document.getElementById("confirmPassword");
const passwordMatchMessage = document.getElementById("passwordMatchMessage");

if (newPassword && confirmPassword && passwordMatchMessage) {

    function checkPasswordMatch() {

        if (confirmPassword.value === "") {

            passwordMatchMessage.textContent = "";
            passwordMatchMessage.classList.remove("valid", "invalid");

        } else if (newPassword.value === confirmPassword.value) {

            passwordMatchMessage.textContent = "Passwords match.";
            passwordMatchMessage.classList.add("valid");
            passwordMatchMessage.classList.remove("invalid");

        } else {

            passwordMatchMessage.textContent = "Passwords do not match.";
            passwordMatchMessage.classList.add("invalid");
            passwordMatchMessage.classList.remove("valid");

        }

    }

    newPassword.addEventListener("input", checkPasswordMatch);
    confirmPassword.addEventListener("input", checkPasswordMatch);

}
