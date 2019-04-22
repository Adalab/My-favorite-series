'use strict';

const favoriteList = document.querySelector ('.favorite__list');
let favoritesArray = [];

const createImg = imgSrc => {
  const newList = document.createElement ('li');
  newList.setAttribute ('class', 'favorite__item');
  const newImg = document.createElement ('div');
  newImg.setAttribute ('class', 'favorite__img');
  newImg.style.backgroundImage = imgSrc;
  newList.appendChild (newImg);
  return newList;
};

const printFavorites = (title, img) => {
  const favoriteTitle = createTitle (title, 'h3');
  const favoriteImg = createImg (img);

  favoriteImg.appendChild (favoriteTitle);
  favoriteList.appendChild (favoriteImg);
};

const setStorage = () =>
  localStorage.setItem ('favorites', JSON.stringify (favoritesArray));

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

  const title = selectedItem.querySelector ('h2').innerHTML;
  const img = selectedItem.querySelector ('div').style.backgroundImage;

  favoritesArray.push ({seriesTitle: title, seriesImg: img});

  printFavorites (title, img);
  setStorage ();
}

window.addEventListener ('load', storageOrNot);
