import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/add" element={<AddStudentPage/>} />
          <Route path="/edit/:id" element={<EditStudentPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;