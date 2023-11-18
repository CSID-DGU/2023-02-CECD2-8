import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from './mainpage';
import Loginpage from './loginpage';
import Signuppage from './signuppage';
import Srgsrecpage from './srgsrecpage';
import Srprofpage from './srprofpage';
import Srlabpage from './srlabpage';

import Serviceinfopage from './serviceinfopage';
import Gscndpage from './gscndpage';
import Cummunitypage from './cummunitypage';
import Univinfopage from './univinfopage';
import Profinfopage from './profinfopage';

import Sub1gscndpage from './sub1gscndpage';
import Sub2gscndpage from './sub2gscndpage';
import Sub3gscndpage from './sub3gscndpage';

import Gsrecpage from './gsrecpage';
import Gsprecpage from './gsprecpage';
import Gprecpage from './gprecpage';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="/signuppage" element={<Signuppage />} />
      <Route path="/srgsrecpage" element={<Srgsrecpage />} />
      <Route path="/srprofpage" element={<Srprofpage />} />
      <Route path="/srlabpage" element={<Srlabpage />} />

      <Route path="/serviceinfopage" element={<Serviceinfopage />} />
      <Route path="/gscndpage" element={<Gscndpage />} />
      <Route path="/cummunitypage" element={<Cummunitypage />} />
      <Route path="/univinfopage" element={<Univinfopage />} />
      <Route path="/profinfopage" element={<Profinfopage />} />

      <Route path="/sub1gscndpage" element={<Sub1gscndpage />} />
      <Route path="/sub2gscndpage" element={<Sub2gscndpage />} />
      <Route path="/sub3gscndpage" element={<Sub3gscndpage />} />

      <Route path="/gsrecpage" element={<Gsrecpage />} />
      <Route path="/gsprecpage" element={<Gsprecpage />} />
      <Route path="/gprecpage" element={<Gprecpage />} />


    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
