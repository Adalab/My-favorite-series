'use strict';

const searchInput = document.querySelector ('.form__input');
const searchButton = document.querySelector ('.button__input');
const resultList = document.querySelector ('.results__list');

const pressEnter = event => {
  if (event.keyCode === 13) {
    searchSeries();
  }
};

const urlFetch = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const createTitle = (data, type, className) => {
  const resultTitle = document.createElement (type);
  const resultTitleText = document.createTextNode (data);

  resultTitle.appendChild (resultTitleText);
  resultTitle.setAttribute('class', className);
  return resultTitle;
};

const searchFunction = (data, inputContain) => {
  const titleSeriesLower = data.name.toLowerCase ();
  const inputContainLower = inputContain.toLowerCase ();
  const imageSeries = data.image;

  if (titleSeriesLower.includes (inputContainLower)) {
    const title = createTitle (data.name, 'h2', 'list__title');
    const img = createImageFetch (imageSeries, data.id);
    img.appendChild (title);
    resultList.appendChild(img);
    checkFavorite(data.id, img);
  }
};

function createImageFetch (imageSeries, dataID) {
  const resultItem = document.createElement ('li');
  resultItem.setAttribute ('class', 'result__item');
  resultItem.setAttribute('id', dataID);
  const resultImage = document.createElement ('div');
  resultImage.setAttribute ('class', 'results__image');
  if (imageSeries === null) {
    resultImage.style.backgroundImage = `url(${defaultImage})`;
  } else {
    resultImage.style.backgroundImage = `url(${imageSeries.medium})`;
  }

  resultItem.addEventListener ('click', selectFavorite);
  resultItem.appendChild (resultImage);
  return resultItem;
}

function searchSeries () {
  resultList.innerHTML = '';
  const inputContain = searchInput.value;

  fetch (`${urlFetch}${inputContain}`)
    .then (response => response.json ())
    .then (data => {
      for (const series of data) {
        const titleSeries = series.show;
        searchFunction (titleSeries, inputContain);
      }
    });
}

searchButton.addEventListener ('click', searchSeries);
window.addEventListener('keyup', pressEnter);
