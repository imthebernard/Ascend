import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; 

import Navigation from './layout/Navigation';
import Homepage from './layout/Homepage';
import Footer from './layout/Footer';
import Services from './layout/Services';
import Contact from './layout/Contact';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Catch-All Route to Redirect All Unknown URLs to Homepage */}
        <Route path="*" element={<Homepage />} />


      </Routes>
      <Footer />

    </Router>
  );
}

export default App;

