import React from 'react';
import './menus.css';

function Question(props) {
  return (
    <main>
        <div>{props.text}</div>
    </main>
  );
}

export default Question;