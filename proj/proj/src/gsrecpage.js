import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './gsrecpage.css';

function Gsrecpage() {
  const navigate = useNavigate();
  return (
    <div className="gsrecpage">
      <div className="gsrec-header">
        <Link to='/' className="gsrec-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gsrec-logoimg" alt="logo" />
        </Link>

        <div className='gsr-title'>
            <span className='gsr-title-text'> 대학원 추천 </span>
        </div>
        
        <div class="sr-menu">
          <div class="sr-menu-icon">
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
            <div class="sr-bar"></div>
          </div>
          <div className='gsr-login'>
          <Link to="/loginpage" className="login" style={{ textDecoration: "none" }} onClick={() => navigate('/loginpage')}>
            <span className="gsr-login-text">로그인</span>
          </Link>
          </div>
        </div>
      </div>
      
      <div className="gsr-line"></div>

      <div className="gsr-contents">
        <div className='gsr-content1'>
          <span>1. 대학명</span>
        </div>
        <div className='gsr-content2'>
          <span>2. 대학명</span>
        </div>
        <div className='gsr-content3'>
          <span>3. 대학명</span>
        </div>
        <div className='gsr-content4'>
          <span>4. 대학명</span>
        </div>
        <div className='gsr-content5'>
          <span>5. 대학명</span>
        </div>
      </div>
      
    </div>
  );
}

export default Gsrecpage;
