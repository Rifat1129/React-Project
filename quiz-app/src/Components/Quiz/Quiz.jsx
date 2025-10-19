import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  const checkAns = (element, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        element.target.classList.add("Correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("Wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("Correct");
      }
    }
  };

  function next() {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("Wrong");
        option.current.classList.remove("Correct");
        return null;
      });
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr /> {result ? ( <></> ) : (
        <>
          <h2> {index + 1}. {question.question} </h2>
          <ul>
            <li ref={option1} onClick={(element) => { checkAns(element, 1) }} > {question.option1} </li>
            <li ref={option2} onClick={(element) => { checkAns(element, 2) }} > {question.option2} </li>
            <li ref={option3} onClick={(element) => { checkAns(element, 3) }} > {question.option3} </li>
            <li ref={option4} onClick={(element) => { checkAns(element, 4) }} > {question.option4} </li>
          </ul>
          <button onClick = { next } > Next </button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick = { reset }> Reset </button>
        </>
      ) : ( <></>  )}
    </div>
  );
};

export default Quiz;
