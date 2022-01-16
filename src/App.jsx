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
        calculatedRace: "dwarf",
        calculatedClass: "bard",

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
            />
        )
    }

    const createQuestionsList = () => {
        let allQuestions = [...getdbQuestions()]
        let returnList = []
        for (let i = 0; i < userQuestionNumber; i++) {
            let randomQuestionIndex = Math.floor(Math.random()*allQuestions.length);
            returnList.push(allQuestions[randomQuestionIndex])
            console.log(`${i}: ${(allQuestions[randomQuestionIndex]).question}`)
            allQuestions.splice(randomQuestionIndex, 1)
        }
        console.log(`Generated List length: ${returnList}`)
        return returnList
    }

    const displayQuestion = () => {
        console.log('here1')
        if (quizQuestionsList.length > 0) {
            let currentQuestion = quizQuestionsList[0]
            let questionAndAnswers = []
            questionAndAnswers.push(
                <Question 
                    text = {currentQuestion.question}
                    key = {"question"}
                />
            )
            console.log('here2')
            for (let i = 1; i < Object.keys(currentQuestion).length; i++) {
                let answerObject = currentQuestion[Object.keys(currentQuestion)[i]]
                
                let answerText = answerObject.text
                let firstNature = answerObject.first[Math.floor(Math.random()*answerObject.first.length)]
                let secondNature = answerObject.second[Math.floor(Math.random()*answerObject.second.length)]
                let thirdNature = answerObject.third[Math.floor(Math.random()*answerObject.third.length)]
                let background = answerObject.background[Math.floor(Math.random()*answerObject.background.length)]

            
                questionAndAnswers.push(
                <Answer 
                    onClick = {calculateAnswer}
                    text = {answerText}
                    key = {i}
                />
                )
            }

            console.log('here3')
            setMainContent(
                    <div className="qa-container">
                        {questionAndAnswers}
                    </div>
                )

        quizQuestionsList.splice(0, 1)

        }
        
        else {
            setMainContent(
            <div>Congrats, all questions complete</div>
            )
        }


    }

    const calculateAnswer = (firstNature, secondNature, thirdNature, background) => {
        displayQuestion()
    }

    const mainQuizMode = () => {
        quizQuestionsList = createQuestionsList()
        displayQuestion()
    }

    return (
        <main>
            {userTotalsString}
            {mainContent}
        </main>
    );
}

export default App;