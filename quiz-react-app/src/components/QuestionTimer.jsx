import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, handleTimeoutExpired, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    //side effect using set timeout but no need useEffect initially.
    //but needed later, as we added setInterval for progress bar UI update
    useEffect(() => {
       console.log('setting timeout');
       const timer = setTimeout(handleTimeoutExpired, timeout);
        return () => {
            clearTimeout(timer);
        };
    }, [timeout, handleTimeoutExpired]); //this effect hook gets reexecuted if one of these dependencies change
     
    
   

    //will cause to loop infinity since state is updated => then component is rendered again...so use useEffect
    useEffect(() => {
       console.log('setting interval');
       const interval =  setInterval(() => {
           setRemainingTime((prevRemainingTime) => {
               return prevRemainingTime - 100;
           }
              
            );
       }, 100);
        return () => {
            clearInterval(interval); //due to strict mode, 2 intervals are there, so need to clean up
        };
    }, []); //no dependencies
   

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />

    
}