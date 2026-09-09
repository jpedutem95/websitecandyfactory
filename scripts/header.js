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

// ==================================
// Login Validation
// ==================================

const loginFormElement =
    document.querySelector("#loginForm form");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const loginErrorMessage =
    document.getElementById("loginErrorMessage");

const welcomeMessage =
    document.getElementById("welcomeMessage");


if (
    loginFormElement &&
    username &&
    password &&
    loginErrorMessage &&
    welcomeMessage
) {

    loginFormElement.addEventListener(
        "submit",
        function (event) {

            const savedUsername =
                localStorage.getItem("username");

            const savedPassword =
                localStorage.getItem("password");


            if (
                username.value !== savedUsername ||
                password.value !== savedPassword
            ) {

                event.preventDefault();

                loginErrorMessage.textContent =
                    "Incorrect username or password.";

            } else {

                event.preventDefault();

                loginErrorMessage.textContent = "";

                const firstName =
                    localStorage.getItem("firstName");

                if (firstName) {

                    welcomeMessage.textContent =
                        "Welcome, " + firstName + "!";

                }

            }

        }
    );

}



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
const lowercaseRequirement = document.getElementById("lowercaseRequirement");
const uppercaseRequirement = document.getElementById("uppercaseRequirement");
const numberRequirement = document.getElementById("numberRequirement");
const symbolRequirement = document.getElementById("symbolRequirement");
const passwordRequirements = document.querySelector(".password-requirements");

if (newPassword) {

    newPassword.addEventListener("input", function () {

        const value = this.value;

        // Show requirements when password has text
        passwordRequirements.classList.toggle("show", value.length > 0);

        const hasLength = value.length >= 12;
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbol = /[^A-Za-z0-9]/.test(value);

        lengthRequirement.classList.toggle("valid", hasLength);
        lowercaseRequirement.classList.toggle("valid", hasLowercase);
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

            passwordMatchMessage.textContent = "Passwords do not match. Please try again.";
            passwordMatchMessage.classList.add("invalid");
            passwordMatchMessage.classList.remove("valid");

        }

    }

    newPassword.addEventListener("input", checkPasswordMatch);
    confirmPassword.addEventListener("input", checkPasswordMatch);
    
}

// ==================================
// Create Account Validation
// ==================================

const accountSuccessMessage =
    document.getElementById("accountSuccessMessage");

const newUsername = document.getElementById("newUsername");

const createAccountFormElement =
    document.querySelector("#createAccountForm form");

const email =
    document.getElementById("email");

const emailErrorMessage =
    document.getElementById("emailErrorMessage");

if (
    createAccountFormElement &&
    email &&
    emailErrorMessage &&
    accountSuccessMessage
) {

    // ==================================
    // Create Account Button Validation
    // ==================================

    const createAccountSubmit =
        document.getElementById("createAccountSubmit");

    const createAccountInputs =
        createAccountFormElement.querySelectorAll("input");

    function checkCreateAccountForm() {

        // Check all fields
        const allFieldsFilled =
            [...createAccountInputs].every(function (input) {
                return input.value.trim() !== "";
            });

        // Check email
            const emailValue =
                email.value.trim();

            const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const validEmail =
                emailPattern.test(emailValue);


        // Show email error only when something is entered
        if (emailValue !== "" && !validEmail) {

            emailErrorMessage.textContent =
                "The email address you entered is not valid.";

        } else {

            emailErrorMessage.textContent = "";

        }

        // Check password requirements
        const password =
            newPassword.value;

        const validPassword =
            password.length >= 12 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        // Check password match
        const passwordsMatch =
            newPassword.value === confirmPassword.value;

        // Enable button only when everything is correct
        createAccountSubmit.disabled = !(
            allFieldsFilled &&
            validEmail &&
            validPassword &&
            passwordsMatch
        );
    }

    // Check fields whenever user types
    createAccountInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            checkCreateAccountForm
        );

    });

    // ==================================
    // Create Account Submit Validation
    // ==================================

    createAccountFormElement.addEventListener(
        "submit",
        function (event) {

            // Check if any field is empty

            const allFieldsFilled =
                [...createAccountInputs].every(function (input) {
                    return input.value.trim() !== "";
                });


            // Check password requirements

            const password =
                newPassword.value;

            const validPassword =
                password.length >= 12 &&
                /[a-z]/.test(password) &&
                /[A-Z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[^A-Za-z0-9]/.test(password);


            // Check if passwords match

            const passwordsMatch =
                newPassword.value === confirmPassword.value;


            // Check email

            const emailValue =
                email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const validEmail =
                emailPattern.test(emailValue);


            // Stop submission if validation fails

            if (
                !allFieldsFilled ||
                !validEmail ||
                !validPassword ||
                !passwordsMatch
            ) {

                event.preventDefault();

                return;
            }

            event.preventDefault();

            // Save account information

            localStorage.setItem(
                "username",
                newUsername.value
            );

            localStorage.setItem(
                "password",
                newPassword.value
            );

            localStorage.setItem(
                "firstName",
                document.getElementById("firstName").value
            );

            accountSuccessMessage.textContent =
                "You successfully created an account!";

        }
    );

}


// ==================================
// Forgot Password Validation
// ==================================

const forgotPasswordFormElement =
    document.querySelector("#forgotPasswordForm form");

const resetEmail =
    document.getElementById("resetEmail");

const resetEmailErrorMessage =
    document.getElementById("resetEmailErrorMessage");

const sendResetLinkBtn =
    document.getElementById("sendResetLinkBtn");


if (
    forgotPasswordFormElement &&
    resetEmail &&
    resetEmailErrorMessage &&
    sendResetLinkBtn
) {

    resetEmail.addEventListener("input", function () {

        const emailValue =
            resetEmail.value.trim();

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Nothing entered
        if (emailValue === "") {

            resetEmailErrorMessage.textContent = "";

            sendResetLinkBtn.disabled = true;

            return;
        }


        // Email is invalid/incomplete
        if (!emailPattern.test(emailValue)) {

            resetEmailErrorMessage.textContent =
                "The email address you entered is not valid.";

            sendResetLinkBtn.disabled = true;

            return;
        }


        // Email is valid
        resetEmailErrorMessage.textContent = "";

        sendResetLinkBtn.disabled = false;

    });

}

