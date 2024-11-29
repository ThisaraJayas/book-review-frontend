import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-lg font-bold">Book Review</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/add-review" className="hover:underline">
                Add Review
              </Link>
            </div>
          </div>
        </nav>
      );
}
