// Tab Switching
const signUpTab = document.getElementById('signUpTab');
const signInTab = document.getElementById('signInTab');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');

// Tab switching functionality
signUpTab.addEventListener('click', () => {
    signUpTab.classList.add('active');
    signInTab.classList.remove('active');
    signUpForm.classList.add('active');
    signInForm.classList.remove('active');
});

signInTab.addEventListener('click', () => {
    signInTab.classList.add('active');
    signUpTab.classList.remove('active');
    signInForm.classList.add('active');
    signUpForm.classList.remove('active');
});

// DOM Elements - Sign Up Form
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');

// Password checklist (Sign Up)
const pwStrengthItem = document.getElementById('pwStrengthItem');
const pwNoPersonalItem = document.getElementById('pwNoPersonalItem');
const pwLengthItem = document.getElementById('pwLengthItem');
const pwNumberSymbolItem = document.getElementById('pwNumberSymbolItem');
const passwordStrengthValue = document.getElementById('passwordStrengthValue');

// DOM Elements - Sign In Form
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginPasswordToggle = document.getElementById('loginPasswordToggle');
const loginSubmitButton = document.getElementById('loginSubmitButton');
const loginSuccessMessage = document.getElementById('loginSuccessMessage');
const loginEmailError = document.getElementById('loginEmail-error');
const loginPasswordError = document.getElementById('loginPassword-error');

// Error message elements
const usernameError = document.getElementById('username-error');
const fullNameError = document.getElementById('fullName-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Validation state
const validationState = {
    username: false,
    fullName: false,
    email: false,
    password: false
};

// Email regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Show error message
 */
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

/**
 * Hide error message
 */
function hideError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

/**
 * Update input visual state
 */
function updateInputState(input, isValid) {
    input.classList.remove('error', 'success');
    if (input.value.trim() !== '') {
        input.classList.add(isValid ? 'success' : 'error');
    }
}

/**
 * Validate username
 */
function validateUsername(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(usernameError);
        updateInputState(usernameInput, false);
        return false;
    }

    if (trimmedValue.length < 3 || trimmedValue.length > 15) {
        showError(usernameError, 'Username must be between 3 and 15 characters');
        updateInputState(usernameInput, false);
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(trimmedValue)) {
        showError(usernameError, 'Username can only contain letters and numbers');
        updateInputState(usernameInput, false);
        return false;
    }

    hideError(usernameError);
    updateInputState(usernameInput, true);
    return true;
}

/**
 * Validate full name
 */
function validateFullName(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(fullNameError);
        updateInputState(fullNameInput, false);
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) {
        showError(fullNameError, 'Full name must contain only letters and spaces');
        updateInputState(fullNameInput, false);
        return false;
    }

    const words = trimmedValue.split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) {
        showError(fullNameError, 'Please enter your full name');
        updateInputState(fullNameInput, false);
        return false;
    }

    hideError(fullNameError);
    updateInputState(fullNameInput, true);
    return true;
}

/**
 * Validate email
 */
function validateEmail(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(emailError);
        updateInputState(emailInput, false);
        return false;
    }

    if (!emailRegex.test(trimmedValue)) {
        showError(emailError, 'Please enter a valid email address');
        updateInputState(emailInput, false);
        return false;
    }

    hideError(emailError);
    updateInputState(emailInput, true);
    return true;
}

/**
 * Validate password
 */
