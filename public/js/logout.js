// Logout functionality used on any page when a user is logged in
const logout = async () => {
  // destroys a logged-in session (done with /api/users/logout)
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // directs users to homepage when logged out
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Event listener on logout link in nav bar
document.querySelector('#logout').addEventListener('click', logout);
