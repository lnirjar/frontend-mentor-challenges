const introForm = document.querySelector('form');
const inputs = Array.from(introForm.querySelectorAll('input'));
const successCard = document.querySelector('.success-card');

// Form Validation on Submit
introForm.addEventListener('submit', e => {
    e.preventDefault();
    introForm.classList.add('error');
    inputs.forEach(element => checkEmpty(element));;
    validateEmail(email);

    // If no errors, Submit the Form
    if (!inputs.filter(element => element.classList.contains('input--error')).length) {
        console.log("submitted");
        successCard.classList.add('success-card--visible');
        successCard.addEventListener('animationend', () => {
            successCard.classList.remove('success-card--visible');
        })
    }
});

// Hide Errors on Input Change
introForm.addEventListener('input', () => introForm.classList.remove('error'));

// Display Error
const displayError = (element) => {
    element.classList.add('input--error');
    element.nextElementSibling.classList.add('error__message--visible');
};

// Hide Error
const hideError = (element) => {
    element.classList.remove('input--error');
    element.nextElementSibling.classList.remove('error__message--visible');
};

// Validate Email
// rfc2822 email regex https://regexr.com/2rhq7
const validateEmail = (element) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    emailRegex.test(element.value) ? hideError(element) : displayError(element);
};

// Check for Empty Input Fields
const checkEmpty = element => element.value ? hideError(element) : displayError(element);