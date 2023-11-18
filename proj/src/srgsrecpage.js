import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import Search from "./search.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./srgsrecpage.css";

function Srgsrecpage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const resultData = location.state.resultData;
  const [University,setUniversity]= useState([]);
  useEffect(() => {
    // 检查用户是否已登录
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    fetchDataFromDatabase(resultData);
    fetchDataFromDatabase1(resultData);
    
  }, [resultData]);
  function addHttpPrefix(url) {
    if (url && url.startsWith && !url.startsWith("http")) {
      return "http://" + url;
    }
    return url;
  }
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);

    navigate("/");
  };
  const fetchDataFromDatabase1 = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://43.202.99.112/search1.php?query=${dataToQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setUniversity(data); // 更新查询结果的状态
      })
      .catch((error) => {
        console.error("查询数据库时出错：", error);
      });
  };
  const fetchDataFromDatabase = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://43.202.99.112/search.php?query=${dataToQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // 更新查询结果的状态
      })
      .catch((error) => {
        console.error("查询数据库时出错：", error);
      });
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
    <div className="srgsrecpage">
      <div className="sg-header">
        <Link
          to="/"
          className="sg-logo"
          style={{ textDecoration: "none" }}
          onClick={() => navigate("/mainpage")}
        >
          <img src={logo} className="sg-logoimg" alt="logo" />
        </Link>
        <div className="sg-title">
          <span>대학원 정보</span>
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
      <div className="sg-line"></div>

      <div className="sg-univ">
        {University.map((school, index) => (
          <div className="title" key={index}>
            <div className="university_name">{school.UniversityName}</div>
          </div>
        ))}
      </div>

      <div className="sg-contents">
        
        <div className="sg-basic-info">
          <h2>학교 기본 정보</h2>
          {University.map((school, index) => (
          <div className="sg-bi" key={index}>
            <p>대학 사이트></p>
            <a href={addHttpPrefix(school.UniversitySite)} target="_blank" rel="noreferrer">
              {school.UniversitySite}
            </a>
            <p>주소></p>
            <span>{school.State},</span><span> {school.Address}</span><p>순위></p><span>{school.Ranking}</span>
            <p>연락처></p>
            <span>{school.Tel}</span>
          </div>
          ))}
        </div>
      
        
        <div className="sg-major1">
          <h2>학교 전공 정보</h2>
          {searchResults.map((major, index)=>(
            <>
          <div className="sg-msub1" >
            <p>전공분야{index + 1}></p>
            <span>{major.MajorName}</span>
            <p>위치</p>
            <span>{major.Adress}</span>
            <p>전공사이트></p>
            <span>{major.MajorSite}</span>
            <p>전화번호></p>
            <span>{major.ContactInfoTel}</span>
            <p>이메일></p>
            <span>{major.Email}</span>
            <p>입학요건사이트></p>
            <a href={addHttpPrefix(major.AdmissionRequirementsLink)} target="_blank" rel="noreferrer">
                {major.AdmissionRequirementsLink}
            </a>
          </div>
          <div className="sg-msub2">
            <p>입학신청마감일></p>
            <a href={addHttpPrefix(major.ApplicationDeadline)} target="_blank" rel="noreferrer">
                {major.ApplicationDeadline}
            </a>
            <p>입학신청비></p>
            <span>{major.ApplicationFee}</span>
            <p>등록금></p>
            <span>{major.Tuition}</span>
            <p>학사이수학점></p>
            <span>{major.MasterCredits}</span>
            <p>박사이수학점></p>
            <span>{major.DoctorCredits}</span>
          </div>
          </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Srgsrecpage;
