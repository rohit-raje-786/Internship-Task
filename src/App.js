import React from "react";
import "./App.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Event from "./Event";
import Home from "./Home";
import EditEvent from "./EditEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/editevt/:id" element={<EditEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
