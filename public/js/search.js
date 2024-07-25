let userSearch = document.querySelector("#movie-search").value.trim();
console.log(userSearch);

const searchMovieHandle = async (event) => {
  event.preventDefault();

  console.log("button clicked");

  const userSearch = document
    .querySelector("#movie-search")
    .value.trim()
    .replace(/\s+/g, "+");

  if (userSearch) {
    newURL = `http://www.omdbapi.com/?t=${userSearch}&apikey=ab862f66`;
    console.log(newURL);
    const data = await fetch(newURL);
    if (data.ok) {
        console.log(data);
        const movieInfo = await data.json();
        console.log(movieInfo);
        return movieInfo;
    } else {
      alert("Failed to get movie data");
    }
  }
};

document
  .querySelector("#submitBtn")
  .addEventListener("click", searchMovieHandle);
