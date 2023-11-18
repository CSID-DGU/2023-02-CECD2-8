import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './univinfopage.css';

function Univinfopage() {
  const navigate = useNavigate();
  return (
    <div className="searchresultpage">
      <div className="sr-header">
        <Link to='/' className="sr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="sr-logoimg" alt="logo" />
        </Link>

        <div className='ui-title'>
            <span className='ui-title-text'> 대학교 정보 </span>
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

      <context className='ui-content1'>
        <div className='ui-name'></div>
        <div className='ui-university'></div>
        <div className='ui-keyword'></div>
        <div className='ui-sitelink'></div>
      </context>


      </div>
  );
}

export default Univinfopage;
