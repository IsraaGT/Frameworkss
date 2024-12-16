import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Info from './Info';
import Hello from './Hello';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/info" element={<Info />} />
            <Route path="/hello" element={<Hello />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
