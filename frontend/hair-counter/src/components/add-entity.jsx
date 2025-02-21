import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEntity, fetchEntities } from './apiservice'; // Import your API service

const AddEntity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [entities, setEntities] = useState([]); // State to hold the list of entities
  const history = useHistory();

  useEffect(() => {
    const getEntities = async () => {
      const fetchedEntities = await fetchEntities(); // Fetch existing entities
      setEntities(fetchedEntities);
    };
    getEntities();
  }, []); // Fetch entities on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntity = { name, description, price, category, stock };
      await addEntity(newEntity); // Call the API to add the entity
      setEntities([...entities, newEntity]); // Update the local state with the new entity
      history.push('/'); // Redirect to home after successful addition
    } catch (error) {
      console.error('Error adding entity', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Entity</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Entity
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6">Entity List</h2>
      <ul className="mt-4">
        {entities.map((entity, index) => (
          <li key={index} className="border-b py-2">
            <h3 className="font-semibold">{entity.name}</h3>
            <p>{entity.description}</p>
            <p>Price: ${entity.price}</p>
            <p>Category: {entity.category}</p>
            <p>Stock: {entity.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntity;