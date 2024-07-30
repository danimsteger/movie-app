// Delete a review functionality used on the 'My Reviews' page

const deleteReview = async (event) => {
  event.preventDefault();
  try {
    // Gets id of the review stored in it's 'Delete' button as a custom attribute
    const review_id = event.target.getAttribute('data-reviewId');

    // Deletes corresponding review
    const response = await fetch(`/api/reviews/${review_id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // if it deletes, directs users back to /users/reviews page
      document.location.replace('/users/reviews');
    } else {
      alert('failed to delete review!');
    }
  } catch (err) {
    console.error('error in deleting review');
  }
};

// Event listener on delete buttons
document.querySelector('#delete-btn').addEventListener('click', (event) => {
  if (event.target.classList.contains('dlt-btn')) {
    deleteReview(event);
  }
});
