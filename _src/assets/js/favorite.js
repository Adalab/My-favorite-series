'use strict';
const favoritesArray = [];

// const createFavorite = () => {
//   for (const favorite of array) {
// }
// };

function selectFavorite (event) {
  const selectedItem = event.currentTarget;
  selectedItem.classList.toggle ('favorite__show');
  favoritesArray.push (selectedItem);
  console.log (favoritesArray);
}
