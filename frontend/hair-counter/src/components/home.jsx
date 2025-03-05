import React, { useEffect, useState } from 'react';
import { getEntities, getUsers, getEntitiesByUser } from './apiservice'; 
import { useHistory } from 'react-router-dom'; // Import useHistory

const Home = () => {
  const [entities, setEntities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchUsersAndEntities = async () => {
      try {
        const userData = await getUsers(); // Fetch all users
        setUsers(userData);

        const entityData = await getEntities(); // Fetch all entities
        setEntities(entityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndEntities();
  }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);

    if (userId) {
      try {
        const filteredEntities = await getEntitiesByUser(userId); // Fetch entities by selected user
        setEntities(filteredEntities);
      } catch (error) {
        console.error('Error fetching entities for user:', error);
      }
    } else {
      // If no user is selected, fetch all entities
      try {
        const allEntities = await getEntities();
        setEntities(allEntities);
      } catch (error) {
        console.error('Error fetching all entities:', error);
      }
    }
  };

  // Function to handle navigation to the Add Entity page
  const handleAddEntity = () => {
    history.push('/add-entity'); // Change this path to your actual add entity route
  };

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

      {/* User Dropdown */}
      <div className="my-4">
        <label htmlFor="userDropdown" className="block font-semibold mb-2">
          Filter by User:
        </label>
        <select
          id="userDropdown"
          value={selectedUserId}
          onChange={handleUserChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {/* Button to go to Add Entity page */}
      <div className="my-4">
        <button 
          onClick={handleAddEntity} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Entity
        </button>
      </div>

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
