import { useRef } from 'react';
export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    /**
   * Not to link any UI element to ref, but to make sure some value don't change as component is reexecuted.
   */
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);//edit the orig array (shuffledAnswers array)
    }

    return (
          

        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                let cssClass = '';
                const isSelected = selectedAnswer === answer;
                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => { onSelect(answer) }}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >{answer}</button></li>
                );
            }
            )}
        </ul>
    );
}