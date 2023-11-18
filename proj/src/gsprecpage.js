import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './gsprecpage.css';

function Gsprecpage() {
  const navigate = useNavigate();
  return (
    <div className="gsprecpage">
      <div className="gsp-header">
        <Link to='/' className="gsp-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gsp-logoimg" alt="logo" />
        </Link>

        <div className='gsp-title'>
            <span className='gsp-title-text'> 대학원 및 교수 추천 </span>
        </div>
        
        <div class="sr-menu">
          <div class="sr-menu-icon">
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
          </div>
          <div className='gsp-login'>
            <Link to="/loginpage" className="login" style={{ textDecoration: "none" }} onClick={() => navigate('/loginpage')}>
              <span className="sr-login-text">로그인</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="gsp-line"></div>

      <div className="gsp-contents">
        <div className='gsp-content1'>
          <span>1. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content2'>
          <span>2. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content3'>
          <span>3. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content4'>
          <span>4. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content5'>
          <span>5. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
      </div>


    </div>
  );
}

export default Gsprecpage;
