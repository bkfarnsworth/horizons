import React, { useState } from "react";

export default function Game() {
  let [questionNum, setQuestionNum] = useState(0);
  let [score, setScore] = useState(0);
  let questions = [
    {
      question: "What countries border Germany?",
      answer: [
        "Denmark",
        "Poland",
        "Czech Republic",
        "Austria",
        "Switzerland",
        "France",
        "Luxembourg",
        "Belgium",
        "Netherlands"
      ]
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
          onNextClick={() => {
            setQuestionNum((prev) => prev + 1);
          }}
          onSubmit={(results) => {
            if (results.correct === question.answer.length) {
              setScore((prev) => prev + 1);
            }
          }}
        />
      ) : (
        <div>All done!</div>
      )}
    </div>
  );
}

function Question({ question, onSubmit, onNextClick }) {
  let [response, setResponse] = useState();
  let [results, setResults] = useState();
  let Results = results?.component;

  return (
    <div>
      <div>Question: {question.question}</div>
      <div>Answer (enter a comma delimited list):</div>
      <textarea onChange={(e) => setResponse(e.target.value)} />
      <div>
        <button
          onClick={() => {
            let results = getResults(response, question.answer);

            console.log(results);

            setResults(results);

            onSubmit(results);
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            setResults(null);
            onNextClick();
          }}
        >
          Next
        </button>
      </div>
      {Results ? <Results /> : null}
    </div>
  );
}

function getResults(response, answer) {
  // make the answer like a response just so we can scrub both the same way
  answer = answer.join(",");

  let scrub = (str) => str.replaceAll(" ", "").split(",");

  let responseArr = scrub(response);
  let answerArr = scrub(answer);

  let results = {
    correct: responseArr.filter((el) => answerArr.includes(el)),
    wrong: responseArr.filter((el) => !answerArr.includes(el)),
    missing: answerArr.filter((el) => !responseArr.includes(el))
  };

  results.component = () => {
    return (
      <div>
        Correct: {results.correct.join(", ")}
        <br />
        Wrong: {results.wrong.join(", ")}
        <br />
        Missing: {results.missing.join(", ")}
        <br />
      </div>
    );
  };

  return results;
}
