import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: "",
      content:"",
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
      redirect: 'follow',
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
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input 
            name="title"
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange}
            required
            minLength="5"
            maxLength="100"
          />
        </label>
        <label>
          Content:
          <textarea 
            name="content"
            value={this.state.value}
            onChange={this.handleInputChange}
            required
            minLength="5"
            maxLength="500"
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  };
};

export default PostForm;