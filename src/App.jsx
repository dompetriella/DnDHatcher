import React, {useState, useEffect, useRef} from 'react';
import {natures, questions} from './db'
import Question from './components/question'
import Answer from './components/answer'
import Start from './components/start'
import TextBox from './components/textBox'
import './App.css';

function App() {

    const userQuestionNumber = 4;
    const getdbQuestions = () => {
        return questions
    }

    const [mainContent, setMainContent] = useState([]);
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
        if (quizQuestions.length > 0) {
            let currentQuestion = quizQuestions[0]
            let questionAndAnswers = []
            questionAndAnswers.push(
                <Question 
                    text = {currentQuestion.question}
                    key = {"question"}
                />
            )

            for (let i = 1; i < Object.keys(currentQuestion).length; i++) {
                let answerText = currentQuestion[Object.keys(currentQuestion)[i]].text
                questionAndAnswers.push(
                <Answer 
                    text = {answerText}
                    key = {i}
                />
                )}
            console.log('first here')
            setMainContent(
                    <div className="qa-container">
                        {questionAndAnswers}
                    </div>
                )
            console.log('here')
        }

    }

    const mainQuizMode = () => {
        setQuizQuestions(createQuestionsList())
        console.log(`State list length: ${quizQuestions.length}`)
        displayQuestion()
    }

    return (
        <main>
            {mainContent}
        </main>
    );
}

export default App;