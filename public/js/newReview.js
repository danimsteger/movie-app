// need to add in movie-id to make this work.

const newReview = async (event) => {
  try {
    event.preventDefault();

    const rating = document.querySelector(
      'input[name ="ratingOptions"]:checked'
    ).value;
    const content = document.querySelector('#reviewContent').value.trim();

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
