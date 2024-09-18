import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  float: right;
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const RuleItem = styled.li`
  margin: 10px 0;
`;

const RulesModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onRequestClose}>Close</CloseButton>
        <h2>Game Rules</h2>
        <RulesList>
          <RuleItem>1. The game area is a 500x500 square.</RuleItem>
          <RuleItem>2. Polyhedrons with numbers from 1 to max are displayed.</RuleItem>
          <RuleItem>3. Click polyhedrons in ascending order.</RuleItem>
          <RuleItem>4. Correct clicks make polyhedrons disappear.</RuleItem>
          <RuleItem>5. Incorrect clicks turn polyhedrons red for 1/2 second.</RuleItem>
          <RuleItem>6. Use the Hint button to highlight the correct polyhedron.</RuleItem>
          <RuleItem>7. You have 5 hints per game.</RuleItem>
          <RuleItem>8. Use the Pause button to pause the game and Resume by clicking the overlay.</RuleItem>
          <RuleItem>9. The timer resets on game restart.</RuleItem>
        </RulesList>
      </ModalContent>
    </ModalBackground>
  );
};

export default RulesModal;
