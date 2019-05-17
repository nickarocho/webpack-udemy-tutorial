import foodFlip from './food-flip.jpg';

function addImage() {
    const img = document.createElement('img');
    img.alt = 'Food flip';
    img.width = 300;
    img.src = foodFlip;

    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;
