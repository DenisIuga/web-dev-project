import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Posts from './components/posts';
import PostForm from './components/postForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">rainy web app</header>
        <ul className="App-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/create" component={PostForm} />
          <Route path="/" component={Posts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
