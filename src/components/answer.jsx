import React from 'react';
import './menus.css';

function Answer(props) {

    let onClickValue = () => {
        props.calculateAnswer(props.firstNature, props.secondNature, props.thirdNature)
    }

    if (props.mode === "alt") {
        onClickValue = () => {
            props.addAttribute(props.attribute, props.value)
        }
    }

    return (
        <div 
            className="answer-text-box"
            onClick = {onClickValue}
        >{props.text}
        </div>
    );
}

export default Answer;