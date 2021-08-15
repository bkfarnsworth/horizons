import React, { useState } from "react";
import questionsAboutBorders from "./questionsAboutBorders";

const numQuestions = 10;

export default function Game() {
  let [remainingQuestions, setRemainingQuestions] = useState(
    questionsAboutBorders
  );
  let getRandomIndex = () =>
    getRandomIntInclusive(0, remainingQuestions.length - 1);
  let [randomIndex, setRandomIndex] = useState(getRandomIndex());
  let [score, setScore] = useState(0);
  let [questionNum, setQuestionNum] = useState(1);
  let question = remainingQuestions[randomIndex];

  return (
    <div>
      <div>Score: {score}</div>

      {questionNum <= numQuestions ? (
        <>
          <div>Question Num: {questionNum}</div>
          <Question
            question={question}
            onNextClick={() => {
              //filter out the current question from the remaining questions
              setRemainingQuestions((prev) => {
                return prev.filter((q) => q !== question);
              });
              //set new random index
              setRandomIndex(getRandomIndex());

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
        </>
      ) : (
        <div>All done!</div>
      )}
    </div>
  );
}

function Question({ question, onSubmit, onNextClick }) {
  let [response, setResponse] = useState("");
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

  //convert unscrubbed to array as well for lookups we will need lated
  let unscrubbedResponseAsArr = splitSafe(response, ",");

  // create scrubber
  let scrub = (str) =>
    splitSafe(str.replaceAll(" ", ""), ",").map((el) => el.toLowerCase());

  // scrub both answer and response
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

  // console.log(JSON.stringify(results, null, "\t"));

  results.component = () => {
    return (
      <div>
        {results.map((el) => {
          let color = el.status === "correct" ? "green" : "red";
          let textDecoration =
            el.status === "wrong" ? "line-through" : "initial";

          return (
            <div key={el.answer} style={{ color, textDecoration }}>
              {el.answer}
            </div>
          );
        })}
      </div>
    );
  };

  return results;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function splitSafe(string, delim) {
  // catch undefined and empty string, which splits into [""]
  if (string) {
    return string.split(delim);
  } else {
    return [];
  }
}
