import React, { useState, useEffect, useRef } from 'react';
import * as d3Voronoi from 'd3-voronoi';
import * as d3Color from 'd3-color';
import styled from 'styled-components';
import Menu from './Menu';
import Timer from './Timer';
import RulesModal from './RulesModal';
import ScoreModal from './ScoreModal'; // Ensure this import is correct
import Leaderboard from './Leaderboard'; // Ensure this import is correct

const GameContainer = styled.div`
  display: flex;
  flex-direction: row; /* Change to row layout */
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const MenuContainer = styled.div`
  width: 200px; /* Adjust width as needed */
  padding: 20px;
  background-color: #f9f9f9;
  border-right: 2px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const LeaderboardContainer = styled.div`
  width: 200px; /* Adjust width as needed */
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 2px solid #ddd;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;

const GameAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const GameArea = styled.svg`
  width: 500px;
  height: 500px;
  border: 2px solid black;
  position: relative;
`;

const PauseOverlay = styled.div`
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
  z-index: 1000;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const RulesModalContainer = styled.div`
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
`;

const Polygon = styled.polygon`
  fill: ${(props) => props.bgColor};
  stroke: black;
  stroke-width: 2;
  cursor: pointer;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Text = styled.text`
  fill: ${(props) => props.textColor};
  font-size: 14px;
  font-weight: bold;
  dominant-baseline: middle;
  text-anchor: middle;
`;

const Popup = styled.div`
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

const TimerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function Game() {
  const [polyhedrons, setPolyhedrons] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [polyhedronCount, setPolyhedronCount] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hintActive, setHintActive] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);

  const timerRef = useRef(null);

  useEffect(() => {
    window.currentTargetNumber = currentNumber;
  }, [currentNumber]);

  const generateRandomPoints = (count) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push([Math.random() * 500, Math.random() * 500]);
    }
    return points;
  };

  const generatePolyhedrons = (count) => {
    const newPoints = generateRandomPoints(count);
    const voronoi = d3Voronoi.voronoi()
      .extent([[0, 0], [500, 500]])
      .polygons(newPoints);

    const newPolyhedrons = voronoi.map((polygon, index) => ({
      id: index + 1,
      points: polygon,
      number: index + 1,
      color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
      isVisible: true,
    }));

    setPolyhedrons(newPolyhedrons);
  };

  const calculateCentroid = (points) => {
    const x = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    const y = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    return [x, y];
  };

  const handlePolyhedronClick = (number) => {
    if (!isPaused && number === currentNumber) {
      if (polyhedrons.length === 1) { // Last polyhedron clicked
        setIsScoreModalOpen(true);
      }
      setCurrentNumber(prevNumber => prevNumber + 1);
      setPolyhedrons(prev => prev.filter((poly) => poly.number !== number));
    } else if (!isPaused && number !== currentNumber) {
      setPolyhedrons(prev => prev.map(poly => poly.number === number ? { ...poly, color: '#ff0000' } : poly));
      setTimeout(() => {
        setPolyhedrons(prev => prev.map(poly => poly.number === number ? { ...poly, color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) } : poly));
      }, 500);
    }
  };

  const handlePauseClick = () => {
    setIsPaused(prev => !prev);
  };

  const handleShowCurrentTarget = () => {
    setPopupText(`Current target: ${currentNumber}`);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  const handleHint = () => {
    setHintActive(true);
    setPolyhedrons(prev => prev.map(poly => ({ ...poly, isVisible: poly.number === currentNumber })));
    setTimeout(() => {
      setHintActive(false);
      setPolyhedrons(prev => prev.map(poly => ({ ...poly, isVisible: true })));
    }, 1000);
  };

  const handleSaveScore = (name) => {
    const newScore = {
      name,
      time: timerRef.current.seconds, // Ensure this returns the correct time value
    };

    // Update leaderboard based on the polyhedron count
    setCurrentLeaderboard(prev => [...prev, newScore].sort((a, b) => a.time - b.time));
    setIsScoreModalOpen(false);
  };

  useEffect(() => {
    generatePolyhedrons(polyhedronCount);
    setCurrentNumber(1);
    if (timerRef.current) {
      timerRef.current.reset();
    }
  }, [polyhedronCount]);

  useEffect(() => {
    generatePolyhedrons(polyhedronCount);
    setCurrentNumber(1);
    if (timerRef.current) {
      timerRef.current.reset();
    }
  }, []);

  return (
    <GameContainer>
      <MenuContainer>
        <Menu
          onRestart={() => {
            generatePolyhedrons(polyhedronCount);
            setCurrentNumber(1);
            if (timerRef.current) {
              timerRef.current.reset();
            }
          }}
          onPause={handlePauseClick}
          onShowCurrentTarget={handleShowCurrentTarget}
          onHint={handleHint}
          onPolyhedronChange={(count) => setPolyhedronCount(count)}
          onOpenRules={() => setIsModalOpen(true)}
        />
      </MenuContainer>
      <GameAreaContainer>
        <GameArea>
          {polyhedrons.map((poly) => {
            let color;
            try {
              color = d3Color.color(poly.color);
              if (!color) throw new Error('Invalid color');
            } catch {
              color = d3Color.color('#000000');
            }
            const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
            const textColor = brightness > 180 ? 'black' : 'white';
            const [cx, cy] = calculateCentroid(poly.points);
            return (
              <g key={poly.id} onClick={() => handlePolyhedronClick(poly.number)}>
                <Polygon points={poly.points.map((p) => p.join(',')).join(' ')} bgColor={poly.color} isVisible={poly.isVisible} />
                {poly.isVisible && (
                  <Text x={cx} y={cy} textColor={textColor}>
                    {poly.number}
                  </Text>
                )}
              </g>
            );
          })}
        </GameArea>
        <TimerContainer>
          <Timer ref={timerRef} isActive={!isPaused} />
        </TimerContainer>
      </GameAreaContainer>
      <LeaderboardContainer>
        <Leaderboard scores={currentLeaderboard} />
      </LeaderboardContainer>
      <PauseOverlay isVisible={isPaused} onClick={handlePauseClick}>
        Game is paused, click to Resume
      </PauseOverlay>
      <Popup isVisible={isPopupVisible}>{popupText}</Popup>
      <RulesModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      <ScoreModal
        isOpen={isScoreModalOpen}
        onRequestClose={() => setIsScoreModalOpen(false)}
        onSave={handleSaveScore}
      />
    </GameContainer>
  );
}

export default Game;
