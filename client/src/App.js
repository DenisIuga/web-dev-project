import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Posts from './components/posts';
import PostForm from './components/postForm';
import UpdateForm from './components/updateForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create a new Post</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/create" component={PostForm}/>
          <Route path="/" component={Posts}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
