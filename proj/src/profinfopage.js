import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './profinfopage.css';

function Profinifopage() {
  const navigate = useNavigate();
  return (
    <div className="searchresultpage">
      <div className="sr-header">
        <Link to='/' className="sr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="sr-logoimg" alt="logo" />
        </Link>

        <div className='pi-title'>
            <span className='pi-title-text'> 교수 정보 </span>
        </div>

        <div class="sr-menu">
          <div class="sr-menu-icon">
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
          </div>
          <Link to="/loginpage" className="sr-login" style={{ textDecoration: "none" }} onClick={() => navigate('/loginpage')}>
            <span className="sr-login-text">로그인</span>
          </Link>
        </div>
      </div>
      
      <div className="sr-line"></div>

      <context className='pi-content1'>
        <div className='pi-name'></div>
        <div className='pi-university'></div>
        <div className='pi-keyword'></div>
        <div className='pi-sitelink'></div>
      </context>

      </div>
  );
}

export default Profinifopage;
