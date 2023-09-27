import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import Home from './components/pages/Homepage/Home';

function App() {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" component={About} /> */}
        </Routes>
    </Router>
  )
}

export default App;
