import React, {useState, useEffect, useRef} from 'react';
import {natures, questions} from './db'
import Question from './components/question'
import Answer from './components/answer'
import Start from './components/start'
import TextBox from './components/textBox'
import './App.css';

function App() {

    const userQuestionNumber = 4;

    const [mainContent, setMainContent] = useState();
    const [quizQuestions, setQuizQuestions] = useState([]);

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
        let allQuestions = [...questions]
        let chosenQuestionsList = []
        for (let i = 0; i < userQuestionNumber; i++) {
            let randomQuestionIndex = Math.floor(Math.random()*allQuestions.length-1);
            chosenQuestionsList.push(allQuestions[randomQuestionIndex])
            console.log(`${i}: ${(allQuestions[randomQuestionIndex]).question}`)
            allQuestions.splice(randomQuestionIndex, 1)
        }
    }

    const mainQuizMode = () => {
        createQuestionsList()
    }

    return (
        <main>
            {mainContent}
        </main>
    );
}

export default App;