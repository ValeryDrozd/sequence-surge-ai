import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
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

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: scale(${(props) => (props.isOpen ? 1 : 0.9)});
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

const Title = styled.h2`
  color: #d9534f;
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: bold;
`;

const Message = styled.p`
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: #d9534f;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #c9302c;
  }
`;

const GameOverModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;
  return (
    <ModalContainer>
      <ModalContent isOpen={isOpen}>
        <Title>Game Over</Title>
        <Message>Sorry, you made a wrong move!</Message>
        <CloseButton onClick={onRequestClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default GameOverModal;
