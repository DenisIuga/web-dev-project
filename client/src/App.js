import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Posts from './components/posts';
import PostForm from './components/postForm';

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
        <Route path="/create">
          <PostForm/>
        </Route>
        <Route path="/">
          <Posts/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
