import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Modal from './components/Modal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/rules" element={<Modal />} />
      </Routes>
    </Router>
  );
}

export default App;
