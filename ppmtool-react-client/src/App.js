import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import Createproject from "./pages/Createproject"
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/createproject" component={Createproject} />
      </div>
    </Router>
  );
}

export default App;