function validatePassword(value, fullName, email) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(passwordError);
        updateInputState(passwordInput, false);
        return false;
    }

    // Minimum 8 characters
    if (trimmedValue.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long');
        updateInputState(passwordInput, false);
        return false;
    }

    // Must include at least one number OR one symbol
    const hasNumber = /\d/.test(trimmedValue);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedValue);

    if (!hasNumber && !hasSymbol) {
        showError(passwordError, 'Password must include at least one number or symbol');
        updateInputState(passwordInput, false);
        return false;
    }

    // Cannot contain user's name (from Full Name field)
    if (fullName.trim().length > 0) {
        const nameWords = fullName.trim().split(/\s+/).filter(word => word.length > 0);
        const lowerPassword = trimmedValue.toLowerCase();

        for (const word of nameWords) {
            if (word.length >= 3 && lowerPassword.includes(word.toLowerCase())) {
                showError(passwordError, 'Password cannot contain your name');
                updateInputState(passwordInput, false);
                return false;
            }
        }
    }

    // Cannot contain any part of email address
    if (email.trim().length > 0) {
        const emailParts = email.trim().toLowerCase().split('@');
        const localPart = emailParts[0];
        const domainPart = emailParts[1] ? emailParts[1].split('.')[0] : '';
        const lowerPassword = trimmedValue.toLowerCase();

        if (localPart.length >= 3 && lowerPassword.includes(localPart)) {
            showError(passwordError, 'Password cannot contain your email address');
            updateInputState(passwordInput, false);
            return false;
        }

        if (domainPart.length >= 3 && lowerPassword.includes(domainPart)) {
            showError(passwordError, 'Password cannot contain your email address');
            updateInputState(passwordInput, false);
            return false;
        }
    }

    hideError(passwordError);
    updateInputState(passwordInput, true);
    return true;
}

function computePasswordChecklist(password, fullName, email) {
    const trimmedPassword = (password || '').trim();
    const trimmedName = (fullName || '').trim();
    const trimmedEmail = (email || '').trim();

    const minLen = trimmedPassword.length >= 8;
    const hasNumberOrSymbol =
        /\d/.test(trimmedPassword) ||
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword);

    let noPersonal = true;
    const lowerPassword = trimmedPassword.toLowerCase();

    if (trimmedName.length > 0) {
        const words = trimmedName.split(/\s+/).filter(Boolean);
        for (const w of words) {
            if (w.length >= 3 && lowerPassword.includes(w.toLowerCase())) {
                noPersonal = false;
                break;
            }
        }
    }

    if (noPersonal && trimmedEmail.length > 0) {
        const [local = '', domainAll = ''] = trimmedEmail.toLowerCase().split('@');
        const domain = domainAll.split('.')[0] || '';
        if (
            (local.length >= 3 && lowerPassword.includes(local)) ||
            (domain.length >= 3 && lowerPassword.includes(domain))
        ) {
            noPersonal = false;
        }
    }

    // Strength heuristic (enough to match Weak/Medium/Strong display)
    let score = 0;
    if (trimmedPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(trimmedPassword)) score += 1;
    if (/[a-z]/.test(trimmedPassword)) score += 1;
    if (/\d/.test(trimmedPassword)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword)) score += 1;

    let strength = 'Weak';
    if (trimmedPassword.length >= 10 && score >= 4) strength = 'Medium';
    if (trimmedPassword.length >= 12 && score >= 5) strength = 'Strong';

    return { minLen, hasNumberOrSymbol, noPersonal, strength };
}

function setChecklistState(el, isMet) {
    if (!el) return;
    el.classList.remove('met', 'unmet');
    el.classList.add(isMet ? 'met' : 'unmet');
}

function updatePasswordChecklistUI() {
    const hasAny = passwordInput.value.trim().length > 0;
    const { minLen, hasNumberOrSymbol, noPersonal, strength } = computePasswordChecklist(
        passwordInput.value,
        fullNameInput.value,
        emailInput.value
    );

    if (passwordStrengthValue) passwordStrengthValue.textContent = strength;

    // Strength line should be green only when not weak (like the Figma error/success states)
    setChecklistState(pwStrengthItem, hasAny && strength !== 'Weak');
    setChecklistState(pwNoPersonalItem, hasAny && noPersonal);
    setChecklistState(pwLengthItem, hasAny && minLen);
    setChecklistState(pwNumberSymbolItem, hasAny && hasNumberOrSymbol);
}

/**
 * Update submit button state
 */
function updateSubmitButton() {
    const allValid = Object.values(validationState).every(valid => valid === true);
    submitButton.disabled = !allValid;
}

/**
 * Real-time validation handlers
 */
usernameInput.addEventListener('input', () => {
    validationState.username = validateUsername(usernameInput.value);
    updateSubmitButton();
});

