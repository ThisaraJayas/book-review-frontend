import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Home() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetchReviews();
    }, []);
  
    const fetchReviews = async () => {
      const response = await axios.get("http://localhost:8080/reviews");
      setReviews(response.data);
    };
  
    const deleteReview = async (id) => {
      await axios.delete(`http://localhost:8080/reviews/${id}`);
      fetchReviews();
    };
  
    return (
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Book Reviews</h2>
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{review.bookTitle}</h3>
              <p>Author: {review.author}</p>
              <p>Rating: {review.rating}/5</p>
              <p>{review.reviewText}</p>
              <p className="text-sm text-gray-500">Added: {review.dateAdded}</p>
              <div className="mt-2 space-x-2">
                <Link to={`/edit-review/${review.id}`} className="text-blue-500">
                  Edit
                </Link>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
