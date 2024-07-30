// Middleware to check if a user is logged-in.  If not, it redirects them to the login page
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/users/login');
  } else {
    next();
  }
};

module.exports = withAuth;