usernameInput.addEventListener('blur', () => {
    validationState.username = validateUsername(usernameInput.value);
    updateSubmitButton();
});

fullNameInput.addEventListener('input', () => {
    validationState.fullName = validateFullName(fullNameInput.value);
    // Re-validate password if full name changes
    if (passwordInput.value.trim().length > 0) {
        validationState.password = validatePassword(
            passwordInput.value,
            fullNameInput.value,
            emailInput.value
        );
    }
    updatePasswordChecklistUI();
    updateSubmitButton();
});

fullNameInput.addEventListener('blur', () => {
    validationState.fullName = validateFullName(fullNameInput.value);
    // Re-validate password if full name changes
    if (passwordInput.value.trim().length > 0) {
        validationState.password = validatePassword(
            passwordInput.value,
            fullNameInput.value,
            emailInput.value
        );
    }
    updatePasswordChecklistUI();
    updateSubmitButton();
});

emailInput.addEventListener('input', () => {
    validationState.email = validateEmail(emailInput.value);
    // Re-validate password if email changes
    if (passwordInput.value.trim().length > 0) {
        validationState.password = validatePassword(
            passwordInput.value,
            fullNameInput.value,
            emailInput.value
        );
    }
    updatePasswordChecklistUI();
    updateSubmitButton();
});

emailInput.addEventListener('blur', () => {
    validationState.email = validateEmail(emailInput.value);
    // Re-validate password if email changes
    if (passwordInput.value.trim().length > 0) {
        validationState.password = validatePassword(
            passwordInput.value,
            fullNameInput.value,
            emailInput.value
        );
    }
    updatePasswordChecklistUI();
    updateSubmitButton();
});

passwordInput.addEventListener('input', () => {
    validationState.password = validatePassword(
        passwordInput.value,
        fullNameInput.value,
        emailInput.value
    );
    updatePasswordChecklistUI();
    updateSubmitButton();
});

passwordInput.addEventListener('blur', () => {
    validationState.password = validatePassword(
        passwordInput.value,
        fullNameInput.value,
        emailInput.value
    );
    updatePasswordChecklistUI();
    updateSubmitButton();
});

/**
 * Password toggle functionality
 */
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle icons
    const showIcon = passwordToggle.querySelector('.eye-show');
    const hideIcon = passwordToggle.querySelector('.eye-hide');

    if (type === 'text') {
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
        passwordToggle.setAttribute('aria-label', 'Hide password');
    } else {
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
        passwordToggle.setAttribute('aria-label', 'Show password');
    }
});

/**
 * Form submission handler
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Final validation check
    validationState.username = validateUsername(usernameInput.value);
    validationState.fullName = validateFullName(fullNameInput.value);
    validationState.email = validateEmail(emailInput.value);
    validationState.password = validatePassword(
        passwordInput.value,
        fullNameInput.value,
        emailInput.value
    );

    // If all valid, submit
    if (Object.values(validationState).every(valid => valid === true)) {
        // Log form data to console
        const formData = {
            username: usernameInput.value.trim(),
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: '********' // Mask password for security
        };

        console.log('Form submitted successfully:');
        console.log(formData);

        // Show success message
        successMessage.style.display = 'flex';

        // Clear form after a short delay
        setTimeout(() => {
            form.reset();

            // Reset all validation states
            Object.keys(validationState).forEach(key => {
                validationState[key] = false;
            });

            // Reset visual states
            [usernameInput, fullNameInput, emailInput, passwordInput].forEach(input => {
                input.classList.remove('error', 'success');
            });

            // Hide all error messages
            [usernameError, fullNameError, emailError, passwordError].forEach(error => {
                hideError(error);
            });

            // Reset password type
            passwordInput.setAttribute('type', 'password');

            // Disable submit button
            submitButton.disabled = true;

            // Hide success message after form is cleared
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }, 1500);
    } else {
        // Focus on first invalid field
        if (!validationState.username) {
            usernameInput.focus();
        } else if (!validationState.fullName) {
            fullNameInput.focus();
        } else if (!validationState.email) {
            emailInput.focus();
        } else if (!validationState.password) {
            passwordInput.focus();
        }
    }
});

// Initialize submit button as disabled
updateSubmitButton();
updatePasswordChecklistUI();

/**
 * Login Password Toggle
 */
