import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch; /* Stretch items to full width */
  padding: 10px;
  height: 100%; /* Stretch to full height of parent */
  /* Removed background and border */
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: block; /* Make button block-level to cover full width */
  font-size: 16px;
  margin: 4px 0; /* Margin for vertical spacing */
  cursor: pointer;
  border-radius: 5px;
  width: calc(100% - 20px); /* Full width with margin */
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Dropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px; /* Margin for spacing */
  width: calc(100% - 20px); /* Full width with margin */
  margin-left: 10px;
  margin-right: 10px;
`;

const DifficultyDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px; /* Margin for spacing */
  width: calc(100% - 20px); /* Full width with margin */
  margin-left: 10px;
  margin-right: 10px;
`;

const Menu = ({
  onRestart,
  onPause,
  onShowCurrentTarget,
  onHint,
  onPolyhedronChange,
  onOpenRules,
  hintCount,
  showTargetCount,
  isGameCompleted,
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <MenuContainer>
      <Dropdown
        onChange={(e) => onPolyhedronChange(Number(e.target.value))}
        defaultValue={30} /* Set default value to 30 */
      >
        {[
          5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
          95, 100,
        ].map((value) => (
          <option key={value} value={value}>{`${value} polyhedrons`}</option>
        ))}
      </Dropdown>
      <DifficultyDropdown
        onChange={(e) => onDifficultyChange(e.target.value)}
        defaultValue="Medium" /* Set default difficulty to Medium */
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="IronMan">Iron Man</option>
      </DifficultyDropdown>
      <Button onClick={onRestart}>Restart</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button
        onClick={onHint}
        disabled={
          isGameCompleted || difficulty === "Hard" || difficulty === "IronMan"
        }
      >
        Hint ({hintCount === Infinity ? "Unlimited" : hintCount})
      </Button>
      <Button
        onClick={onShowCurrentTarget}
        disabled={
          isGameCompleted || difficulty === "Hard" || difficulty === "IronMan"
        }
      >
        Show Current Target (
        {showTargetCount === Infinity ? "Unlimited" : showTargetCount})
      </Button>
      <Button onClick={onOpenRules}>Rules</Button>
    </MenuContainer>
  );
};

export default Menu;
