import React, { useState, useEffect, useRef } from "react";
import * as d3Voronoi from "d3-voronoi";
import * as d3Color from "d3-color";
import styled from "styled-components";
import Menu from "./Menu";
import Timer from "./Timer";
import RulesModal from "./RulesModal";
import ScoreModal from "./ScoreModal"; // Ensure this import is correct
import Leaderboard from "./Leaderboard"; // Ensure this import is correct
import GameOverModal from "./GameOverModal";
import { firestore } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
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
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

const Image = styled.image`
  width: 20px;
  height: 20px;
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
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.3s ease;
`;

const TimerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const TitleLabel = styled.div`
  font-size: 48px; /* Larger font size */
  font-weight: bold;
  color: #4a90e2; /* Cool blue color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow effect for better readability */
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 2px; /* Spacing between letters */
  background: linear-gradient(45deg, #f06, #f79); /* Gradient background */
  -webkit-background-clip: text; /* Clip background to text */
  color: transparent; /* Hide the text color to show gradient */
  border-radius: 10px; /* Rounded corners */
  padding: 10px; /* Padding around text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
`;

function Game() {
  const [polyhedrons, setPolyhedrons] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [polyhedronCount, setPolyhedronCount] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hintActive, setHintActive] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);
  const [hintCount, setHintCount] = useState(5);
  const [showTargetCount, setShowTargetCount] = useState(5);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium"); // Default to Medium
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

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
    const voronoi = d3Voronoi
      .voronoi()
      .extent([
        [0, 0],
        [500, 500],
      ])
      .polygons(newPoints);

    const newPolyhedrons = voronoi.map((polygon, index) => ({
      id: index + 1,
      points: polygon,
      number: index + 1,
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
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
    if (difficulty === "IronMan") {
      if (!isPaused && number !== currentNumber) {
        setIsGameOverModalOpen(true); // Open Game Over modal
        setIsGameCompleted(true);
        timerRef.current.stop();
        return;
      }
    }

    if (!isPaused && number === currentNumber) {
      if (polyhedrons.length === 1) {
        // Last polyhedron clicked
        setIsScoreModalOpen(true);
        setIsGameCompleted(true); // Mark game as completed
        timerRef.current.stop();
      }
      setCurrentNumber((prevNumber) => prevNumber + 1);
      setPolyhedrons((prev) => prev.filter((poly) => poly.number !== number));
    } else if (!isPaused && number !== currentNumber) {
      if (difficulty !== "IronMan") {
        setPolyhedrons((prev) =>
          prev.map((poly) =>
            poly.number === number ? { ...poly, color: "#ff0000" } : poly
          )
        );
        setTimeout(() => {
          setPolyhedrons((prev) =>
            prev.map((poly) =>
              poly.number === number
                ? {
                    ...poly,
                    color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
                  }
                : poly
            )
          );
        }, 500);
      }
    }
  };

  const handlePauseClick = () => {
    setIsPaused((prev) => !prev);
  };

  const handleShowCurrentTarget = () => {
    if (difficulty === "Hard" || difficulty === "IronMan") return;
    if (showTargetCount > 0) {
      setPopupText(`Current target: ${currentNumber}`);
      setIsPopupVisible(true);
      setShowTargetCount((prev) => prev - 1); // Decrease Show Current Target count
      setTimeout(() => setIsPopupVisible(false), 3000);
    }
  };

  const handleHint = () => {
    if (difficulty === "Hard" || difficulty === "IronMan") return;
    if (hintCount > 0) {
      setHintActive(true);
      setHintCount((prev) => prev - 1); // Decrease hint count
      setPolyhedrons((prev) =>
        prev.map((poly) => ({
          ...poly,
          isVisible: poly.number === currentNumber,
        }))
      );
      setTimeout(() => {
        setHintActive(false);
        setPolyhedrons((prev) =>
          prev.map((poly) => ({ ...poly, isVisible: true }))
        );
      }, 1000);
    }
  };

  const fetchLeaderboardData = async (diff) => {
    try {
      const scoresRef = collection(
        firestore,
        `leaderboards/${polyhedronCount}/scores`
      );
      const q = query(scoresRef, orderBy("time"), limit(10)); // Order by time and limit to 10 results
      const querySnapshot = await getDocs(q);
      const fetchedScores = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((score) => score.difficulty === diff); // Filter by difficulty
      setCurrentLeaderboard(fetchedScores);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const handleSaveScore = async (name) => {
    try {
      const scoresRef = collection(
        firestore,
        `leaderboards/${polyhedronCount}/scores`
      );
      const newScore = {
        name,
        time: timerRef.current.seconds, // Ensure this returns the correct time value
        difficulty, // Add difficulty here
      };
      await addDoc(scoresRef, newScore); // Add new score to Firestore
      handleRestart();
      fetchLeaderboardData(difficulty); // Refresh leaderboard after saving
      setIsScoreModalOpen(false);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  useEffect(() => {
    generatePolyhedrons(polyhedronCount);
    setCurrentNumber(1);
    if (timerRef.current) {
      timerRef.current.reset();
    }

    fetchLeaderboardData(difficulty); // Fetch leaderboard data
  }, [polyhedronCount]);

  useEffect(() => {
    generatePolyhedrons(polyhedronCount);
    setCurrentNumber(1);
    if (timerRef.current) {
      timerRef.current.reset();
    }
  }, []);

  useEffect(() => {
    switch (difficulty) {
      case "Easy":
        setHintCount(Infinity); // Unlimited hints
        setShowTargetCount(Infinity); // Unlimited target shows
        break;
      case "Medium":
        setHintCount(5);
        setShowTargetCount(5);
        break;
      case "Hard":
      case "IronMan":
        setHintCount(0);
        setShowTargetCount(0);
        break;
      default:
        setHintCount(5);
        setShowTargetCount(5);
    }
  }, [difficulty, polyhedronCount]);

  const handleRestart = () => {
    generatePolyhedrons(polyhedronCount);
    setCurrentNumber(1);
    if (timerRef.current) {
      timerRef.current.reset();
    }
    setHintCount(
      difficulty === "Easy" ? Infinity : difficulty === "Medium" ? 5 : 0
    );
    setShowTargetCount(
      difficulty === "Easy" ? Infinity : difficulty === "Medium" ? 5 : 0
    );
    setIsGameCompleted(false);
  };

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    handleRestart(); // Restart game with new difficulty settings
    fetchLeaderboardData(diff);
  };

  const generateNumberImage = (number, textColor) => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    // Set background to transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font styles
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the number in the center
    ctx.fillText(number, canvas.width / 2, canvas.height / 2);

    // Return image data URL
    return canvas.toDataURL();
  };

  return (
    <GameContainer>
      <MenuContainer>
        <Menu
          onRestart={handleRestart}
          onPause={handlePauseClick}
          onShowCurrentTarget={handleShowCurrentTarget}
          onHint={handleHint}
          onPolyhedronChange={(count) => setPolyhedronCount(count)}
          onOpenRules={() => setIsModalOpen(true)}
          hintCount={hintCount}
          showTargetCount={showTargetCount}
          isGameCompleted={isGameCompleted} // Pass the game completion state
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
      </MenuContainer>
      <GameAreaContainer>
        <TitleLabel>Sequence Surge AI</TitleLabel>
        <GameArea>
          {polyhedrons.map((poly) => {
            let color;
            try {
              color = d3Color.color(poly.color);
              if (!color) throw new Error("Invalid color");
            } catch {
              color = d3Color.color("#000000");
            }
            const brightness =
              (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
            const textColor = brightness > 180 ? "black" : "white";
            const [cx, cy] = calculateCentroid(poly.points);
            return (
              <g
                key={poly.id}
                onClick={() => handlePolyhedronClick(poly.number)}
              >
                <Polygon
                  points={poly.points.map((p) => p.join(",")).join(" ")}
                  bgColor={poly.color}
                  isVisible={poly.isVisible}
                />
                {poly.isVisible && (
                  <Image
                    x={cx - 10}
                    y={cy - 10}
                    href={generateNumberImage(poly.number, textColor)}
                  />
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
      <RulesModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <ScoreModal
        isOpen={isScoreModalOpen}
        onRequestClose={() => {
          setIsScoreModalOpen(false);
          handleRestart();
        }}
        onSave={handleSaveScore}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onRequestClose={() => {
          handleRestart();
          setIsGameOverModalOpen(false);
        }}
      />
    </GameContainer>
  );
}

export default Game;
