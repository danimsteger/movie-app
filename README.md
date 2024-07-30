# ReelTime 🎬

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project involved creating a full-stack application from scratch that is an interactive movie review social media site. This web application allows users to search for movies, add them to their profile, and write and view reviews for those movies. This project followed MVC paradigm, and was created using JavaScript, Express, a Sequelize database, and Handlebars. Additionally, OMDb and Watch Mode APIs were used, along with Bootstrap for styling.

This page was deployed with Render and can be viewed [here](https://movie-app-uu6k.onrender.com).

---

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

---

---

## Installation

### Clone this repository

```
git clone git@github.com:danimsteger/movie-app.git
```

### Go into this repository

```
cd movie-app
```

### Access code of the repository

```
code .
```

### Install Necessary Dependencies on local device

```
npm install
```

---

---

## Usage

To view the program, navigate to the cloned repository and run the following command in your terminal to invoke the application:

```
npm start
```

From there, you can visit the local host link: [http://localhost:3001](http://localhost:3001)

You can also view the application by directly going to the deployed page via Render by clicking [here](https://movie-app-uu6k.onrender.com).

The page will initally load previously posted reviews. Users can click on any of the movie titles or posters and be brought to that movies individual page.

![Sample View of home page](/images/homepage.png)

Users are able to view the homepage and search for movies without an account or logging in. However, to add a movie to your profile or write a review, users will be directed to the Login/Signup page if they are not already logged in.

![Sample view of the login page](/images/login2.png)

On the search page, a user is able to search for a movie within the OMDb API, and the first movie matching the search will appear. The movie's title, poster, plot, and links to view on different streaming services will appear. If a user is logged in, they can click the "+" button to add that movie to their profile.

![Sample view of search](/images/search.png)

Users can go the "Account" page to view a list of their added movies and reviews. 'My Movies' will show users all movies that they have added to their profile and will give them a button to review each movie.

![sample view of My Movies page](/images/myMovies.png)

If a user clicks a 'Review' button, they will be brought to a new review form for that movie. They will be able to see the movie's title and poster and can select a rating 1 through 5 ⭐'s and write a review.

![sample view of new review form](/images/newReview.png)

Once the 'Post Review' button is clicked, the review will be added to the database and users will be taken to that movie's page. There, they will see the movie, the movie's plot, poster, and links to watch. Additionally, any reviews written for that movie will be shown underneath.

![Sample view of individual movie page](/images/moviePage.png)

Users can view all of their reviews on the 'Account Page' under 'My Reviews.' On that page, they will also have the option to delete one of their previously written reviews.

![Sample view of my reviews page](/images/myReviews.png)

---

---

## Credits

This project was created by Danielle Steger, Kevin Hoang, and Summer Hardison. To complete this project, several resources were referenced, adopted, and modified. Specifically, materials provided in Modules 9-14 of edX Boot Camps LLC were referenced and modified. Additionally, several articles on "MDN Web Docs" and "W3Schools" were referenced. This project was completed with the use of node, Sequelize, Express, and Bootstrap and their corresponding documentation was referenced as well.

---

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
