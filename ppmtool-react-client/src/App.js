import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import Createproject from "./pages/Createproject";
import Updateproject from './pages/Updateproject';
import Projectboard from './pages/Projectboard';
import Createtask from './pages/Createtask';
import Updatetask from './pages/Updatetask';
import Signup from './pages/Signup';
import Login from './pages/Login';
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
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/createproject" component={Createproject} />
          <Route exact path="/updateproject/:id" component={Updateproject} />
          <Route exact path="/projectboard/:id" component={Projectboard} />
          <Route exact path="/createtask/:id" component={Createtask} />
          <Route exact path="/updatetask/:id/:task_id" component={Updatetask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
