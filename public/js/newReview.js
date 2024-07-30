// Event listener for function for dynamically created elements
document.addEventListener('DOMContentLoaded', function () {
  // gathers parameters from url
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movieId');

  // gathers movie information by gatherng attributes of certain elements
  fetch(`/api/movies/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
      document.getElementById('movie-title').textContent = movie.title;
      document.getElementById('movie-poster').src = movie.poster;
      document.getElementById('movie-poster').alt = movie.title + ' Poster';
    })
    .catch((error) => console.error('Error fetching movie details:', error));
});

// new review functionality used on new review page
const newReview = async (event) => {
  try {
    event.preventDefault();

    // Gathers review rating and review content
    const rating = document.querySelector(
      'input[name ="ratingOptions"]:checked'
    ).value;
    const content = document.querySelector('#reviewContent').value.trim();

    // Gathers movie_id from url
    const urlParams = new URLSearchParams(window.location.search);
    const movie_id = urlParams.get('movieId');

    if (rating && content) {
      // Creates a new review from inputed information and url
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          rating,
          review: content,
          movie_id: movie_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // if review is created, directs users to that specific movie's page
        document.location.replace(`/movies/${movie_id}`);
      } else {
        alert('Failed to add Review');
      }
    } else {
      alert('Failed to Add new Review!!');
    }
  } catch (err) {
    console.error('Error in submitting new review', err);
  }
};

// Event listener for submit button on new review form
document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReview);
