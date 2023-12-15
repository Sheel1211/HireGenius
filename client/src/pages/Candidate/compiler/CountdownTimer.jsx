import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, onTimeExpired }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      onTimeExpired();
    }
  }, [time, onTimeExpired]);

  const formattedTime = formatTime(time);

  return <div>{formattedTime}</div>;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default CountdownTimer;
