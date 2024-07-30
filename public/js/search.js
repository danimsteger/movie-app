// Gathers API keys
const getApiKeys = async () => {
  try {
    const response = await fetch('/api/keys');
    if (!response.ok) throw new Error('Failed to fetch API keys');
    const keys = await response.json();
    return keys;
  } catch (error) {
    console.error('Error fetching API keys:', error);
  }
};

// Search movies via API functionality used on search page
const searchMovieHandle = async (event) => {
  event.preventDefault();

  // gathers what users input in search bar
  const userSearch = document
    .querySelector('#movie-search')
    .value.trim()
    .replace(/\s+/g, '+');

  if (userSearch) {
    try {
      // gathers api keys and uses enviornment variables
      const keys = await getApiKeys();
      const OMDB_KEY = keys.OMDB_KEY;
      const WATCHMODE_KEY = keys.WATCHMODE_KEY;

      // fetches omdbapi search results based on what user searched
      const movieResponse = await fetch(
        `https://www.omdbapi.com/?t=${userSearch}&apikey=${OMDB_KEY}`
      );
      if (!movieResponse.ok) throw new Error('Failed to fetch movie data');

      const movieInfo = await movieResponse.json();
      console.log(movieInfo);

      if (!movieInfo.imdbID) {
        // Alerts users if no movie was found
        console.error('IMDB ID not found in movie data');
        alert('Movie not found.');
        return;
      }

      // fetches watchmode API with imdbmovie id gathered from previous api search
      const watchmodeResponse = await fetch(
        `https://api.watchmode.com/v1/title/${movieInfo.imdbID}/sources/?apiKey=${WATCHMODE_KEY}`
      );

      if (!watchmodeResponse.ok)
        throw new Error('Failed to fetch streaming sources');

      const watchmodeData = await watchmodeResponse.json();
      console.log(watchmodeData);

      // takes results of watchmode api fetch and returns them as links
      const streamingSources = watchmodeData.slice(0, 5).map((source) => {
        return `<a href="${source.web_url}" target="_blank">${source.name}</a>`;
      });

      // adds line breaks between urls to display stacked on top of each other
      const formattedUrls = streamingSources.join('<br>');

      console.log('First 5 Streaming Service URLs:', streamingSources);

      // creates html for the movie card with gathered information from the two apis
      const movieCardHTML = `
        <div class="card col-10 m-5">
          <div class="card-body row">
            <div class="col-2 d-flex align-items-center ml-5 justify-content-center">
              <button class="btn btn-secondary addButton ml-5"
              data-imdbid="${movieInfo.imdbID}"
              data-title="${movieInfo.Title}"
              data-poster="${movieInfo.Poster}"
              data-plot ="${movieInfo.Plot}"
              data-urls="${encodeURIComponent(
                JSON.stringify(streamingSources)
              )}">+</button>
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
            </div>
          </div>
        </div>
      `;

      const movieContainer = document.querySelector('#movie-container');
      // displays moviecard html with movie information in the movie-container on the 'search' page
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

// Add movie to profile functionality used on the search page
const addMovieToProfile = async (event) => {
  // Gathers information about the movie stored in the "+" button attributes
  const imdbMovieId = event.target.getAttribute('data-imdbid');
  const title = event.target.getAttribute('data-title');
  const poster = event.target.getAttribute('data-poster');
  const plot = event.target.getAttribute('data-plot');
  const urls = decodeURIComponent(event.target.getAttribute('data-urls'));

  // if not logged-in, redirecto to login page
  if (!loggedIn) {
    document.location.replace('/users/login');
  } else {
    try {
      // Posts movie information gathered from the "+" button attributes
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imdb_movieid: imdbMovieId,
          title,
          poster,
          plot,
          urls,
        }),
      });

      if (response.ok) {
        // if movie is added, direct users to /users/movies page
        alert('Movie added to profile!');
        document.location.replace('/users/movies');
      } else {
        throw new Error('Failed to add movie to profile');
      }
    } catch (error) {
      console.error('Error adding movie to profile:', error);
      alert('Movie already exist in profile');
    }
  }
};

// event listener for search submit button
document
  .querySelector('#submitBtn')
  .addEventListener('click', searchMovieHandle);

// event listener for movie container where moviehtml card is populated
document
  .querySelector('#movie-container')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('addButton')) {
      addMovieToProfile(event);
    }
  });
