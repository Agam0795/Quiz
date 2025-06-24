import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="time-display">
        <span className="time">{formatTime(timeLeft)}</span>
        <span className="label">Time Remaining</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${(timeLeft / (duration * 60)) * 100}%`,
            backgroundColor: timeLeft < 300 ? '#ff4444' : '#4CAF50'
          }}
        />
      </div>
    </div>
  );
};

export default Timer; 