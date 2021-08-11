import React, { useState } from "react";
import questions from "./questions.json";

export default function Game() {
  let [questionNum, setQuestionNum] = useState(0);
  let [score, setScore] = useState(0);
  let question = questions[questionNum];

  //

  return (
    <div>
      <div>Score: {score}</div>
      {question ? (
        <Question
          question={question}
          onNextClick={() => {
            setQuestionNum((prev) => prev + 1);
          }}
          onSubmit={(results) => {
            let questionScore = 0;
            // add a point for all correct
            questionScore += results.filter((el) => el.status === "correct")
              .length;
            // subtract a point for all incorrect
            questionScore -= results.filter((el) => el.status === "wrong")
              .length;

            setScore((prev) => prev + questionScore);
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
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
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
        {results ? (
          <button
            onClick={() => {
              setResults(null);
              setResponse("");
              onNextClick();
            }}
          >
            Next
          </button>
        ) : null}
      </div>
      {Results ? <Results /> : null}
    </div>
  );
}

function getResults(response, answer) {
  // make the answer like a response just so we can scrub both the same way
  let strAnswer = answer.join(",");
  let unscrubbedResponseAsArr = response.split(", ");

  let scrub = (str) =>
    str
      .replaceAll(" ", "")
      .split(",")
      .map((el) => el.toLowerCase());

  let responseArr = scrub(response);
  let answerArr = scrub(strAnswer);

  let results = [];

  responseArr.forEach((el, i) => {
    let indexOfAnswer = answerArr.indexOf(el);
    if (indexOfAnswer !== -1) {
      results.push({
        answer: answer[indexOfAnswer], // get the pretty name
        status: "correct"
      });
    } else {
      results.push({
        answer: unscrubbedResponseAsArr[i], // get the pretty name
        status: "wrong"
      });
    }
  });

  //find all the ones that were missing as well
  let missing = answer
    .filter((el) => !results.find((_el) => _el.answer === el))
    .map((el) => ({ answer: el, status: "missing" }));
  results.push(...missing);

  console.log(JSON.stringify(results, null, "\t"));

  // results = {
  //   correct: responseArr.filter((el) => answerArr.includes(el)),
  //   wrong: responseArr.filter((el) => !answerArr.includes(el)),
  //   missing: answerArr.filter((el) => !responseArr.includes(el))
  // };

  results.component = () => {
    return (
      <div>
        {results.map((el) => {
          let color = el.status === "correct" ? "green" : "red";
          let textDecoration =
            el.status === "wrong" ? "line-through" : "initial";

          return <div style={{ color, textDecoration }}>{el.answer}</div>;
        })}
      </div>
    );
  };

  return results;
}
