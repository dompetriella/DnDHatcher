import React from 'react';
import './menus.css';

function TextBox(props) {
  return (
    <main className="text-box-container">
        <div>{props.text}</div>
        <div 
            className="text-box-next-button" 
            onClick = {props.onClick}
            >{props.buttonText}
        </div>
    </main>
  );
}

export default TextBox;