loginPasswordToggle.addEventListener('click', () => {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);

    // Toggle icons
    const showIcon = loginPasswordToggle.querySelector('.eye-show');
    const hideIcon = loginPasswordToggle.querySelector('.eye-hide');

    if (type === 'text') {
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
        loginPasswordToggle.setAttribute('aria-label', 'Hide password');
    } else {
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
        loginPasswordToggle.setAttribute('aria-label', 'Show password');
    }
});

/**
 * Login Form Validation
 */
let loginValidationState = {
    email: false,
    password: false
};

function validateLoginEmail(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(loginEmailError);
        updateInputState(loginEmailInput, false);
        return false;
    }

    if (!emailRegex.test(trimmedValue)) {
        showError(loginEmailError, 'Please enter a valid email address');
        updateInputState(loginEmailInput, false);
        return false;
    }

    hideError(loginEmailError);
    updateInputState(loginEmailInput, true);
    return true;
}

function validateLoginPassword(value) {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
        hideError(loginPasswordError);
        updateInputState(loginPasswordInput, false);
        return false;
    }

    if (trimmedValue.length < 6) {
        showError(loginPasswordError, 'Password must be at least 6 characters');
        updateInputState(loginPasswordInput, false);
        return false;
    }

    hideError(loginPasswordError);
    updateInputState(loginPasswordInput, true);
    return true;
}

function updateLoginSubmitButton() {
    const allValid = Object.values(loginValidationState).every(valid => valid === true);
    loginSubmitButton.disabled = !allValid;
}

// Login form real-time validation
loginEmailInput.addEventListener('input', () => {
    loginValidationState.email = validateLoginEmail(loginEmailInput.value);
    updateLoginSubmitButton();
});

loginEmailInput.addEventListener('blur', () => {
    loginValidationState.email = validateLoginEmail(loginEmailInput.value);
    updateLoginSubmitButton();
});

loginPasswordInput.addEventListener('input', () => {
    loginValidationState.password = validateLoginPassword(loginPasswordInput.value);
    updateLoginSubmitButton();
});

loginPasswordInput.addEventListener('blur', () => {
    loginValidationState.password = validateLoginPassword(loginPasswordInput.value);
    updateLoginSubmitButton();
});

/**
 * Login Form Submission
 */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Final validation check
    loginValidationState.email = validateLoginEmail(loginEmailInput.value);
    loginValidationState.password = validateLoginPassword(loginPasswordInput.value);

    // If all valid, submit
    if (Object.values(loginValidationState).every(valid => valid === true)) {
        // Log form data to console
        const loginData = {
            email: loginEmailInput.value.trim(),
            password: '********' // Mask password for security
        };

        console.log('Login successful:');
        console.log(loginData);

        // Show success message
        loginSuccessMessage.style.display = 'flex';

        // Clear form after a short delay
        setTimeout(() => {
            loginForm.reset();

            // Reset all validation states
            Object.keys(loginValidationState).forEach(key => {
                loginValidationState[key] = false;
            });

            // Reset visual states
            [loginEmailInput, loginPasswordInput].forEach(input => {
                input.classList.remove('error', 'success');
            });

            // Hide all error messages
            [loginEmailError, loginPasswordError].forEach(error => {
                hideError(error);
            });

            // Reset password type
            loginPasswordInput.setAttribute('type', 'password');

            // Disable submit button
            loginSubmitButton.disabled = true;

            // Hide success message after form is cleared
            setTimeout(() => {
                loginSuccessMessage.style.display = 'none';
            }, 3000);
        }, 1500);
    } else {
        // Focus on first invalid field
        if (!loginValidationState.email) {
            loginEmailInput.focus();
        } else if (!loginValidationState.password) {
            loginPasswordInput.focus();
        }
    }
});

// Initialize login submit button as disabled
updateLoginSubmitButton();

