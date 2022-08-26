import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../features/GlobalSlice";
import SingleQuestion from "./SingleQuestion";

const Question = () => {
  let [timer, setTimer] = useState(() => 10);

  let [count, setCount] = useState(() => 0);
  let { questions, totalAttempted, score } = useSelector((state) => state.allData);
  // console.log(state);

  let dispatch = useDispatch();

  useEffect(() => {
    let id;
    if (timer > 0) {
      id = setInterval(() => {
        setTimer((prev) => (prev -= 1));
      }, 1000);
    } else if (timer === 0) {
      dispatch(fetchQuestions());
      setTimer(() => 10);
    }
    // else if (totalAttempted === 0) clearInterval(id);
    else clearInterval(id);
    return () => clearInterval(id);
  }, [timer]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);
  return (
    <div>
      {questions.length === 0 ? (
        <h1>Loading......</h1>
      ) : (
        <div>
          {questions?.map((question) => (
            <SingleQuestion
              key={question.question}
              options={[...question.incorrectAnswers, question.correctAnswer]}
              correct={question.correctAnswer}
              title={question.question}
            />
          ))}
          {count !== 10 ? (
            <button
              className="submit"
              onClick={() => {
                setCount((prev) => prev + 1);
                dispatch(fetchQuestions());
                setTimer(() => 10);
              }}
            >
              Next
            </button>
          ) : (
            ""
          )}
          <div className="card">
            <h2>
              Score : {score}/{totalAttempted}
            </h2>
            <p>Correct Answers : {score}</p>
            <p>Incorrect Answers : {totalAttempted - score}</p>
            <p>Not attempted : {10 - totalAttempted}</p>
          </div>
        </div>
      )}
      <div className="timer">{timer}</div>
    </div>
  );
};

export default Question;
