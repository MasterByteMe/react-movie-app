import { Client, Databases, ID, Query } from "appwrite"; // Import necessary modules from the Appwrite SDK

// Environment variables to store Appwrite project and database details
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Initialize the Appwrite client and configure it with the endpoint and project ID
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Set Appwrite API endpoint
  .setProject(PROJECT_ID); // Set project ID from environment variable

// Initialize the Appwrite database service
const database = new Databases(client);

// Function to update the search count in the database
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Check if the search term already exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm), // Query for existing search term
    ]);

    // 2. If the search term exists, update its count
    if (result.documents.length > 0) {
      const doc = result.documents[0]; // Get the first document that matches
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1, // Increment search count
      });
    } else {
      // 3. If the search term does not exist, create a new document
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm, // Store the search term
        count: 1, // Initialize count to 1
        movie_id: movie.id, // Store the movie ID
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Store movie poster URL
      });
    }
  } catch (error) {
    console.error(error); // Log any errors
  }
};

// Function to retrieve the top 5 trending movies based on search count
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5), // Limit results to top 5 trending movies
      Query.orderDesc("count"), // Order results by search count in descending order
    ]);

    return result.documents; // Return the list of trending movies
  } catch (error) {
    console.error(error); // Log any errors
  }
};
