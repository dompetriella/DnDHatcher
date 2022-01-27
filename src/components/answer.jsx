import React from 'react';
import './menus.css';

function Answer(props) {

    const onClickValue = () => {(props.calculateAnswer(props.firstNature, props.secondNature, props.thirdNature)
    )}

    if (props.mode === "alt") {
        onClickValue = () => {
            console.log("apply")
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