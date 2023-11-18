import React from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './serviceinfopage.css';

function Serviceinfopage() {
  const navigate = useNavigate();
  return (
    <div className="serviceinfopage">
      <div className="sr-header">
        <Link to='/' className="sr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="sr-logoimg" alt="logo" />
        </Link>

        <div className='si-title'>
            <span className='si-title-text'> 서비스 소개 </span>
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

      <div className='si-service'>
        <context className='si-service1'>
          <h2>기능 1> 검색 기능 </h2>
          <p> 대학명, 교수 이름, 위치 중 검색에 사용할 키워드 항목을 정하여 검색어를 작성한다. <br/> 
          검색 결과로 대학교 기본 정보, 대학교 현황, 대학원 모집요강, 입학정원 및 경쟁률, 입학신청비 및 등록금에 대한 정보를 볼 수 있다.
          </p>
        </context>
        <context className='si-service2'>
          <h2>기능 2> 추천 기능 </h2>
          <p> 사용자는 연구하고 싶은 분야와 추천받고 싶은 분야를 필수적으로 선택한다. 위치 범위도 설정이 가능하다.
          <br/>
          추천 받고 싶은 분야로는 대학교 추천, 연구 추천, 교수 추천이 있다. 
          <br/>
          사용자가 관심있는 분야를 선택하면 순위에 따라 학교, 해당 분야에서 인기있는 연구 키워드, h-index를 기반으로 교수 또는 연구실을 추천한다.
          </p>
        </context>
        <context className='si-service3'>
          <h2>기능 3> 커뮤니티 기능 </h2>
          <p>미국에서 유학 중인 사람과 유학을 준비하는 사람들 간 정보를 공유할 수 있는 공간이 마련된다.<br/>
          유학을 준비 중이거나 유학을 고민하는 학생들에게 대학원을 유학중인 사람들의 경험과 대학원 정보를 볼 수 있다.
          </p>
        </context>
      </div>
    </div>
  );
}

export default Serviceinfopage;
