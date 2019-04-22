'use strict';

const searchInput = document.querySelector ('.form__input');
const searchButton = document.querySelector ('.button__input');

const urlFetch = 'http://api.tvmaze.com/search/shows?q=';

const searchFunction = (data, inputContain) => {
  const titleSeriesLower = data.toLowerCase ();
  const inputContainLower = inputContain.toLowerCase ();

  if (titleSeriesLower.includes (inputContainLower)) {
    console.log (data);
  }
};

function searchSeries () {
  const inputContain = searchInput.value;

  fetch (`${urlFetch}${inputContain}`)
    .then (response => response.json ())
    .then (data => {
      for (const series of data) {
        const titleSeries = series.show.name;
        searchFunction (titleSeries, inputContain);
      }
    });
}

searchButton.addEventListener ('click', searchSeries);
