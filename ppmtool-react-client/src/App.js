import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import Createproject from "./pages/Createproject";
import Updateproject from './pages/Updateproject';
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/createproject" component={Createproject} />
          <Route exact path="/updateproject/:id" component={Updateproject} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
