const shareButton = document.getElementById('share-button');
const shareOptions = document.getElementById('share-options');

shareButton.addEventListener('click', e => {
    shareOptions.classList.toggle('share-options--hidden');
    shareButton.classList.toggle('card__author__share-button--open');
})