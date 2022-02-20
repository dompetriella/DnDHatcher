import React, { useState } from 'react';
import './charactersheet.css';

function AbilityScoreBox(props) {

    const [abilityScoreModifier, setAbilityScoreModifier] = useState()

    function calculateAbilityScoreModifier(num) {
        if (num < 2) return -5
        if (num < 4) return -4
        if (num < 6) return -3
        if (num < 8) return -2
        if (num < 10) return -1
        if (num < 12) return 0
        if (num < 14) return 1
        if (num < 16) return 2
        if (num < 18) return 3
        if (num < 20) return 4
        if (num < 22) return 5
        if (num < 24) return 6
        if (num < 26) return 7
        if (num < 28) return 8
        if (num < 30) return 9
        if (num >= 30) return 10
    }
    
    return (
        <div>
            <div className="ability-score-container">
                <div>{props.text}</div>
                <div>{props.abilityScore}</div>
                <div>{calculateAbilityScoreModifier(props.abilityScore)}</div>
            </div>
        </div>
    );
}

export default AbilityScoreBox;