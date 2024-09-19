import React from "react";
import styled from "styled-components";

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
  line-height: 1.6;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #007bff; /* Change color to your preference */
`;

const RulesModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onRequestClose}>Close</CloseButton>
        <h2>Game Rules</h2>
        <RulesList>
          <RuleItem>
            Click on the numbers in <Highlight>ascending order</Highlight> as
            quickly as possible. The game ends when you reach the{" "}
            <Highlight>highest number</Highlight>.
          </RuleItem>
          <RuleItem>
            <Highlight>Difficulty Levels:</Highlight>
            <ul>
              <li>
                <strong>Easy:</strong> Unlimited hints and target shows.
              </li>
              <li>
                <strong>Medium:</strong> 5 hints and 5 target shows.
              </li>
              <li>
                <strong>Hard:</strong> No hints or target shows.
              </li>
              <li>
                <strong>IronMan:</strong> No hints or target shows; making a
                wrong move ends the game.
              </li>
            </ul>
          </RuleItem>
          <RuleItem>
            <Highlight>Number of Polyhedrons Setting:</Highlight> Adjust the
            number of polyhedrons for varying levels of challenge.
          </RuleItem>
        </RulesList>
      </ModalContent>
    </ModalBackground>
  );
};

export default RulesModal;
