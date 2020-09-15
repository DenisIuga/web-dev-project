import React from 'react';
import './postForm.css';

class PostForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      content: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    const data = this.state;
    fetch("http://localhost:5000/post/create", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        response.json();
      })
      .catch((error) => {
        console.error('Oh, no! Error: ' + error);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="form-container">
        <form className="Post-form" onSubmit={this.handleSubmit}>
          <label>Title:</label>
          <input
            name="title"
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
            required
            minLength="5"
            maxLength="100"
          />
          <label>Content:</label>
          <textarea
            name="content"
            value={this.state.value}
            onChange={this.handleInputChange}
            required
            minLength="5"
            maxLength="500"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
};

export default PostForm;