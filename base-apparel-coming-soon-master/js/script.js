const form = document.querySelector('form');
const input = document.querySelector('form input');
const errorElements = Array.from(document.querySelectorAll('form .error'));

const displayError = () => {
    errorElements.forEach(ele => {
        ele.classList.remove('error--hidden');
    });

    input.classList.add('error');
};

const hideError = () => {
    errorElements.forEach(ele => {
        ele.classList.add('error--hidden');
    });

    input.classList.remove('error');
}

const validateEmail = (input) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;  // rfc2822 email regex https://regexr.com/2rhq7
    if (emailRegex.test(input)) {
        hideError();
    } else {
        displayError();
    }
}

input.addEventListener('input', e => {
    if (e.target.value.length > 0) {
        validateEmail(e.target.value);
    } else {
        hideError();
    }
})

form.addEventListener('submit', e => {
    e.preventDefault();
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;  // rfc2822 email regex https://regexr.com/2rhq7
    if (emailRegex.test(input.value)) {
        alert("THANKS FOR VISITING");
    } else {
        alert("Please Input valid Email");
    }
})