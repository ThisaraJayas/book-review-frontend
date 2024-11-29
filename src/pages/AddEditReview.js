import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddEditReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (id) {
      fetchReview();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/${id}`);
      setBookTitle(response.data.bookTitle);
      setAuthor(response.data.author);
      setRating(response.data.rating);
      setReviewText(response.data.reviewText);
    } catch (error) {
      console.error("Error fetching review:", error);
      alert("Failed to fetch review. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { bookTitle, author, rating, reviewText };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/reviews/${id}`, reviewData);
      } else {
        await axios.post("http://localhost:8080/reviews", reviewData);
      }
      navigate("/"); // Redirect to home page after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="bg-white p-8 m-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {id ? "Edit Review" : "Add Review"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-600">Book Title</label>
            <input
              type="text"
              placeholder="Enter Book Title"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">Author</label>
            <input
              type="text"
              placeholder="Enter Author Name"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Enter Rating (1-5)"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">Review Text</label>
            <textarea
              placeholder="Write your review"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            {id ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
