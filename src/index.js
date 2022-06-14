import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Teachers from "./routes/Teachers";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/teacher" element={<Teachers />} />
          <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>
);