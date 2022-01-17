import React from 'react';
import './menus.css';

function Answer(props) {
  return (
    <div 
    className="answer-text-box"
    onClick = {() => props.calculateAnswer(props.firstNature, props.secondNature, props.thirdNature, props.background)}
    >{props.text}
    </div>
  );
}

export default Answer;