import React from 'react';
import UpdateForm from './updateForm';

class UpdateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      showForm: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  render() {
    if(!this.state.showForm) {
      return(
        <div className="Update-button">
        <input 
        name="update"
        value="Update"
        type="button" 
        onClick={this.handleOnClick}
        />
      </div>
      );
    }
    return(
      <div className="Update-button">
        <input 
        name="update"
        value="Update"
        type="button" 
        onClick={this.handleOnClick}
        />
        <UpdateForm id={this.props.id}/>
      </div>
    );
  };

  handleOnClick(event) {
    this.setState((state) => ({
      showForm: !state.showForm
    }));
    event.preventDefault();
  };
};

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  render() {
    return(
      <div className="Delete-button">
        <input 
        name="delete"
        value="Delete"
        type="button" 
        onClick={this.handleOnClick}
        />
      </div>
    );
  };

  handleOnClick(event) {
    fetch(`http://localhost:5000/post/${this.props.id}/delete`, {
      method: 'POST',
      mode: 'cors',
    })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error('Oh, no! Error: ' + error);
    });
    event.preventDefault();
  };
};

class Post extends React.Component {
  render() {
    return(
      <div className="Post">
        <div className="Post-date">
          {this.props.id}
        </div>
        <div className="Post-date">
          {this.props.date}
        </div>
        <div className="Post-title">
          {this.props.title}
        </div>
        <div className="Post-content">
          {this.props.content}
        </div>
        <DeleteButton id={this.props.id}/>
        <UpdateButton id={this.props.id}/>
      </div>
    );
  };
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

  render() {
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
              <Post id={item._id} date={item.time} title={item.title} content={item.content}/>
            </li>
          ))}
        </ul>
      );
    };
  };
};

export default Posts;