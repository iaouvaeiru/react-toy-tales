import React, { Component } from 'react';

class ToyCard extends Component {
  state = {
    likes: this.props.toyObj.likes
  }

  handlePost = (evt) => {   
    let newLikes = this.state.likes += 1
    this.setState({
      likes: newLikes
    }) 
    fetch(`http://localhost:3000/toys/${this.props.toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(updatedToy => {
      this.props.updateLikes(updatedToy)
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/toys/${this.props.toyObj.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      this.props.deleteToy(this.props.toyObj.id)
    })
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={this.handlePost}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
