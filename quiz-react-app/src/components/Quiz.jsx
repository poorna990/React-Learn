import { useState, useCallback } from 'react';
import QUESTIONS from '../assets/questions.js';
import Summary from './Summary.jsx';
import Question from './Question.jsx';
export default function Quiz() {
  
    
    const [userAnswers, setUserAnswers] = useState([]);
    const [userScore, setUserScore] = useState(0);
   // const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = userAnswers.length;

    /**
     * call hooks in the beginning of a function
     * */

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        // console.log("activeQuestionIndex is:", activeQuestionIndex, " ans:::", selectedAnswer);
        //setAnswerState('answered');

        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
            setUserScore((prevUserScore) => {
                return prevUserScore + 1;
            });
            
        }
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    function handleRetake() {
        setUserAnswers([]);
        setUserScore(0);
       // setAnswerState('');
    }

    if (activeQuestionIndex === QUESTIONS.length) {
        return <Summary userAnswers={userAnswers} />

    }
   

    return (
        <div id="quiz">
            
            <Question
                key={activeQuestionIndex} /**need to add key which will change value(after every qn)
                    so this component gets re evaluated*/
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkip={handleSkipAnswer} />
        </div>
    );
}