import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AnimalForm from "./components/AnimalForm";
import AnimalList from "./components/AnimalList";

function App() {
  const [animals, setAnimals] = useState([]); // Estado para almacenar la lista de animales

  // Función para agregar un nuevo animal
  const addAnimal = (newAnimal) => {
    setAnimals([...animals, newAnimal]); // Actualiza la lista de animales
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Pasamos la lista de animales a AnimalList */}
          <Route path="/" element={<AnimalList animals={animals} />} />
          {/* Pasamos la función addAnimal como onNewAnimal a AnimalForm */}
          <Route path="/add-animal" element={<AnimalForm onNewAnimal={addAnimal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;