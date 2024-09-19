import React from "react";
import styled from "styled-components";

const LeaderboardContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh; /* Full window height */
  width: 300px;
  background: #fafafa;
  padding: 20px;
  border-left: 2px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto; /* Add scrolling if content overflows */
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 18px;
  font-weight: normal;
  color: #555;
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoDataMessage = styled.div`
  font-size: 18px;
  color: #777;
  text-align: center;
  margin-top: 50px;
`;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

function Leaderboard({ scores }) {
  return (
    <LeaderboardContainer>
      <Title>Leaderboard</Title>
      {scores.length === 0 ? (
        <NoDataMessage>No scores available</NoDataMessage>
      ) : (
        <List>
          {scores.map((score, index) => (
            <ListItem key={index}>
              <span>{score.name}</span>
              <span>{formatTime(score.time)}</span>
            </ListItem>
          ))}
        </List>
      )}
    </LeaderboardContainer>
  );
}

export default Leaderboard;
