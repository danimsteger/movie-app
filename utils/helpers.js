module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  review_stars: (rating) => {
    // Helper function to generate stars based on review rating
    let stars = '';
    for (let i = 1; i <= rating; i++) {
      stars += '⭐'; // Add a star for each rating number
    }
    return stars;
  },
  // Helper function to parse the urls from a string to an array and then adds a line break in between them to display them stacked on top of each other
  formattedUrls: (formattedUrls) => {
    let urlsArray = JSON.parse(formattedUrls);
    return urlsArray.join('<br>');
  },
};
