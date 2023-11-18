import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import Search from "./search.png";
import { Link, useNavigate,useLocation } from "react-router-dom";
import "./srlabpage.css";

function Srlabpage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const location = useLocation();
  const resultData = location.state.resultData;
  
  const fetchDataFromDatabase = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://43.202.99.112/labsearch.php?query=${dataToQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // 更新查询结果的状态
      })
      .catch((error) => {
        console.error("查询数据库时出错：", error);
      });
  };
  useEffect(() => {
    // 检查用户是否已登录
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    fetchDataFromDatabase(resultData);
  }, [resultData]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    
    navigate("/");
  };

  // const handleSearch = () => {
  //   if (searchQuery.trim() === "") {
  //     navigate("/");
  //   } else{
    
  //   fetch(`http://localhost/search.php?query=${searchQuery}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSearchResults(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching search results:", error);
  //     });}
  // };
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };
  return (
    <div className="srlabpage">
      <div className="sl-header">
        <Link
          to="/"
          className="sl-logo"
          style={{ textDecoration: "none" }}
          onClick={() => navigate("/mainpage")}
        >
          <img src={logo} className="sl-logoimg" alt="logo" />
        </Link>

        <div className="sl-title">
          <span>연구실 정보</span>
        </div>

        {isLoggedIn ? (
          <div className="sl-user-dropdown">
            <div className="menu-icon" onClick={toggleDropdown}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <button className="dropdown-button">회원정보수정</button>
                <button className="dropdown-button">내 게시물</button>
                <button className="dropdown-button">내 게시물</button>
                <button className="dropdown-button" onClick={logout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="sl-login">
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

      <div className="sl-line"></div>

      {searchResults.map((lab,index)=>
      
      <><div className="sl-lab">
          <div className="lab_name">{lab.LabName}</div>
        </div><div className="sl-contents">
            <p>담당교수></p>
            <span>{lab.ProfessorName}</span>
            <p>연구실설명></p>
            <span>{lab.LabDescription}</span>
            <p>연구실사이트></p>
            <span>{lab.LabWebsite}</span>
            <p>연구분야></p>
            <span>{lab.LabKeywordResearchField}</span>
            <p>연구실주소></p>
            <span>{lab.LabAddress}</span>
            <p>연구실이메일></p>
            <span>{lab.LabEmail}</span>
            <p>연구실전화번호></p>
            {lab.LabPhone ? (
          <span>{lab.LabPhone}</span>
        ) : (
          <span>No result</span>
        )}
    
          </div></>
      )}
      

    </div>
  );
}

export default Srlabpage;
