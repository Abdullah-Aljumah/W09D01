import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import "./App.css"

import { Routes, Route } from "react-router";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
