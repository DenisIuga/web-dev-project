import React from 'react';

class Post extends React.Component {
  render(){
    return(
      <div className="Post">
        <div className="Post-date">
          {this.props.date}
        </div>
        <div className="Post-title">
          {this.props.title}
        </div>
        <div className="Post-content">
          {this.props.content}
        </div>
      </div>
    );
  }
};

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  };

  componentDidMount() {
    fetch("http://localhost:5000/posts", {
      method: 'GET',
      mode: 'cors'
    })
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  };

  render(){
    const {error, isLoaded, items} = this.state;
    if(error) {
      return <div className="Error">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="Loading-message">Loading...</div>;
    } else {
      return (
        <ul className="Posts-list">
          {items.map(item => (
            <li className="Post-item" key={item._id}>
              <Post date={item.time} title={item.title} content={item.content}/>
            </li>
          ))}
        </ul>
      );
    };
  };
};

export default Posts;