import { generatePolyhedrons, calculateCentroid } from './GameUtils';

// Function to handle polyhedron click
export const handlePolyhedronClick = (number, currentNumber, isPaused, setCurrentNumber, setPolyhedrons) => {
  if (!isPaused && number === currentNumber) {
    setCurrentNumber(prevNumber => prevNumber + 1);
    setPolyhedrons(prev => prev.filter((poly) => poly.number !== number));
  } else if (!isPaused && number !== currentNumber) {
    // Change color of wrong polyhedron
    setPolyhedrons(prev => prev.map(poly => poly.number === number ? { ...poly, color: '#ff0000' } : poly));
    setTimeout(() => {
      setPolyhedrons(prev => prev.map(poly => poly.number === number ? { ...poly, color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) } : poly));
    }, 500);
  }
};

// Function to handle hint
export const handleHint = (currentNumber, setHintActive, setPolyhedrons) => {
  setHintActive(true);
  setPolyhedrons(prev => prev.map(poly => ({ ...poly, isVisible: poly.number === currentNumber })));
  setTimeout(() => {
    setHintActive(false);
    setPolyhedrons(prev => prev.map(poly => ({ ...poly, isVisible: true })));
  }, 1000); // Show hint for 1 second
};
