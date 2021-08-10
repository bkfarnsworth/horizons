import React, { useState } from "react";

export default function Game() {
  let [questionNum, setQuestionNum] = useState(0);
  let questions = [
    {
      question: "What countries border Germany?",
      answer: "France, Netherlands, etc"
    },
    {
      question: "What countries border Peru?",
      answer: "Paraguay, Something others maybe?"
    }
  ];

  return (
    <div>
      <Question
        question={questions[questionNum]}
        onSubmit={() => setQuestionNum((prev) => prev + 1)}
      />
    </div>
  );
}

function Question({ question, onSubmit }) {
  return (
    <div>
      Question: {question.question}
      Answer: {question.answer}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
