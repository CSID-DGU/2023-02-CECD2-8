import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import Search from "./search.png";
import { Link, useNavigate } from "react-router-dom";
import './univinfopage.css';

function Univinfopage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const[userID, setuserID] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(loggedIn);
    setuserID(userID);

    const fetchData = async () => {
      try {
        const response = await fetch('http://3.38.161.125/universitysearch.php');
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const toPage = (university) => {
    navigate('/srgsrecpage', { state: { resultData: university } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = universities.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(universities.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="univinfopage">
      <div className="univinfo-header">
        <Link to='/' className="univinfo-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="univinfo-logoimg" alt="logo" />
        </Link>

        <div className='univinfo-title'>
            <span className='univinfo-title-text'> 대학원 정보 </span>
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
                <button className="dropdown-button">저장된 게시물</button>
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

      <div className="univinfo-line"></div>

      <div className='univinfo-content'>
        <ul>
          {currentItems.map((university, index) => (
            <li key={index}>
              <div>
                <button onClick={() => toPage(university)}>- {university}</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {pageNumbers.map(number => (
            <span key={number} onClick={() => setCurrentPage(number)}>
              [{number}]
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Univinfopage;
