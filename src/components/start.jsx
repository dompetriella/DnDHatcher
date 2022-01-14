import React from 'react';
import './menus.css';

const Start = (props) => {
  return (
    <main className = "start-menu">
        <div 
            className = "hatcher-title-container">DnD Hatcher
        </div>

        <div 
            className = "hatcher-mode-option"
            onClick = {props.beginQuiz}
            >Quiz Character Generator (WIP)
        </div>

        <div 
            className="hatcher-mode-option easy-mode">Easy Character Maker (WIP)
        </div>
    </main>
  );
}

export default Start;