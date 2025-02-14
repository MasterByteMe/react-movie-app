<div align = "center">

<div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

<h2 align="center">Movie Search App</h2>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Project Overview](#project-overview)
2. ⚙️ [Tech Stack](tech-stack)
3. 🔋 [Features](features)
4. 🛠️ [Installation and Setup](installation-setup)
5. 🗃️ [Component Overview](component-overview)
6. 🚀 [Usage Guide](usage-guide)

## <a name="project-overview">🤖 Project Overview</a>

The Movie Search App is a React-based web application that allows users to search for movies using The Movie Database (TMDB) API. Users can view movie details such as the title, rating, release year, and language

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Tailwind CSS (or any chosen styling framework)
- The Movie Database (TMDB) API
- Appwrite (for database and collections)

## <a name="features">🔋 Features</a>

👉 **Browse All Movies**: Explore a wide range of movies available on the platform.

👉 **Search Movies**: Easily search for specific movies using a search function.

👉 **Trending Movies Algorithm**: Displays trending movies based on a dynamic algorithm.

👉 **Modern UI/UX**: A sleek and user-friendly interface designed for a great experience.

👉 **Responsiveness**: Fully responsive design that works seamlessly across devices.

and many more, including code architecture and reusability

## <a name="installation-setup">🛠️ Installation and Setup</a>

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [TMDB API Key](https://developer.themoviedb.org/docs/getting-started)

**Cloning the Repository**

```bash
git clone git@github.com:MasterByteMe/react-movie-app.git
cd vite-movie-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

Replace the placeholder values with your actual **[TheMovieDatabase API](https://developer.themoviedb.org/reference/intro/getting-started)** and **[Appwrite](https://apwr.dev/JSM050)** credentials. You can obtain these credentials by signing up on the [TheMovieDatabase](https://developer.themoviedb.org/reference/intro/getting-started) and creating a new project on the [Appwrite](https://apwr.dev/JSM050)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## <a name="component-overview">🗃️ Component Overview</a>

**MovieCard.jsx**

- Displays movie details such as:
- Movie poster
- Title
- Rating
- Language
- Release Year
- Uses TMDB image API for fetching movie posters.
- Fallback for missing posters (/no-movie.png).

**Search.jsx**

= Contains a search bar with an input field.

- Takes searchTerm as a controlled state.
- Calls setSearchTerm on input change.

**Spinner.jsx**

- Displays a loading spinner while fetching data.
- Uses an SVG for smooth animation.

## <a name="usage-guide">🚀 Usage Guide</a>

Searching for a Movie

1. Enter a movie name in the search bar.
2. The application fetches results from TMDB.
3. Results display in the form of MovieCard components.

Movie Details Display

- Each result shows the movie poster, title, rating language, and release year.

**API Integration**

TMDB API

- Base URL: https://api.themoviedb.org/3
- Endpoint used:

```bash
https://api.themoviedb.org/3/search/movie?api_key=VITE_TMDB_API_KEY&query=movie_name
```

Image URL:

```bash
https://image.tmdb.org/t/p/w500/{poster_path}

```

**Fetching Data Example**

```bash
const fetchMovies = async (searchQuery) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}`
  );
  const data = await response.json();
  return data.results;
};

```

   <img src="/src/assets/movie-app.png" alt="Screenshot Movie App Page">
