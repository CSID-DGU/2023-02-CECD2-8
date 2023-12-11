import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./mainpage.css";
import logo from "./logo.png";
import Search from "./search.png";
import Userinfo from "./userinfo";

function Mainpage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategory, setSearchCategory] = useState("universityinfo");
  const [type, setType] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const [selectedOptionText, setSelectedOptionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
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

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchMessage("검색어를 입력하세요.");
      setSearchResults([]);
      setShowButtons(false);
      return;
    }

    setSearchResults([]);
    setShowSearchResults(true);
    let selectedOption1 = document.querySelector(".search-select").value;
    setSelectedOptionText(`[검색결과 : (${selectedOption1})${searchQuery}]`);

    const headerElement = document.querySelector(".all");
    const searchResultsElement = document.querySelector(".all2");

    if (headerElement) {
      headerElement.style.display = "none";
    }

    if (searchResultsElement) {
      searchResultsElement.style.display = "block";
    }

    fetch(
      `http://3.38.161.125/S.php?option=${searchCategory}&query=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setSearchMessage("조회 오류：" + data.error);
        } else if (data.message) {
          setSearchMessage(data.message);
        } else {
          setType(data.tableIdentifier);
          setSearchResults(data.data);
          setSearchMessage("");
        }
      })
      .catch((error) => {
        console.error("조회 오류：", error);
        setSearchMessage("조회 오류：" + error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toPage = (result) => {
    if (type === 'universityinfo') {
      navigate('/srgsrecpage', { state: { resultData: result } });
    } else if (type === 'professorinfo') {
      navigate('/srprofpage', { state: { resultData: result } });
    } else {
      navigate('srlabpage', { state: { resultData: result } });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const toUserinfo=()=>{
    localStorage.setItem("userID",userID);
      navigate('/userinfo');
  }

  return (
    <div className={`mainpage`}>
      <div className="header">
        {isLoggedIn ? (
          <div className="user-dropdown">
            <div className="menu-icon" onClick={toggleDropdown}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <button className="dropdown-button" onClick={toUserinfo} >회원정보</button>
                <button className="dropdown-button">내 게시물</button>
                <button className="dropdown-button">저장된 게시물</button>
                <button className="dropdown-button" onClick={logout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/loginpage"
            className="login"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/loginpage")}
          >
            <span className="login-text">로그인</span>
          </Link>
        )}
      </div>

      <Link
        to="/"
        className="logo"
        style={{ textDecoration: "none" }}
        onClick={() => navigate("/mainpage")}
      >
        <img src={logo} className="logoimg" alt="logo" />
      </Link>

      <div className="search-box">
        <div className="search">
          <select
            className="search-select"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="universityinfo">대학원명</option>
            <option value="location">위치명</option>
            <option value="professorinfo">교수명</option>
            <option value="labinfo">연구실명</option>
          </select>
          <input
            type="text"
            className="search-input"
            placeholder="검색어 입력"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="search-icon" onClick={handleSearch}>
            <img
              src={Search}
              className="searchimg"
              style={{ textDecoration: "none" }}
              alt="searchicon"
            />
          </button>
        </div>
      </div>

      <div className="all">
        <div className="main-buttons1">
          {showButtons && (
            <>
              <Link
                to="/serviceinfopage"
                className="main-link1"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/serviceinfopage")}
              >
                <span className="main-button-text1">서비스 소개</span>
              </Link>
              <Link
                to="/gscndpage"
                className="main-link1"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/gscndpage")}
              >
                <span className="main-button-text1">대학원 추천</span>
              </Link>
              <Link
                to="/cummunitypage"
                className="main-link1"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/cummunitypage")}
              >
                <span className="main-button-text1">커뮤니티</span>
              </Link>
            </>
          )}
        </div>

        <div className="main-buttons2">
          {showButtons && (
            <>
              <Link
                to="/univinfopage"
                className="main-link2"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/univinfopag")}
              >
                <span className="main-button-text2">대학원 정보</span>
              </Link>
              <Link
                to="/profinfopage"
                className="main-link2"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/profinfopage")}
              >
                <span className="main-button-text2">교수 정보</span>
              </Link>
              <Link
                to="/labinfopage"
                className="main-link2"
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/labinfopage")}
              >
                <span className="main-button-text2">연구실 정보</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {showSearchResults && (
        <div className="all2">
          <div className="search-results">
            <div className="rrr-message">{selectedOptionText}</div>
            <div className="search-message">{searchMessage}</div>
            <ul>
              {searchResults
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((result, index) => (
                  <li key={index}>
                    <div>
                      <button onClick={() => toPage(result)}>{result}</button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="main-pagination">
            {[...Array(Math.ceil(searchResults.length / itemsPerPage)).keys()].map(
              (number) => (
                <span key={number} onClick={() => paginate(number + 1)}>
                  [{number + 1}]
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
