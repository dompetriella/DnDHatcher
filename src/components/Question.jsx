import React from 'react';
import './menus.css';

function Question(props) {
  return (
    <div className="question-text-box">{props.text}</div>
  );
}

export default Question;