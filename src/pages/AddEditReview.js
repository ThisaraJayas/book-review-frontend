import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddEditReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      bookTitle: "",
      author: "",
      rating: 1,
      reviewText: "",
    });
  
    useEffect(() => {
      if (id) fetchReview();
    }, [id]);
  
    const fetchReview = async () => {
      const response = await axios.get(`http://localhost:8080/reviews`);
      setFormData(response.data);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (id) {
        await axios.put(`http://localhost:8080/reviews/${id}`, formData);
      } else {
        await axios.post("http://localhost:8080/reviews", formData);
      }
      navigate("/");
    };
  
    return (
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            className="w-full p-2 border"
            value={formData.bookTitle}
            onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            className="w-full p-2 border"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            className="w-full p-2 border"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          <textarea
            placeholder="Review Text"
            className="w-full p-2 border"
            value={formData.reviewText}
            onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    );
}
