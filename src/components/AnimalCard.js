import React from "react";

const AnimalCard = ({ animal, onAdopt }) => {
  return (
    <div className="card">
      <img src={animal.imageURL} alt={animal.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{animal.name}</h5>
        <p className="card-text">
          <strong>Raza:</strong> {animal.breed}
        </p>
        <p>
          <strong>Peso:</strong> {animal.weight}
        </p>
        <p>
          <strong>Tamaño:</strong> {animal.size}
        </p>
        <p>
          <strong>Vacunado:</strong> {animal.vaccinated ? "Sí" : "No"}
        </p>
        <p>{animal.description}</p>
        <p>
          <strong>Contacto:</strong> {animal.contact}
        </p>
        {animal.adopted ? (
          <button className="btn btn-success btn-adopted w-100" disabled>
            Adoptado
          </button>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={() => onAdopt(animal.id)}
          >
            Marcar como Adoptado
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;