// Adding a movie functionality used on individual movie pages
const addMovieToProfile = async (event) => {
  // Gathers information about movie stored in the "+" button attributes
  const imdbMovieId = event.target.getAttribute('data-imdbid');
  const title = event.target.getAttribute('data-title');
  const poster = event.target.getAttribute('data-poster');
  const plot = event.target.getAttribute('data-plot');
  const urls = decodeURIComponent(event.target.getAttribute('data-urls'));

  // If not logged-in, redirected to login page
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
        alert('Movie added to profile!');
        // if movie is added, directs users to /users/movies page
        document.location.replace('/users/movies');
      } else if (response.status === 400) {
        alert('Movie already exists in profile.');
      } else {
        throw new Error('Failed to add movie to profile');
      }
    } catch (error) {
      console.error('Error adding movie to profile:', error);
      alert('An error occurred while adding the movie to your profile.');
    }
  }
};

// Event listener on "+" buttons
document.querySelectorAll('.addButton').forEach((button) => {
  button.addEventListener('click', addMovieToProfile);
});
