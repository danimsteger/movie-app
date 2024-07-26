const searchMovieHandle = async (event) => {
  event.preventDefault();

  const userSearch = document
    .querySelector("#movie-search")
    .value.trim()
    .replace(/\s+/g, "+");

  if (userSearch) {
    try {
      // Fetch movie data from OMDb API
      const movieResponse = await fetch(
        `http://www.omdbapi.com/?t=${userSearch}&apikey=ab862f66`
      );
      if (!movieResponse.ok) throw new Error('Failed to fetch movie data');
      
      const movieInfo = await movieResponse.json();
      console.log(movieInfo);

      if (!movieInfo.imdbID) {
        console.error("IMDB ID not found in movie data");
        alert("Movie not found.");
        return;
      }

      // Fetch streaming sources from Watchmode API
      const watchmodeResponse = await fetch(
        `https://api.watchmode.com/v1/title/${movieInfo.imdbID}/sources/?apiKey=GlCQbCrN4AMSy6ZGxN1kzum8SALQx2A18YJSA02Q`
      );
      if (!watchmodeResponse.ok) throw new Error('Failed to fetch streaming sources');
      
      const watchmodeData = await watchmodeResponse.json();
      console.log(watchmodeData); // Log the response to inspect

      // Prepare streaming information: Show only the first 5 sources
      let streamingInfo = 'No streaming information available';
      if (watchmodeData && Array.isArray(watchmodeData.web_url)) {
        const streamingSources = watchmodeData.web_url;
        
        // Limit to the first 5 sources
        const firstFiveSources = streamingSources.slice(0, 5);
        if (firstFiveSources.length > 0) {
          streamingInfo = firstFiveSources.map(source => source.provider_name).join(', ');
        }
      }

      // Prepare the movie card HTML
      const movieCardHTML = `
        <div class="card col-10 m-5">
          <div class="card-body row">
            <div class="col-1 d-flex align-items-center">
              <button class="btn btn-secondary">+</button>
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
              <p>Watch Here: ${streamingInfo}</p>
            </div>
            <div class="col-2 d-flex align-items-center">
              <a class="btn btn-secondary" type="button" href="/reviews/new">
                Add Review
              </a>
            </div>
          </div>
        </div>
      `;

      // Insert the movie card into the movie container
      const movieContainer = document.querySelector("#movie-container");
      if (movieContainer) {
        movieContainer.innerHTML = movieCardHTML;
      } else {
        console.error("Movie container element not found.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  }
};

document
  .querySelector("#submitBtn")
  .addEventListener("click", searchMovieHandle);
