// Login functionality used on login page
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Gathers inputs for email and password
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (email && password) {
    // creates logged-in session if email and password work (checked in the api/users/login route)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // directs users to /users/movies page if successfully logged in
      document.location.replace('/users/movies');
      console.log('this worked');
    } else {
      alert(response.statusText);
      console.log('this didnt work');
    }
  }
};

// Event listener for login submit button
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
