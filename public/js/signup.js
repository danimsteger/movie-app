// signup functionality used on signup page
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Gathers inputs from signup form
  const name = document.querySelector('#inputName').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (name && email && password) {
    // Creates new user in database
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      if (email && password) {
        // creates logged-in session if email and password work - for the new user that was just created
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // directs user to /users/movies page if successfully logged in
          document.location.replace('/users/movies');
          console.log('this worked');
        } else {
          alert(response.statusText);
          console.log('this didnt work');
        }
      }
    } else {
      alert(response.statusText);
    }
  }
};

// Event listener for signup form submit button
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
