import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column; /* Changed to vertical layout */
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 2px solid #ddd;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 0; /* Adjust margin for vertical layout */
  cursor: pointer;
  border-radius: 5px;

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
  margin-bottom: 10px; /* Add margin for spacing */
`;

const Menu = ({ onRestart, onPause, onShowCurrentTarget, onHint, onPolyhedronChange, onOpenRules }) => {
  return (
    <MenuContainer>
      <Dropdown
        onChange={(e) => onPolyhedronChange(Number(e.target.value))}
        defaultValue={30} /* Set default value to 30 */
      >
        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </Dropdown>
      <Button onClick={onRestart}>Restart</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onShowCurrentTarget}>Show Current Target</Button>
      <Button onClick={onHint}>Hint</Button>
      <Button onClick={onOpenRules}>Rules</Button>
    </MenuContainer>
  );
};

export default Menu;
