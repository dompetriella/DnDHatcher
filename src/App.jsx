import React, {useState, useEffect, useRef} from 'react';
import {natures, questions} from './db'
import {raceQuestions} from './support/raceQuestions'
import {classQuestions} from './support/classQuestions'
import {classSaves} from './support/classSaves'
import Question from './components/Question'
import Answer from './components/Answer'
import Start from './components/Start'
import TextBox from './components/TextBox'
import CharacterSheet from './components/CharacterSheet'
import ResultsPage from './components/ResultsPage'
import './App.css';

function App() {

    //whatever setMainContent is, it's renders on the page
    const [mainContent, setMainContent] = useState([]);

    //character totals
    const userTotals = {
        name: "Human McHumanface",
        characterName: "Fantasy McFantasyFace",
        calculatedRace: "",
        calculatedClass: "",
        calculatedBackground: "",
        background: [],

        raceTotals: {
            "dragonborn": 0,
            "dwarf":0,
            "elf":0,
            "gnome":0,
            "halfling":0,
            "half-orc":0,
            "human":0,
            "tiefling":0,
        },

        classTotals: {
            "barbarian":0,
            "bard":0,
            "cleric":0,
            "druid":0,
            "fighter":0,
            "monk":0,
            "paladin":0,
            "ranger":0,
            "rogue":0,
            "sorcerer":0,
            "warlock":0,
            "wizard":0
        },

        abilityScoresList: []

    }


// UTILITY FUNCTIONS //////////////////////

    function randomChoice(list) {
        let randomIndex = Math.floor(Math.random()*list.length); 
        return list[randomIndex]
    }

    //gets the questions object for the main quiz
    const getdbQuestions = () => {
        return questions
    }
    //gets the natures object
    const getdbNatures = () => {
        return natures
    }

    const getdbRaceQuestions = (race) => {
        console.log(raceQuestions[race])
        return raceQuestions[race]
    }

    const getdbClassQuestions = (clas) => {
        console.log(classQuestions[clas])
        return classQuestions[clas]
    }

    function shuffleArray(inputArray) {
    for (let i = inputArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
        }
        return inputArray

    }

    const pickTwoUniqueValuesWithSameKey = objectList => {
        let returnList = []
        if (objectList.length > 0) {
            let randomIndex = Math.floor(Math.random()*objectList.length);
            let randomObj1 = objectList[randomIndex]
            returnList.push(randomObj1)
            objectList.splice(randomIndex, 1)
            if (objectList.length > 0) {
                while (true) {
                    let randomObj2 = objectList[Math.floor(Math.random()*objectList.length)]
                    if (Object.values(randomObj1) !== Object.values(randomObj2)) returnlist.push(randomObj2)
                    returnList.push(randomObj2)
                    break
                }
            }
        }

        return returnList
    }

    const rollDice = max => {
        return Math.floor(Math.random()*max) + 1
    }

    const diceBestOf = (max, howMany = 1, bestOf = 0) => {
        let returnList = []
        for (let i = 0; i < howMany; i++) {
            returnList.push(rollDice(max))
        }

        for (let i = 0; i < howMany - bestOf; i++) {
            let smallNum = Math.min(...returnList);
            console.log(smallNum)
            let deleteIndex = returnList.indexOf(smallNum)
            returnList.splice(deleteIndex, 1)
        }
        return returnList
    }

    const sumList = list => {
        return list.reduce((partialSum, a) => partialSum + a, 0);
    }

    const createAbilityScoresList = () => {
        let returnList = []
        for (let i = 0; i < 6; i++) {
            returnList.push(sumList(diceBestOf(6, 4, 3)))
        }
        return returnList
    }

/////////////////////////////////////////////////////////////////


//GLOBAL FUNCTIONS ////////////////////////////////////////////

    
    //sets how many questions are answered in quiz mode
    const userQuestionNumber = 10;
    
    //main quiz questions list store
    let quizQuestionsList = []
    let secondaryQuestionsList = []
    let skillProf = []

    // main starting screen
    const startScreen = (props) => {
        setMainContent(
            <Start 
                beginQuiz = {beginQuiz}
            />
        )
    }
    useEffect(() => {
        startScreen()
    }, [])


// START CODE ///////////////////////////////////////////////////
    
    const beginQuiz = () => {
        setMainContent(
            <TextBox 
            text = {"You're going to be asked a few questions, just answer how you (or your character) would answer them..."}
            buttonText = {"Next"}
            onClick = {mainQuizMode}
            button = {true}
            />
        )
    }

//QUIZ MODE CODE ////////////////////////////////////////////////
    
    // creates a randomnly shuffled list of questions that is userQuestionNumber in length
    const createQuestionsList = () => {
        let allQuestions = [...getdbQuestions()]
        let returnList = []
        for (let i = 0; i < userQuestionNumber; i++) {
            let randomQuestionIndex = Math.floor(Math.random()*allQuestions.length);
            returnList.push(allQuestions[randomQuestionIndex])
            allQuestions.splice(randomQuestionIndex, 1)
        }
        return returnList
    }

    //for displaying questions/answers in main quiz mode
    const displayMainModeQuestion = () => {
        if (quizQuestionsList.length > 0) {
            let currentQuestion = quizQuestionsList[0]
            let questionAndAnswers = []
            questionAndAnswers.push(
                <Question 
                    text = {currentQuestion.question}
                    key = {"question"}
                />
            )
            for (let i = 1; i < Object.keys(currentQuestion).length; i++) {
                let answerObject = currentQuestion[Object.keys(currentQuestion)[i]]
                
                let answerText = answerObject.text
                let firstNature = answerObject.first[Math.floor(Math.random()*answerObject.first.length)]
                let secondNature = answerObject.second[Math.floor(Math.random()*answerObject.second.length)]
                let thirdNature = answerObject.third[Math.floor(Math.random()*answerObject.third.length)]
                let background = answerObject.background[Math.floor(Math.random()*answerObject.background.length)]

            
                questionAndAnswers.push(
                <Answer 
                    calculateAnswer = {calculateAnswer}
                    text = {answerText}
                    key = {i}
                    firstNature = {firstNature}
                    secondNature = {secondNature}
                    thirdNature = {thirdNature}
                />
                )
            }

            setMainContent(
                    <div className="qa-container">
                        {questionAndAnswers}
                    </div>
                )

        quizQuestionsList.splice(0, 1)

        }
        
        //once main mode quiz is done
        else {
            //for testing purposes, only dwarf paladin is available
            setMainContent(
            <div className="center-column">
                <div>--- Congrats, all questions complete ---</div>
                <div>Race: {userTotals.calculatedRace}</div>
                <div>Class: {userTotals.calculatedClass}</div>
                <TextBox 
                    text = {"Oh yeah, it's all coming together.  Just a few more questions..."}
                    button = {true}
                    buttonText = {"Continue"}
                    onClick = {altQuizMode}
                />
            </div>

            )
        }


    }

    //calculates and adds values to user object based on what answer they clicked on in the quiz
    const calculateAnswer = (firstNature, secondNature, thirdNature, background) => {
        
        const firstNatureObj = getdbNatures()[firstNature]
        const secondNatureObj = getdbNatures()[secondNature]
        const thirdNatureObj = getdbNatures()[thirdNature]

        //calculates race totals for race tiers
        for (const race in firstNatureObj['race']) {
            userTotals.raceTotals[race] += (firstNatureObj['race'][race]) * 3
        }      
        for (const race in secondNatureObj['race']) {
            userTotals.raceTotals[race] += secondNatureObj['race'][race] * 2        
        }        
        for (const race in thirdNatureObj['race']) {
            userTotals.raceTotals[race] += thirdNatureObj['race'][race]
        }      

        //calculates class totals for class tiers
        for (const clas in firstNatureObj['class']) {
            userTotals.classTotals[clas] += firstNatureObj['class'][clas] * 3
        }        
        for (const clas in secondNatureObj['class']) {
            userTotals.classTotals[clas] += secondNatureObj['class'][clas] * 2
        }        
        for (const clas in thirdNatureObj['class']) {
            userTotals.classTotals[clas] += thirdNatureObj['class'][clas]
        }           


        //does a quick loop to calculate current selected race
        let selectedRace = {race: "", raceTotal: 0}
        for (const userRace in userTotals.raceTotals) {
            if (userTotals.raceTotals[userRace] > selectedRace.raceTotal) {
                selectedRace.race = userRace
                selectedRace.raceTotal = userTotals.raceTotals[userRace]
            }
        }

        //sets calculated selected race to user object
        userTotals.calculatedRace = selectedRace.race
        console.log(`Current Selected Race: ${selectedRace.race} - ${selectedRace.raceTotal}`)
        console.log(`User Race: ${userTotals.calculatedRace}`)

        let selectedClass = {clas: "", classTotal: 0}
        for (const userClass in userTotals.classTotals) {
            if (userTotals.classTotals[userClass] > selectedClass.classTotal) {
                selectedClass.clas = userClass
                selectedClass.classTotal = userTotals.classTotals[userClass]
            }
        }
        userTotals.calculatedClass = selectedClass.clas
        console.log(`Current Selected Class: ${selectedClass.clas} - ${selectedClass.classTotal}`)
        console.log(`User Class: ${userTotals.calculatedClass}`)
        if (background) userTotals.background.push(background)

        displayMainModeQuestion()
    }

//////////////////////////////////////////////////////////////////
//Alt Quiz Code

    const createSecondaryQuestionsList = (race, clas) => {
        let allSecondaryQuestions = []
        if (getdbRaceQuestions(race).length > 0) allSecondaryQuestions =  [...getdbRaceQuestions(race)]
        if (getdbClassQuestions(clas).length > 0) allSecondaryQuestions = [...getdbClassQuestions(clas)]
        
        allSecondaryQuestions.push(
        {
            question: "Are you a gambling person?",
            a1: {
                "text": "Yes",
                "attribute" : "gamble",
                "value" : true
            },
            a2: {
                "text": "No",
                "attribute" : "gamble",
                "value" : false
            },
            
        } 
        )
        return shuffleArray(allSecondaryQuestions)
    }
    
    const logAllAttributes = () => {
        for (const property in userTotals) {
            console.log(`${property}: ${userTotals[property]}`)       
        }
    }

    const setAbilityScores = () => {
        let returnList = []
        if (userTotals["gamble"]) {
            returnList = createAbilityScoresList()
        }
        else {
            returnList = [15, 14, 13, 12, 10, 8]
        }

        return returnList
    }
    
    const displayAltModeQuestion = (altQuestionsList) => {
        if (altQuestionsList.length > 0) {
            let currentQuestion = altQuestionsList[0]
            let questionAndAnswers = []
            questionAndAnswers.push(
                <Question 
                    text = {currentQuestion.question}
                    key = {"question"}
                />
            )
            for (let i = 1; i < Object.keys(currentQuestion).length; i++) {
                let answerObject = currentQuestion[Object.keys(currentQuestion)[i]]
                
                let answerText = answerObject.text
                let attribute = answerObject.attribute
                let value = answerObject.value

            
                questionAndAnswers.push(
                <Answer 
                    text = {answerText}
                    key = {i}
                    mode = {"alt"}
                    attribute = {attribute}
                    value = {value}
                    addAttribute = {applyAltPropertiesFromAnswers}
                />
                )
            }

            setMainContent(
                    <div className="qa-container">
                        {questionAndAnswers}
                    </div>
                )

        altQuestionsList.splice(0, 1)

        }

        //once main mode quiz is done
        else {
            setMainContent(
                <TextBox 
                    text = {"All Done!"}
                    button = {true}
                    buttonText = {"Continue to see Quiz Results!"}
                    onClick = {showResultsPage}
                />

            )
        }


    }



    
    // applies the attribute and value directly to the user object
    // if it's a skill proficiency it goes to skillProf list
    // does stuff like add a subclass or tools
    const applyAltPropertiesFromAnswers = (attribute, value) => {
        console.log(`Attribute: ${attribute} - Value: ${value}`)
        if (attribute === "skill") {
            skillProf.push({attribute: value})
        }
        else {
            userTotals[attribute] = value
            console.log("added " + attribute + " to user totals")
        }

        displayAltModeQuestion(secondaryQuestionsList)
    }

/////////////////////////////////////////////////////////////////
// POST QUIZ CODE

    // for testing as well, these will be set depending on race, class and background with a much fancier algorithm
    //currently set randomly
    const assignAbilityScores = () => {
        let abilities = [
            "strength",
            "dexterity",
            "constitution",
            "intellegence",
            "wisdom",
            "charisma"
        ]

        let scores = setAbilityScores()

        for (let i = 0; i < 6; i++) {
            let abilityKeyIndex = Math.floor(Math.random()*abilities.length)
            let abilityKey = abilities[abilityKeyIndex]
            abilities.splice(abilityKeyIndex, 1)
            
            let abilityScoreIndex = Math.floor(Math.random()*scores.length)
            let abilityScore = scores[abilityScoreIndex]
            scores.splice(abilityScoreIndex, 1)

            userTotals[abilityKey] = abilityScore
            console.log(`${abilityKey}: ${abilityScore}`)
        }
        
    }
    
    const finalCalculations = () => {
        if (userTotals.background.length > 0) {
            userTotals.calculatedBackground = randomChoice(userTotals.background)
            console.log(userTotals.background)
        } else {
            //testing purposes, change this later
            userTotals.calculatedBackground = "acolyte"
        }
        console.log("background length: " + userTotals.background.length)
        console.log(userTotals.calculatedBackground)
        assignAbilityScores()
    }
    
    const showResultsPage = () => {

        finalCalculations()
        
        setMainContent(
            <ResultsPage 
                userTotals = {userTotals}
            />
        )
    }

    const characterSheetStart = () => {
        
        setMainContent(
            <CharacterSheet 
                abilityScores = {createAbilityScoresList}
                userObject = {userTotals}
                />
        )
    }
    

    // logical functional layout of main quiz mode
    const mainQuizMode = () => {
        quizQuestionsList = createQuestionsList()
        displayMainModeQuestion()
    }

    // logical functional layout of alt quiz mode
    const altQuizMode = () => {
        secondaryQuestionsList = createSecondaryQuestionsList(userTotals.calculatedRace, userTotals.calculatedClass)
        displayAltModeQuestion(secondaryQuestionsList)
    } 

    return (
        <main>
            {mainContent}
        </main>
    );
}

export default App;