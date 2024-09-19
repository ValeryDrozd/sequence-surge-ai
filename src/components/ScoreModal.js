import React, { useState } from "react";
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const ScoreModal = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      setName("");
    }
  };

  return isOpen ? (
    <ModalBackground>
      <ModalContent>
        <h2>Enter Your Name</h2>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <Button onClick={handleSave}>Save Result</Button>
        <Button onClick={onRequestClose}>Cancel</Button>
      </ModalContent>
    </ModalBackground>
  ) : null;
};

export default ScoreModal;
