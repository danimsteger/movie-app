document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movieId');

  fetch(`/api/movies/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      document.getElementById('movie-title').textContent = movie.title;
      document.getElementById('movie-poster').src = movie.poster;
      document.getElementById('movie-poster').alt = movie.title + ' Poster';
    })
    .catch(error => console.error('Error fetching movie details:', error));
});

const newReview = async (event) => {
  try {
    event.preventDefault();

    const rating = document.querySelector(
      'input[name ="ratingOptions"]:checked'
    ).value;
    const content = document.querySelector('#reviewContent').value.trim();

    console.log('rating', rating);
    console.log('content', content);

    if (rating && content) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          rating,
          content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/');
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

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReview);
