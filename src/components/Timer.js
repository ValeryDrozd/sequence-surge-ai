import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';

const Timer = forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(props.isActive);

  useImperativeHandle(ref, () => ({
    get seconds() {
      return seconds;
    },
    reset() {
      setSeconds(0);
    },
    start() {
      setIsActive(true);
    },
    stop() {
      setIsActive(false);
    }
  }));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div>
      {Math.floor(seconds / 60).toString().padStart(2, '0')}:
      {(seconds % 60).toString().padStart(2, '0')}
    </div>
  );
});

export default Timer;
