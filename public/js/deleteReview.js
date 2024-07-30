const deleteReview = async (event) => {
  event.preventDefault();
  try {
    const review_id = event.target.getAttribute('data-reviewId');

    const response = await fetch(`/api/reviews/${review_id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/users/reviews');
    } else {
      alert('failed to delete review!');
    }
  } catch (err) {
    console.error('error in deleting review');
  }
};

document.querySelector('#delete-btn').addEventListener('click', (event) => {
  if (event.target.classList.contains('dlt-btn')) {
    deleteReview(event);
  }
});
