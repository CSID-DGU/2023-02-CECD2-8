import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userinfo.css";

import logo from "./logo.png";
import Search from "./search.png";

function Userinfo() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  
  const[userID, setuserID] = useState('');

  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  

    
const DB=(userID)=>{
    //alert(userID);
    const params = new URLSearchParams(userID);

    // 获取特定参数的值
    const username = params.get('username');
    setuserID(username);
   // alert(username);
    fetch(
      `http://3.38.161.125/userinfo.php?username=${username}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          
        } else if (data.message) {
          
          
        } else {
          setSearchResults(data);
        }
      })
      .catch((error) => {
        console.error("조회 오류：", error);
      });
  
    }
  
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userID = localStorage.getItem("userID");
        setIsLoggedIn(loggedIn);
        //setuserID(userID);
        DB(userID);
      }, [userID]);
  const toUserinfo=()=>{
    localStorage.setItem("userID",userID);
      navigate('/userinfo');
  }
  const toChange=()=>{
    localStorage.setItem("userID",userID);
    //alert(userID);
      navigate('/changePage');
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
              <div className="dropdown-content" onClick={toggleDropdown}>
                <div>
                <button className="dropdown-button" onClick={toUserinfo} >회원정보</button>
                <button className="dropdown-button" >내 게시물</button>
                <button className="dropdown-button">내 게시물</button>
                <button className="dropdown-button" onClick={logout}>
                  로그아웃
                </button>
                </div>
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

    
      
        <div className="all2">
          
            
              {searchResults.map((result, index) => (
                <div key={index} className="user-info-item">
                <div>
                  <p>{`UserID: ${result.UserID}`}</p>
                  <p>{`Email: ${result.Email}`}</p>
                  <p>{`Name: ${result.Name}`}</p>
                  <p>{`NickName: ${result.NickName}`}</p>
                  <p>{`Sex: ${result.Sex}`}</p>
                  <p>{`Nationality: ${result.Nationality}`}
                  </p>
                  {result.Year ? (
                    <p>{`Year: ${result.Year}`}</p>
                  ) : (
                    
                    <p>{`Year: No Result`}</p>
                  )}
                </div>
                </div>
              ))}
              <button className='change 'onClick={toChange}>수정</button>
        </div>
        
        </div>
     
   
  );
}

export default Userinfo;