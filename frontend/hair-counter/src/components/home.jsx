import React, { useEffect, useState } from 'react';
import { getEntities } from './apiservice'; 

const Home = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await getEntities();
        setEntities(data);
      } catch (error) {
        console.error('Error fetching entities', error);
      }
    };

    fetchEntities();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-500 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Welcome to Hair Counter</h1>
        <p className="mt-4">Track and manage your hair count effortlessly</p>
      </header>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-8">
          <li>Track daily hair count</li>
          <li>View historical data and trends</li>
          <li>Set hair count goals</li>
          <li>Receive notifications and reminders</li>
        </ul>
      </section>

      {/* Entities */}
      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Entities</h2>
        {entities.length > 0 ? (
          <ul>
            {entities.map((entity) => (
              <li key={entity._id} className="text-gray-700">
                <h2 className="text-xl font-semibold">{entity.name}</h2>
                <p>{entity.description}</p>
                <p>Price: {entity.price}</p>
                <p>Category: {entity.category}</p>
                <p>Stock: {entity.stock}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No entities found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
