import { useState } from "react";
import { useDispatch } from "react-redux";
import { INC_SCORE, ATTEMPTED } from "../features/GlobalSlice";
const SingleQuestion = ({ options, correct, title }) => {
  let [allOptions, setAllOptions] = useState(() => options);
  let dispatch = useDispatch();

  function handleClick(chosen, correct, e) {
    e.target.disabled = true;
    setAllOptions(() => [chosen]);
    if (chosen === correct) {
      dispatch(INC_SCORE());
      dispatch(ATTEMPTED());
    } else dispatch(ATTEMPTED());
  }

  return (
    <div>
      <h4>{title}</h4>
      {allOptions.map((option) => (
        <button key={option} onClick={(e) => handleClick(option, correct, e)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default SingleQuestion;
