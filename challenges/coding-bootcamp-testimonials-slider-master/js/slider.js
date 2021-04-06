const testimonialContainer = document.querySelector('.testimonial-container');
const prevButton = document.querySelector('.testimonial-container__button--left');
const nextButton = document.querySelector('.testimonial-container__button--right');
const slides = Array.from(document.getElementsByClassName('testimonial'));

const moveToSlide = (currentSlide, targetSlide) => {
    currentSlide.classList.remove('testimonial--current');
    targetSlide.classList.add('testimonial--current');
};

nextButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.testimonial--current');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    let nextSlide;
    if (currentIndex < slides.length - 1) {
        nextSlide = currentSlide.nextElementSibling;
    } else {
        nextSlide = slides[0];
    }
    moveToSlide(currentSlide, nextSlide);
});

prevButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.testimonial--current');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    let prevSlide;
    if (currentIndex > 0) {
        prevSlide = currentSlide.previousElementSibling;
    } else {
        prevSlide = slides[slides.length - 1];
    }
    moveToSlide(currentSlide, prevSlide);
})

//POSITION BUTTONS
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window#:~:text=getBoundingClientRect()%20is%20a%20javascript,relative%20to%20viewport%20of%20window.&text=These%20specifiy%20the%20position%20of,nearest%20parent%20that%20has%20layout.
 */
const buttonContainer = document.querySelector('.testimonial-container__button-container');

const positionButtons = () => {
    const reviewerImage = document.querySelector('.testimonial--current .testimonial__image-container img');
    const buttonRect = reviewerImage.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const offsetLeft = buttonRect.left - bodyRect.left;
    const offsetTop = buttonRect.top - bodyRect.top;
    buttonContainer.style.top = (offsetTop + buttonRect.height) + 'px';
    buttonContainer.style.left = offsetLeft + 'px';
};

positionButtons();

window.addEventListener('resize', positionButtons);