const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#inputName').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();
try{
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      alert('account created')
      document.location.replace('/users/movies');
    } else {
      throw new Error("Failed to sign up");
    }
  }
  catch (error) {
    console.error("Error adding movie to profile:", error);
    alert("Movie already exist in profile");
  }
}
;
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
