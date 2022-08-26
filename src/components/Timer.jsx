import { useState } from "react";

const Timer = () => {
  let [timer, setTimer] = useState(() => 10);
  function handleTimer() {
    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }
  // handleTimer();
  return <div className="timer">{timer}</div>;
};

export default Timer;
