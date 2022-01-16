import React from 'react';
import './menus.css';

function Answer(props) {
  return (
    <div 
    className="answer-text-box"
    onClick = {props.onClick}
    >{props.text}
    </div>
  );
}

export default Answer;