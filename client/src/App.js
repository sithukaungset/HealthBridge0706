import React, { Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './Patient/Home';
import Patient from "./Patient/Patient";
import Recordview from "./Patient/Recordview";
import Hospital from './DocAndHo/Hospital';
import Doctor from './DocAndHo/Doctor';
import InformationExchange from './Patient/InformationExchange';
//import ML from './MachineLearning/src/components/ML';

import './App.css';

function App() {

  return (
          <div className="App">
            <div className="main-content-view">
              <Router>
              <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/patient/:id" exact element={<Patient/>} />
                <Route path="/record" exact element={<Recordview/>} />
                <Route path="/information" exact element={<InformationExchange/>} />
                <Route path="/hospital/:id" element={<Hospital />} />
                <Route path="/doctor/:id" element={<Doctor />} />
              </Routes>
              </Router>
            </div>
          </div>
  );
}

export default App;