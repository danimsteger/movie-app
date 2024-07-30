const addMovieToProfile = async (event) => {
  const imdbMovieId = event.target.getAttribute("data-imdbid");
  const title = event.target.getAttribute("data-title");
  const poster = event.target.getAttribute("data-poster");
  const plot = event.target.getAttribute("data-plot");
  const urls = decodeURIComponent(event.target.getAttribute("data-urls"));

  if (!loggedIn) {
    document.location.replace('/users/login');
  } else {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        alert("Movie added to profile!");
        document.location.replace('/users/movies');
      } else if (response.status === 400) {
        alert("Movie already exists in profile.");
      } else {
        throw new Error("Failed to add movie to profile");
      }
    } catch (error) {
      console.error("Error adding movie to profile:", error);
      alert("An error occurred while adding the movie to your profile.");
    }
  }
};

document.querySelectorAll(".addButton").forEach(button => {
  button.addEventListener("click", addMovieToProfile);
});
