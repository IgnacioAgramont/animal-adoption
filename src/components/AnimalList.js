import React, { useState, useEffect } from "react";
import s3 from "../awsConfig";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalsFile = "animals/animals.json";
        const data = await s3
          .getObject({
            Bucket: "agramont-animal-adoption",
            Key: animalsFile,
          })
          .promise();
        const animals = JSON.parse(data.Body.toString());
        setAnimals(animals);
      } catch (error) {
        console.error("Error al cargar los animales:", error);
        setAnimals([]); // Si no hay archivo, dejamos la lista vacía
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div>
      <h2>Animales Publicados</h2>
      {animals.length === 0 ? (
        <p>No hay animales publicados aún.</p>
      ) : (
        <div className="row">
          {animals.map((animal, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={animal.imageURL}
                  alt={animal.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{animal.name}</h5>
                  <p className="card-text">Raza: {animal.breed}</p>
                  <p className="card-text">Tamaño: {animal.size}</p>
                  <p className="card-text">Vacunado: {animal.vaccinated ? "Sí" : "No"}</p>
                  <p className="card-text">{animal.description}</p>
                  <p className="card-text">Contacto: {animal.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalList;