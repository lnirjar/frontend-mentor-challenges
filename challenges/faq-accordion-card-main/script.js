let currentElement;

const faqQuestions = document.getElementsByClassName('faq-question');
// console.log(faqQuestions);

const closeAll = () => {
    for (let index = 0; index < faqQuestions.length; index++) {
        const element = faqQuestions[index];
        element.parentNode.classList.remove('faq__list__item--active');
    }
}

for (let index = 0; index < faqQuestions.length; index++) {
    const element = faqQuestions[index];
    element.addEventListener('click', (e => {
        if (currentElement === e.target.parentNode) {
            e.target.parentNode.classList.toggle('faq__list__item--active');
        } else {
            if (currentElement) {
                // console.log(currentElement);
                currentElement.classList.remove('faq__list__item--active');
            }
            e.target.parentNode.classList.add('faq__list__item--active');
            currentElement = e.target.parentNode;
        }
    }))
}