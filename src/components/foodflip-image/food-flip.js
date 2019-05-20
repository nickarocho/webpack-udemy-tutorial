import Food from './food-flip.jpg';
import './food-flip.scss';
import React from 'react';

class FoodFlipImage {
    render() {
        const img = document.createElement('img');
        img.src = Food;
        img.alt = 'Food';
        img.classList.add('food-image');

        const bodyDomElement = document.querySelector('body');
        bodyDomElement.appendChild(img);
    }
}

export default FoodFlipImage;
