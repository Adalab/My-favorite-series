'use strict';

const favoriteList = document.querySelector ('.favorite__list');

let favoritesArray = [];

const deleteItem = (event) => {
  const idEvent = parseInt(event.currentTarget.getAttribute('id'));
  const searchFavorite = compareFavorite (idEvent);
  favoritesArray.splice (searchFavorite, 1);
  createElement (favoritesArray);
  setStorage (favoritesArray);
};

const createImg = (imgSrc, id) => {
  const newList = document.createElement ('li');
  newList.addEventListener ('click', deleteItem);
  newList.setAttribute('id', id);
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
    const newItem = createImg (array[i].image, array[i].id);
    const newTitle = createTitle (array[i].title, 'h3', 'favorite__title');
    const newIcon = document.createElement ('i');
    newIcon.setAttribute ('class', 'trash__icon fas fa-trash-alt');
    newItem.appendChild (newTitle);
    newItem.appendChild (newIcon);
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

const compareFavorite = dataID => {
  const searchFavorite = favoritesArray.findIndex (
    favorite => favorite.id === dataID
  );
  return searchFavorite;
};

const checkFavorite = (dataId, element) => {
  const searchFavorite = compareFavorite (dataId);

  if (searchFavorite >= 0) {
    element.classList.add ('favorite__show');
  }
};

function storageOrNot () {
  const itemStorage = getStorage ();
  if (itemStorage !== null) {
    favoritesArray.push (...itemStorage);
    createElement (itemStorage);
  }
}

function selectFavorite (event) {
  const selectedItem = event.currentTarget;
  selectedItem.classList.toggle ('favorite__show');

  const favTitle = selectedItem.querySelector ('h2').innerHTML;
  const favImg = selectedItem.querySelector ('div').style.backgroundImage;
  const favId = parseInt (selectedItem.getAttribute ('id'));

  if (favoritesArray.length === 0) {
    favoritesArray.push ({id: favId, title: favTitle, image: favImg});
  } else {
    const searchFavorite = compareFavorite (favId);

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
