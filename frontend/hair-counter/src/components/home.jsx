import React from 'react';

const Home = () => {
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
    </div>
  );
};

export default Home;
