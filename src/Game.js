import React, { useState } from "react";

export default function Game() {
  let [questionNum, setQuestionNum] = useState(0);
  let [response, setResponse] = useState();
  let [score, setScore] = useState(0);
  let questions = [
    {
      question: "What countries border Germany?",
      answer: "a"
    },
    {
      question: "What countries border Peru?",
      answer: "b"
    },
    {
      question: "What countries border Brazil?",
      answer: "c"
    }
  ];

  let question = questions[questionNum];

  return (
    <div>
      <div>
        Score: {score}/{questions.length}
      </div>
      {question ? (
        <Question
          question={question}
          onSubmit={() => {
            if (response === question.answer) {
              alert("You got it right!");
              setScore((prev) => prev + 1);
            } else {
              alert("You got it wrong");
            }
            setQuestionNum((prev) => prev + 1);
          }}
          onResponseChange={(e) => {
            // console.log(val);
            setResponse(e.target.value);
          }}
        />
      ) : (
        <div>All done!</div>
      )}
    </div>
  );
}

function Question({ question, onSubmit, onResponseChange }) {
  return (
    <div>
      Question: {question.question}
      Answer (enter a comma delimited list):{" "}
      <textarea onChange={onResponseChange} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
