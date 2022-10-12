import React from 'react';
import { MapPage } from './components/MapPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="maps" element={<MapPage />} />
    </Routes>
  </BrowserRouter>
);
export default App;
