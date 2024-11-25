import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimalForm from "./components/AnimalForm";
import AnimalList from "./components/AnimalList";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="/add-animal" element={<AnimalForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;