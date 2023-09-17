import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, onTimeExpired }) => {
  const initialTimeRemaining =
    localStorage.getItem("timeRemaining") || initialTime;
  const [time, setTime] = useState(parseInt(initialTimeRemaining, 10));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("timeRemaining", newTime.toString());

        if (newTime === 0) {
          onTimeExpired();
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      localStorage.removeItem("timeRemaining");
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return <span>{formatTime(time)}</span>;
};

export default CountdownTimer;
