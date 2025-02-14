import React from "react"; // Import the React library to use JSX and create functional components

// Define the Search functional component, which receives searchTerm and setSearchTerm as props
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    // Container div for the search component
    <div className="search">
      <div>
        {/* Search icon to visually indicate the input field's purpose */}
        <img src="search.svg" alt="search logo" />

        {/* Input field for users to type their search queries */}
        <input
          type="text" // Specifies the input type as text
          placeholder="Search through thousands of movies" // Placeholder text to guide the user
          value={searchTerm} // Binds the input value to the searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Updates searchTerm state on user input
        />
      </div>
    </div>
  );
};

export default Search;
