import React from 'react';
import './menus.css';

function Answer(props) {
  return (
    <div className="answer-text-box">{props.text}</div>
  );
}

export default Answer;