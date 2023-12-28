// create dashboard page component
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Dashboard</h1>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;