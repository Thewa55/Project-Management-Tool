import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard"
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
