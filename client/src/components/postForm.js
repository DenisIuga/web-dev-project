import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: "",
      content:""
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
    console.log(this.state.title + " " + this.state.content); //needs to be implemented to send data to server
    event.preventDefault();
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input name="title" type="text" value={this.state.value} onChange={this.handleInputChange}/>
        </label>
        <label>
          Content:
          <textarea name="content" value={this.state.value} onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  };
};

export default PostForm;