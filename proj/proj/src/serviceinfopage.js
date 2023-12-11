import React, { useEffect, useState } from "react";
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import searchinfo1 from './searchinfo1.png';
import searchinfo2 from './searchinfo2.png';
import searchinfo3 from './searchinfo3.png';
import recinfo1 from './recinfo1.png';
import recinfo2 from './recinfo2.png';
import recinfo3 from './recinfo3.png';
import './serviceinfopage.css';

function Serviceinfopage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userID, setuserID] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(loggedIn);
    setuserID(userID);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toUserinfo=()=>{
    localStorage.setItem("userID",userID);
      navigate('/userinfo');
  }


  return (
    <div className="serviceinfopage">
      <div className="si-header">
        <Link to='/' className="si-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="si-logoimg" alt="logo" />
        </Link>

        <div className='si-title'>
            <span className='si-title-text'> 서비스 소개 </span>
        </div>

        {isLoggedIn ? (
          <div className="sg-user-dropdown">
            <div className="menu-icon" onClick={toggleDropdown}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <button className="dropdown-button" onClick={toUserinfo}>회원정보</button>
                <button className="dropdown-button">내 게시물</button>
                <button className="dropdown-button">저장한 게시물</button>
                <button className="dropdown-button" onClick={logout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="sg-login">
            <Link
              to="/loginpage"
              className="login"
              style={{ textDecoration: "none" }}
              onClick={() => navigate("/loginpage")}
            >
              <span className="login-text">로그인</span>
            </Link>
          </div>
        )}
      </div>
      <div className="si-line"></div>

      <div className='si-service'>
        <context className='si-service1'>
          <h2>[기능 1 - 검색 기능] </h2>
          <div className="info1">
            <img src={searchinfo1} className="si-searchimg" alt="logo" />
            <img src={searchinfo2} className="si-searchimg" alt="logo" />
            <img src={searchinfo3} className="si-searchimg" alt="logo" />
          </div>
          <p> 1. 대학명, 교수 이름, 위치 중 검색에 사용할 키워드 항목을 선택한다. <br/> 
          2. 검색어를 입력한다.<br/> 
          3. 선택한 키워드 항목에 따라 대학교 정보, 교수 정보, 연구실 정보를 제공한다. <br/> <br/> 
          </p> 
        </context>
        <context className='si-service2'>
          <h2>[기능 2 - 추천 기능] </h2>
          <div className="info2">
            <img src={recinfo1} className="si-searchimg" alt="logo" />
            <img src={recinfo2} className="si-searchimg" alt="logo" />
            <img src={recinfo3} className="si-searchimg" alt="logo" />
          </div>
          <p> 1. 대학원, 교수, 대학원+교수 중에서 추천 받고 싶은 분야를 선택한다. <br/>
          2. 각각의 속성을 선택 및 입력한 후, 우선순위를 매긴다. <br/>
          3. 추천 결과를 제공한다.
          </p>
        </context>{
        /*<context className='si-service3'>
          <h2>기능 3> 커뮤니티 기능 </h2>
          <p>미국에서 유학 중인 사람과 유학을 준비하는 사람들 간 정보를 공유할 수 있는 공간이 마련된다.<br/>
          유학을 준비 중이거나 유학을 고민하는 학생들에게 대학원을 유학중인 사람들의 경험과 대학원 정보를 볼 수 있다.
          </p>
        </context>*/
        }
      </div>
    </div>
  );
}

export default Serviceinfopage;
