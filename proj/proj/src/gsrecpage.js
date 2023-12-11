import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { Form, Link, useNavigate, useLocation } from 'react-router-dom';
import './gsrecpage.css';
import queryString from 'query-string';

function Gsrecpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedFormData = location.state.queryParams;
  const [searchResults, setSearchResults] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userID, setuserID] = useState('');

  const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const formData = {};

    for (const [key, value] of params) {
      formData[key] = value;
    }

    return formData;
  };
  const formData = parseQueryString(receivedFormData);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(loggedIn);
    setuserID(userID);
    // 检查用户是否已登录
    const queryParams = queryString.stringify(formData);
    fetchDataFromDatabase(queryParams);
    //fetchDataFromDatabase(receivedFormData);
    console.log(queryParams);
    console.log(searchResults);
  }, []); // <- 계속 서버에 db fetch가 일어나지 않게 수정

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


  const fetchDataFromDatabase = (dataToQuery) => {
    fetch(`http://3.38.161.125/univRecommendTest.php?${dataToQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.message || data.length === 0){ // <- 빈 화면 안나오게 수정
          setSearchResults(false);
        }
        else{
          setSearchResults(data); // 更新查询结果的状态
        }
      })
      .catch((error) => {
        console.error("fetch 실패：", error);
      });
  };

  // 교수 결과페이지로 이동
  const toPage = (univ) => {
    navigate('/srgsrecpage', { state: { resultData: univ.UniversityName } });
  };

  return (
    <div className="gsrecpage">
      <div className="gsrec-header">
        <Link to='/' className="gsrec-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gsrec-logoimg" alt="logo" />
        </Link>

        <div className='gsr-title'>
            <span className='gsr-title-text'> 대학원 추천 </span>
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
      
      <div className="gsr-line"></div>

      
      <div className="gsr-contents">
      {/*db에서 해당하는 정보가 없으면 나오는 화면*/}
      {!searchResults && 
        <div className='gsr-content1'>
          <span>검색 결과가 없습니다.</span>
        </div>
      }
      {/*db에서 결과 가지고 온 화면. 현재 대학교 이름과 계산 점수 확인 가능. 다른 항목을 보여주고 싶으면 univ.(universityinfo 속성명)*/}
      {searchResults && searchResults.map((univ, index)=>{
        return(
        <div className='gsr-content1'>
          <p><button onClick={() => toPage(univ)}>{index+1}. {univ.UniversityName}</button></p>
          <span> - 전화번호: {univ.Tel} | 사이트: <a href={univ.UniversitySite}>{univ.UniversitySite}</a></span>
        </div>
        )
      })}
      </div>
      
    </div>
  );
}

export default Gsrecpage;