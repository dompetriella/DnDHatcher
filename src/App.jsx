import React, {useState, useEffect, useRef} from 'react';
import {natures, questions} from './db'
import Question from './components/question'
import Answer from './components/answer'
import Start from './components/start'
import TextBox from './components/textBox'
import './App.css';

function App() {

    const [mainContent, setMainContent] = useState([]);
    const [userTotalsString, setUserTotalsString] = useState("")

    const userTotals = {
        name: "test",
        characterName: "characterTest",
        calculatedRace: "",
        calculatedClass: "",
        background: [],

        raceTotals: {
            "dragonborn": 0,
            "dwarf":0,
            "elf":0,
            "gnome":0,
            "halfing":0,
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
        }

    }

    const userQuestionNumber = 4;
    const getdbQuestions = () => {
        return questions
    }

    const getdbNatures = () => {
        return natures
    }

    let quizQuestionsList = []


    const printOutUserTotals = () => {
        let printString = ""
        printString += `---Calculated Race: ${userTotals.calculatedRace}---`
        printString += `---Calculated Class: ${userTotals.calculatedClass}---`
        for (const property in userTotals.raceTotals) {
            printString += `${property}: ${userTotals.raceTotals[property]} \n`
        }       
        for (const property in userTotals.classTotals) {
            printString += `${property}: ${userTotals.classTotals[property]} \n`
        }   
        setUserTotalsString(printString)
    }

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
        printOutUserTotals()
    }, [])

    const beginQuiz = () => {
        setMainContent(
            <TextBox 
            text = {"You're going to be asked a few questions, just answer how you (or your character) would answer them"}
            buttonText = {"Next"}
            onClick = {mainQuizMode}
            button = {true}
            />
        )
    }

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

    const displayQuestion = () => {
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
        
        else {
            setMainContent(
            <div>
                <div>--- Congrats, all questions complete ---</div>
                <div>Race: {userTotals.calculatedRace}</div>
                <div>Class: {userTotals.calculatedClass}</div>
                <TextBox 
                    text = {"Oh yeah, it's all coming together.  Just a few more questions"}
                    button = {true}
                    buttonText = {"Continue"}
                    onClick = {raceQuizMode}
                />
            </div>

            )
        }


    }

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


        let selectedRace = {race: "", raceTotal: 0}
        for (const userRace in userTotals.raceTotals) {
            if (userTotals.raceTotals[userRace] > selectedRace.raceTotal) {
                selectedRace.race = userRace
                selectedRace.raceTotal = userTotals.raceTotals[userRace]
            }
        }
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
        userTotals.background.push(background)

        printOutUserTotals()
        displayQuestion()
    }

    const mainQuizMode = () => {
        quizQuestionsList = createQuestionsList()
        displayQuestion()
    }

    const raceQuizMode = () => {
        switch(userTotals.calculatedRace) {

        case "dwarf":
            setMainContent(<div>DWARF</div>)
            break;
        case "elf":
            setMainContent(<div>ELF</div>)
            break;
        case "human":
            setMainContent(<div>HUMAN</div>)
            break;
        case "half-elf":
            setMainContent(<div>HALF-ELF</div>)
            break;
        case "gnome":
            setMainContent(<div>GNOME</div>)
            break;
        case "halfling":
            setMainContent(<div>HALFLING</div>)
            break;
        case "half-orc":
            setMainContent(<div>HALF-ORC</div>)
            break;
        case "dragonborn":
            setMainContent(<div>DRAGONBORN</div>)
            break;
        case "tiefling":
            setMainContent(<div>TIEFLING</div>)
            break;
        default:
            setMainContent(<div>Not ready yet.  Refresh page</div>)
} 
    }

    return (
        <main>
            {mainContent}
        </main>
    );
}

export default App;