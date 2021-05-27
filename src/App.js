import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toyArr: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount = async () => {
    try {
      const promise = await fetch('http://localhost:3000/toys')
      const json = await promise.json()
      this.setState({
        toyArr: json
      })
    } catch (err) {
      console.log(err)
    }
  }
  postToy = (newToy) => {
    let newToyArr = [...this.state.toyArr, newToy]
    this.setState({
      toyArr: newToyArr
    })
  }
  updateLikes = (updatedToy) => {
    this.state.toyArr.map(toy => {
      if(toy.id === updatedToy.id){
        return updatedToy
      } else {
        return toy
      }
    })
  }
  deleteToy = (deletedToyID) => {
    let newToyArr = this.state.toyArr.filter(toy => {
      return toy.id !== deletedToyID
      })
      this.setState({
        toyArr: newToyArr
      })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm postToy={this.postToy} handleClick={this.handleClick}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toyArr={this.state.toyArr} updateLikes={this.updateLikes} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
