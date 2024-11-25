import React, { useState } from "react";
import s3 from "../awsConfig";

const AnimalForm = ({ onNewAnimal }) => {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    weight: "",
    size: "Pequeño",
    vaccinated: false,
    description: "",
    contact: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Por favor, sube una imagen.");
      return;
    }

    const params = {
      Bucket: "agramont-animal-adoption",
      Key: `animals/${image.name}`,
      Body: image,
    };

    try {
      const data = await s3.upload(params).promise();
      const imageURL = data.Location;

      const newAnimal = { ...formData, imageURL, adopted: false };
      onNewAnimal(newAnimal);
      alert("Animal publicado exitosamente!");

      setFormData({
        name: "",
        breed: "",
        weight: "",
        size: "Pequeño",
        vaccinated: false,
        description: "",
        contact: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Hubo un problema al subir la imagen.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Animal</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            value={formData.name}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Raza</label>
          <input
            name="breed"
            placeholder="Raza"
            onChange={handleChange}
            value={formData.breed}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Peso</label>
          <input
            name="weight"
            placeholder="Peso"
            onChange={handleChange}
            value={formData.weight}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tamaño</label>
          <select
            name="size"
            onChange={handleChange}
            value={formData.size}
            className="form-select"
          >
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label me-2">Vacunado</label>
          <input
            type="checkbox"
            name="vaccinated"
            checked={formData.vaccinated}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            value={formData.description}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Contacto</label>
          <input
            name="contact"
            placeholder="Número de contacto"
            onChange={handleChange}
            value={formData.contact}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Subir
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;