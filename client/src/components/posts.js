import React from 'react';
import UpdateForm from './updateForm';
import './posts.css';

class UpdateButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: "",
      showForm: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  render() {
    if (!this.state.showForm) {
      return (
        <div>
          <input
            className="Update-button"
            name="update"
            value="Update"
            type="button"
            onClick={this.handleOnClick}
          />
        </div>
      );
    }
    return (
      <div className="update-container">
        <input
        className="Update-button"
          name="update"
          value="Cancel Update"
          type="button"
          onClick={this.handleOnClick}
        />
        <UpdateForm id={this.props.id} />
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
    super();
    this.state = {
      id: ""
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  render() {
    return (
      <div>
        <input
          className="Delete-button"
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
    return (
      <div>
        <ul className="Post">
          <li>
            <ul>
              <li className="Post-details">
                <div className="Post-date">
                  {this.props.date}
                </div>
              </li>
              <li className="Post-details">
                <div className="Post-title">
                  {this.props.title}
                </div>
              </li>
              <li className="Post-details">
                <div className="Post-content">
                  {this.props.content}
                </div>
              </li>
            </ul>
          </li>
          <li>
            <ul className="Post-buttons">
              <li className="Post-details">
                <DeleteButton className="button" id={this.props.id} />
              </li>
              <li className="Post-details">
                <UpdateButton className="button" id={this.props.id} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };
};

class Posts extends React.Component {
  constructor(props) {
    super();
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div className="Error">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="Loading-message">Loading...</div>;
    } else {
      return (
        <ul className="Posts-list">
          {items.reverse().map(item => (
            <li className="Post-item" key={item._id}>
              <Post id={item._id} date={new Intl.DateTimeFormat('en-GB', {
                dateStyle: "full",
                timeStyle: "short"
              }).format(Date.parse(item.time))} title={item.title} content={item.content} />
            </li>
          ))}
        </ul>
      );
    };
  };
};

export default Posts;