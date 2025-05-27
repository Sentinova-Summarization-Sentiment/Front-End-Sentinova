// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Sentiment from './pages/sentiment';
import Login from "./pages/login";
import Flow from "./pages/flow";
import Register from "./pages/Register";
import './app.css';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sentiment" element={<Sentiment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/flow" element={<Flow />} />
    </Routes>
  );
}

export default App;
