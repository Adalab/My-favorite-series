'use strict';

const searchInput = document.querySelector ('.form__input');
const searchButton = document.querySelector ('.button__input');

const urlFetch = 'http://api.tvmaze.com/search/shows?q=';

function searchSeries () {
  const inputContain = searchInput.value;
  fetch (`${urlFetch}${inputContain}`)
    .then (response => response.json ())
    .then (data => {
      //   const serieTitle = data[0].toLowerCase ();
      //   const inputLowerCase = inputContain.toLowerCase ();
      for (const series of data) {
        const titleSeries = series.show.name;

        const titleSeriesLower = titleSeries.toLowerCase ();
        const inputContainLower = inputContain.toLowerCase ();

        if (titleSeriesLower.includes (inputContainLower)) {
          console.log (titleSeries);
        }
      }
    });
}

searchButton.addEventListener ('click', searchSeries);
