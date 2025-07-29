import React from 'react';
import {useState} from 'react';

import Review from './Review';

// don't change the Component name "App"
function Sample() {
     const[feedback, isFeedback]=React.useState();
     const[name, isName]=useState(false);
     
     function onFeedbackChange(event){
         isFeedback(event.target.value);
     }
     
      function onNameChange(event){
         isName(event.target.value);
     }
  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea onChange={onFeedbackChange}/>
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" onChange={onNameChange}/>
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review feedback={feedback} student={name}  />

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

