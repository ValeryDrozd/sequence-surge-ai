import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  position: relative;
`;

export const GameArea = styled.svg`
  width: 500px;
  height: 500px;
  border: 2px solid black;
  position: relative;
`;

export const PauseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 1); /* Fully opaque white background */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: black;
  cursor: pointer;
  z-index: 1000; /* Ensure it's above other content */
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

export const RulesModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Polygon = styled.polygon`
  fill: ${(props) => props.bgColor};
  stroke: black;
  stroke-width: 2;
  cursor: pointer;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

export const Text = styled.text`
  fill: ${(props) => props.textColor};
  font-size: 14px;
  font-weight: bold;
  dominant-baseline: middle;
  text-anchor: middle;
`;

export const Popup = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  transition: opacity 0.3s ease;
`;
