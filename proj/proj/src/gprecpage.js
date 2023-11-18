import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './gprecpage.css';

function Gprecpage() {
  const navigate = useNavigate();
  return (
    <div className="gprecpage">
      <div className="gpr-header">
        <Link to='/' className="gpr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gpr-logoimg" alt="logo" />
        </Link>

        <div className='gpr-title'>
            <span className='gpr-title-text'> 교수 추천 </span>
        </div>
        
        <div class="gpr-menu">
          <div class="sr-menu-icon">
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
          </div>
          <div className='gpr-login'>
          <Link to="/loginpage" className="login" style={{ textDecoration: "none" }} onClick={() => navigate('/loginpage')}>
            <span className="gpr-login-text">로그인</span>
          </Link>
          </div>
        </div>
      </div>
      
      <div className="gpr-line"></div>

      <div className="gpr-contents">
        <div className='gpr-content1'>
          <span>1. 교수명</span>
        </div>
        <div className='gpr-content2'>
          <span>2. 교수명</span>
        </div>
        <div className='gpr-content3'>
          <span>3. 교수명</span>
        </div>
        <div className='gpr-content4'>
          <span>4. 교수명</span>
        </div>
        <div className='gpr-content5'>
          <span>5. 교수명</span>
        </div>
      </div>

    </div>
  );
}

export default Gprecpage;
