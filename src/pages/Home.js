import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("rating-desc");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sortedReviews = [...reviews];
    if (e.target.value === "rating-desc") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (e.target.value === "rating-asc") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (e.target.value === "date-desc") {
      sortedReviews.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (e.target.value === "date-asc") {
      sortedReviews.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    }
    setReviews(sortedReviews);
  };

  return (
    <div className="container mx-auto mt-8 px-4 mb-10">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
        Book Reviews
      </h2>
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-medium text-gray-600">
          Total Reviews: {reviews.length}
        </p>
        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Sort By
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="appearance-none border rounded-lg px-4 py-2 text-gray-700 bg-white shadow-md focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
          >
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="date-desc">Date Added (Newest First)</option>
            <option value="date-asc">Date Added (Oldest First)</option>
          </select>
          <div className="absolute right-3 top-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {review.bookTitle}
            </h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Author:</span> {review.author}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Rating:</span> ⭐ {review.rating}/5
            </p>
            <p className="text-gray-700 mb-3">{review.reviewText}</p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium">Added on:</span>{" "}
              {new Date(review.dateAdded).toLocaleDateString()}
            </p>
            <div className="flex space-x-4">
              <Link
                to={`/edit-review/${review.id}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteReview(review.id)}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {reviews.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No reviews available. Add one to get started!
        </p>
      )}
    </div>
  );
}
