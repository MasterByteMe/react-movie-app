import React from "react"; // Import the React library to enable JSX syntax and create functional components

// Define the MovieCard functional component, which receives a "movie" object as a prop
const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    // Main container for the movie card component
    <div className="movie-card">
      {/* Image section - displays the movie poster */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}` // Constructs the image URL using the TMDB API if a poster exists
            : "/no-movie.png" // Fallback image if no poster is available
        }
        alt={title} // Provides an alternative text for accessibility and SEO optimization
      />

      {/* Container for movie details like title, rating, language, and release year */}
      <div className="mt-4">
        {/* Displays the movie title inside an h3 tag for emphasis */}
        <h3>{title}</h3>

        {/* Wrapper div for additional movie details */}
        <div className="content">
          {/* Section for displaying the movie rating */}
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />{" "}
            {/* Star icon image to visually indicate rating */}
            <p>
              {
                vote_average
                  ? vote_average.toFixed(1) // Converts the rating to a fixed one decimal place if available
                  : "N/A" // Displays "N/A" if the rating is not provided
              }
            </p>
          </div>

          {/* Separator dot for better visual separation between details */}
          <span>•</span>

          {/* Displays the original language of the movie. 
          Shows the movie's language in abbreviated example: en */}

          <p className="lang">{original_language}</p>

          <span>•</span>

          {/* Displays the release year of the movie by extracting the year from the release_date */}
          <p className="year">
            {
              release_date
                ? release_date.split("-")[0] // Splits the release_date string and takes only the year portion
                : "N/A" // If the release date is missing, display "N/A"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
