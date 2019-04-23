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

const createElement = array => {
  favoriteList.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const newItem = createImg (array[i].image);
    const newTitle = createTitle (array[i].title, 'h3', 'favorite__title');
    newItem.appendChild (newTitle);
    favoriteList.appendChild (newItem);
  }
};

const setStorage = array => {
  localStorage.removeItem ('favorite');
  localStorage.setItem ('favorite', JSON.stringify (array));
};

const getStorage = () => {
  return JSON.parse (localStorage.getItem ('favorite'));
};

function storageOrNot () {
  const itemStorage = getStorage ();
  if (itemStorage !== null) {
    favoritesArray.push(...itemStorage)
    createElement (itemStorage);
  }
}

function selectFavorite (event) {
  const selectedItem = event.currentTarget;
  selectedItem.classList.toggle ('favorite__show');

  const favTitle = selectedItem.querySelector ('h2').innerHTML;
  const favImg = selectedItem.querySelector ('div').style.backgroundImage;
  const favId = parseInt (selectedItem.getAttribute ('id'));

  // If the array is empty, add a first item. Then search inside de array to look for the id of the selected Item. If it is erased, else added to the object.
  if (favoritesArray.length === 0) {
    favoritesArray.push ({id: favId, title: favTitle, image: favImg});
  } else {
    const searchFavorite = favoritesArray.findIndex (function (element) {
      return element.id === favId;
    });
    if (searchFavorite === -1) {
      favoritesArray.push ({id: favId, title: favTitle, image: favImg});
    } else {
      favoritesArray.splice (searchFavorite, 1);
    }
  }
  createElement (favoritesArray);
  setStorage (favoritesArray);
}
window.addEventListener ('load', storageOrNot);
