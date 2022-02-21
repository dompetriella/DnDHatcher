import React from 'react';
import AbilityScoreBox from './AbilityScoreBox'
import './charactersheet.css';

function ResultsPage(props) {

    function capitalStr(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

const getRaceImage = (userRace) => {
    let image = {link: "", alt: ""}
    switch (userRace) {
                
        case 'dragonborn':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png"
            image.alt = "dragonborn picture"
            break;
            
        case 'dwarf':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/254/420/618/636271781394265550.png"
            image.alt = "dwarf picture"
            break;
            
        case 'elf':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/7/639/420/618/636287075350739045.png"
            image.alt = "elf picture"
            break;
            
        case 'gnome':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/334/420/618/636272671553055253.png"
            image.alt = "gnome picture"
            break;
            
        case 'half-elf':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png"
            image.alt = "half-elf picture"
            break;
            
        case 'halfling':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/256/420/618/636271789409776659.png"
            image.alt = "halfling picture"
            break;
            
        case 'half-orc':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/466/420/618/636274570630462055.png"
            image.alt = "half-orc picture"
            break;
            
        case 'human':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/258/420/618/636271801914013762.png"
            image.alt = "human picture"
            break;
            
        case 'tiefling':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/7/641/420/618/636287076637981942.png"
            image.alt = "tiefling picture"
            break;
            
    default:
        image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/254/420/618/636271781394265550.png"
        image.alt = "dwarf picture"
        break;

    }

    console.log(image.link)
    console.log(image.alt)
    return image
}


const getClassImage = (userClass) => {
    let image = {link: "", alt: ""}
    switch (userClass) {
                
        case 'barbarian':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png"
            image.alt = "barbarian picture"
            break;
            
        case 'bard':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/369/420/618/636272705936709430.png"
            image.alt = "bard picture"
            break;
            
        case 'cleric':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png"
            image.alt = "cleric picture"
            break;
            
        case 'druid':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png"
            image.alt = "druid picture"
            break;
            
        case 'fighter':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png"
            image.alt = "fighter picture"
            break;
            
        case 'monk':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/489/420/618/636274646181411106.png"
            image.alt = "monk picture"
            break;
            
        case 'paladin':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png"
            image.alt = "paladin picture"
            break;
            
        case 'ranger':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/367/420/618/636272702826438096.png"
            image.alt = "ranger picture"
            break;
            
        case 'rogue':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png"
            image.alt = "rogue picture"
            break;
            
        case 'sorcerer':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/485/420/618/636274643818663058.png"
            image.alt = "sorcerer picture"
            break;
            
        case 'warlock':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/375/420/618/636272708661726603.png"
            image.alt = "warlock picture"
            break;
            
        case 'wizard':
            image.link = "https://www.dndbeyond.com/avatars/thumbnails/6/357/420/618/636272696881281556.png"
            image.alt = "wizard picture"
            break;
            
        default:
            image.link = "http://clipart-library.com/images_k/sad-face-transparent-background/sad-face-transparent-background-18.png"
            image.alt = "error"
            break;

    }

    console.log(image.link)
    console.log(image.alt)
    return image
}

    return (
        <div>
            <h1>You are a {capitalStr(props.userTotals.calculatedRace)} {capitalStr(props.userTotals.calculatedClass)} {capitalStr(props.userTotals.calculatedBackground)}</h1>
            <div className="flex-center-space">
                <AbilityScoreBox 
                    text = "STR"
                    abilityScore = {props.userTotals.strength}
                />
                <AbilityScoreBox 
                    text = "DEX"
                    abilityScore = {props.userTotals.dexterity}      
                />
                <AbilityScoreBox 
                    text = "CON"
                    abilityScore = {props.userTotals.constitution}
                />
                <AbilityScoreBox 
                    text = "INT"
                    abilityScore = {props.userTotals.intellegence}
                />
                <AbilityScoreBox 
                    text = "WIS"
                    abilityScore = {props.userTotals.wisdom}
                />
                <AbilityScoreBox 
                    text = "CHA"
                    abilityScore = {props.userTotals.charisma} 
                />
            </div>
            
            <h2>Race: {capitalStr(props.userTotals.calculatedRace)}</h2>
            <img src={getRaceImage(props.userTotals.calculatedRace).link} alt={getRaceImage(props.userTotals.calculatedRace).alt} />
            
            <h2>Class: {capitalStr(props.userTotals.calculatedClass)}</h2>
            <img src={getClassImage(props.userTotals.calculatedClass).link} alt={getClassImage(props.userTotals.calculatedClass).alt} />
            
            <h2>Background: {capitalStr(props.userTotals.calculatedBackground)}</h2>
        </div>
    );
}

export default ResultsPage;

