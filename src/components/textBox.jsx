import React from 'react';
import './menus.css';

function TextBox(props) {

    let buttonDiv = ""

    if (props.button) {
        buttonDiv = (<div 
            className="text-box-button" 
            onClick = {props.onClick}
            >{props.buttonText}
        </div>)
    }

  return (
    <div className="text-box-container">
        <div>{props.text}</div>
        {buttonDiv}
    </div>
  );
}

export default TextBox;