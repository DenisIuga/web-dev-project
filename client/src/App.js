import React from 'react';
import './App.css';
import Posts from './components/posts';
import PostForm from './components/postForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Posts/>
        <PostForm/>
      </header>
    </div>
  );
}

export default App;
