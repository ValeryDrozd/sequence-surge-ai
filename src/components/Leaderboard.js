import React from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0; /* Changed from left to right */
  width: 300px;
  background: white;
  padding: 20px;
  border: 2px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

function Leaderboard({ scores }) {
  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.time}
          </li>
        ))}
      </ul>
    </LeaderboardContainer>
  );
}

export default Leaderboard;
