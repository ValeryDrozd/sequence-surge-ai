import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  font-family: "Arial", sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: inline-block;
  text-align: center;
  border: 2px solid #ddd;
  width: fit-content;
  margin-top: 20px;
`;

const Timer = forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(props.isActive);

  useImperativeHandle(ref, () => ({
    get seconds() {
      return seconds;
    },
    reset() {
      setSeconds(0);
      setIsActive(true);
    },
    start() {
      setIsActive(true);
    },
    stop() {
      setIsActive(false);
    },
  }));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <TimerContainer>
      {Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}
      :{(seconds % 60).toString().padStart(2, "0")}
    </TimerContainer>
  );
});

export default Timer;
