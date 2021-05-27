import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let renderToys = () => { 
    return props.toyArr.map(toyObj => (
      <ToyCard key={toyObj.id} toyObj={toyObj} updateLikes={props.updateLikes} deleteToy={props.deleteToy}/>
    ))
  }

  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;
