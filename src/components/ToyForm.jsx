import React, { Component } from 'react';

class ToyForm extends Component {
  state={
    name: '',
    image: '',
    likes: 0
  }
  changeHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
    },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(newToy => {
      this.setState({
        name: '',
        image: '',
        likes: 0
      })
      this.props.postToy(newToy)
      this.props.handleClick()
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.changeHandler} value={this.state.name}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.changeHandler} value={this.state.image}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
