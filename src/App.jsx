import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Dash from "./Pages/Dash/Dash";
import Explore from "./Pages/Explore/Explore";
import PageTransition from "./Reusable Components/PageTransition";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </>
  );
}

export default App;
