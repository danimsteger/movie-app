const getApiKeys = async () => {
  try {
    const response = await fetch("/api/keys");
    if (!response.ok) throw new Error("Failed to fetch API keys");
    const keys = await response.json();
    return keys;
  } catch (error) {
    console.error("Error fetching API keys:", error);
  }
};

const searchMovieHandle = async (event) => {
  event.preventDefault();

  const userSearch = document
    .querySelector('#movie-search')
    .value.trim()
    .replace(/\s+/g, '+');

  if (userSearch) {
    try {
      const keys = await getApiKeys();
      const OMDB_KEY = keys.OMDB_KEY;
      const WATCHMODE_KEY = keys.WATCHMODE_KEY;
      const movieResponse = await fetch(
        `https://www.omdbapi.com/?t=${userSearch}&apikey=${OMDB_KEY}`
      );
      if (!movieResponse.ok) throw new Error("Failed to fetch movie data");

      const movieInfo = await movieResponse.json();
      console.log(movieInfo);

      if (!movieInfo.imdbID) {
        console.error('IMDB ID not found in movie data');
        alert('Movie not found.');
        return;
      }

      const watchmodeResponse = await fetch(
        `https://api.watchmode.com/v1/title/${movieInfo.imdbID}/sources/?apiKey=${WATCHMODE_KEY}`
      );
      if (!watchmodeResponse.ok)
        throw new Error("Failed to fetch streaming sources");

      const watchmodeData = await watchmodeResponse.json();
      console.log(watchmodeData);
      
      const streamingSources = watchmodeData.slice(0, 5).map((source) => {
        return `<a href="${source.web_url}" target="_blank">${source.name}</a>`;
      });
      const formattedUrls = streamingSources.join("<br>");

      console.log("First 5 Streaming Service URLs:", streamingSources);


      const movieCardHTML = `
        <div class="card col-10 m-5">
          <div class="card-body row">
            <div class="col-1 d-flex align-items-center">
              <button class="btn btn-secondary addButton"data-imdbid="${movieInfo.imdbID}" data-title="${movieInfo.Title}" data-poster="${movieInfo.Poster}" data-plot ="${movieInfo.Plot}" data-urls="${streamingSources}">+</button>
            </div>
            <div class="col-2 d-flex align-items-center">
              <img
                src="${movieInfo.Poster}"
                class="img-fluid rounded-start"
                alt="${movieInfo.Title} Poster"
              />
            </div>
            <div class="col-6 m-4">
              <h3>Title: ${movieInfo.Title}</h3>
              <p>${movieInfo.Plot}</p>
              <p>Watch Here:<br> ${formattedUrls}</p>
            </div>
            <div class="col-2 d-flex align-items-center">
              <a class="btn btn-secondary" type="button" href="/reviews/new">
                Add Review
              </a>
            </div>
          </div>
        </div>
      `;


      const movieContainer = document.querySelector("#movie-container");
      if (movieContainer) {
        movieContainer.innerHTML = movieCardHTML;
      } else {
        console.error('Movie container element not found.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  }
};

const addMovieToProfile = async (event) => {
  const imdbMovieId = event.target.getAttribute('data-imdbid');
  const title = event.target.getAttribute('data-title');
  const poster = event.target.getAttribute('data-poster');
  const plot = event.target.getAttribute('data-plot');
  const urls = event.target.getAttribute('data-urls');

  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imdb_movieid: imdbMovieId, title, poster, plot, urls }),
    });

    if (response.ok) {
      alert('Movie added to profile!');
    } else {
      throw new Error('Failed to add movie to profile');
    }
  } catch (error) {
    console.error('Error adding movie to profile:', error);
    alert('An error occurred. Please try again.');
  }
};

document
  .querySelector('#submitBtn')
  .addEventListener('click', searchMovieHandle);
