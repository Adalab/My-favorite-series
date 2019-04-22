'use strict';

const favoriteList = document.querySelector ('.favorite__list');
let favoritesArray = [];
let arrayToSave = [];

const createImg = imgSrc => {
  const newList = document.createElement ('li');
  newList.setAttribute ('class', 'favorite__item');
  const newImg = document.createElement ('div');
  newImg.setAttribute ('class', 'favorite__img');
  newImg.style.backgroundImage = imgSrc;
  newList.appendChild (newImg);
  return newList;
};

const createFavorites = array => {
  arrayToSave = [];
  favoriteList.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    
    const title = array[i].querySelector ('h2').innerHTML;
    const img = array[i].querySelector ('div').style.backgroundImage;
    arrayToSave[i] = {titleFav: title, imageFav: img};

    const newImg = createImg (img);

    const newTitle = createTitle (title, 'h3');
    newImg.appendChild (newTitle);
    favoriteList.appendChild (newImg);
  }

  setStorage (arrayToSave);
};

const setStorage = array => {
  localStorage.removeItem ('favorite');
  localStorage.setItem ('favorite', JSON.stringify (array));
};
const getStorage = () => {
  return JSON.parse (localStorage.getItem ('favorites'));
};

function storageOrNot () {
  const itemStorage = getStorage ();

  if (itemStorage !== null) {
    for (const item of itemStorage) {
      printFavorites (item.seriesTitle, item.seriesImg);
    }
  }
  favoritesArray = [...itemStorage];
}

function selectFavorite (event) {
  const selectedItem = event.currentTarget;
  selectedItem.classList.toggle ('favorite__show');

  const favoriteItems = document.querySelectorAll ('.favorite__show');
  favoritesArray = Array.from (favoriteItems);
  createFavorites (favoritesArray);
}
// window.addEventListener ('load', storageOrNot);
