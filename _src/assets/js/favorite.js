'use strict';

function selectFavorite (event) {
  const selectedItem = event.currentTarget;
  selectedItem.classList.toggle('favorite__show');
}


