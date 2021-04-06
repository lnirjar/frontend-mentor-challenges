const subscriptionForm = document.querySelector('.subscription-form');

const input = subscriptionForm.querySelector('input');
const warning = subscriptionForm.querySelector('.warning');


const validateEmail = email => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;  // rfc2822 email regex https://regexr.com/2rhq7

    return emailRegex.test(email);
}

input.addEventListener('input', e => {
    warning.classList.add('display-none');
    input.classList.remove('warning');
});

subscriptionForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateEmail(input.value)) {
        warning.textContent = "Thanks!";
        warning.classList.add('success');
        warning.classList.remove('warning');
        input.classList.remove('warning');
        warning.classList.remove('display-none');
    } else {
        warning.textContent = "Please provide a valid email address";
        warning.classList.remove('success');
        warning.classList.add('warning');
        input.classList.add('warning');
        warning.classList.remove('display-none');
    }
});
