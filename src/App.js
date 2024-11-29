import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddEditReview from "./pages/AddEditReview";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-review" element={<AddEditReview />} />
        <Route path="/edit-review/:id" element={<AddEditReview />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
