import React, { useState } from "react";
import AnimalCard from "./AnimalCard";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);

//   const addAnimal = (animal) => {
//     setAnimals([...animals, animal]);
//   };

  const markAsAdopted = (id) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === id ? { ...animal, adopted: true } : animal
      )
    );
  };

  return (
    <div>
      <h2>Animales en Adopción</h2>
      {animals.length === 0 ? (
        <p>No hay animales disponibles en este momento.</p>
      ) : (
        animals.map((animal, index) => (
          <AnimalCard
            key={index}
            animal={{ ...animal, id: index }}
            onAdopt={markAsAdopted}
          />
        ))
      )}
    </div>
  );
};

export default AnimalList;