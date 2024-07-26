const addMovie = async (event) => {
  try {
    console.log('step 2 worked!!');
  } catch (err) {
    console.error('Error in Adding Movie', err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const addMovieButton = document.querySelector('.addButton');

  if (addMovieButton) {
    console.log('I clicked add movie button!');
    addMovieButton.addEventListener('click', addMovie);
  }
});
