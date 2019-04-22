'use strict';

const searchInput = document.querySelector ('.form__input');
const searchButton = document.querySelector ('.button__input');
const resultList = document.querySelector ('.results__list');

const urlFetch = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

const searchFunction = (data, inputContain) => {
  const titleSeriesLower = data.name.toLowerCase ();
  const inputContainLower = inputContain.toLowerCase ();
  const imageSeries = data.image;

  if (titleSeriesLower.includes (inputContainLower)) {
    const resultItem = document.createElement ('li');
    resultItem.setAttribute ('class', 'result__item');

    resultItem.addEventListener ('click', selectFavorite);

    const resultImage = document.createElement ('div');
    resultImage.setAttribute ('class', 'results__image');
    if (imageSeries === null) {
      resultImage.style.backgroundImage = `url(${defaultImage})`;
    } else {
      resultImage.style.backgroundImage = `url(${imageSeries.medium})`;
    }

    const resultTitle = document.createElement ('h2');
    const resultTitleText = document.createTextNode (data.name);

    resultTitle.appendChild (resultTitleText);
    resultItem.appendChild (resultImage);
    resultItem.appendChild (resultTitle);
    resultList.appendChild (resultItem);
  }
};

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
