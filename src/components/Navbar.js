import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-700 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-white tracking-wide hover:text-gray-200 transition duration-300">
            <Link to="/">Book Review</Link>
          </h1>
  
          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/add-review"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
            >
              Add Review
            </Link>
          </div>
        </div>
      </nav>
      );
}
