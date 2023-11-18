import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import Search from "./search.png";
import { Link, useNavigate,useLocation } from "react-router-dom";
import "./srprofpage.css";

function Srprofpage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const location = useLocation();
  const resultData = location.state.resultData;
  
  const fetchDataFromDatabase = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://43.202.99.112/prosearch.php?query=${dataToQuery}`)
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
    <div className="srprofpage">
      <div className="sp-header">
        <Link
          to="/"
          className="sp-logo"
          style={{ textDecoration: "none" }}
          onClick={() => navigate("/mainpage")}
        >
          <img src={logo} className="sp-logoimg" alt="logo" />
        </Link>

        <div className="sp-title">
          <span>교수 정보</span>
        </div>

        {isLoggedIn ? (
          <div className="user-dropdown">
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

      <div className="sp-line"></div>

      {searchResults.map((pro,index)=>(
        <><div className="sp-prof">
          <div className="prof_name">{pro.ProfessorName}</div>
        </div><div className="sp-contents">
            <div className="sp-info1">
              <p>소속 대학명>{pro.UniversityName}</p>
              <span>website>{pro.UniversitySite}</span>
              <p>메일></p>
              <span>{pro.Email}</span>
            </div>
            <div className="sp-info2">
              <p>직책></p>
              <span>{pro.Title}</span>
              <p>전화번호></p>
              <span>{pro.PhoneNumber}</span>
            </div>
            <div className="sp-info3">
              <p>교수 사이트></p>
              <span>{pro.SiteLink}</span>
              <p>연구분야></p>
              <span>{pro.ResearchArea}</span>
              <p>교수소개></p>
              <span>{pro.ResearchDescription}</span>
            </div>
          </div></>

      ))}
      
    </div>
  );
}

export default Srprofpage;
