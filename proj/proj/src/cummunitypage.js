import React from 'react';
import logo from './logo.png';
import Search from './search.png'
import { Link, useNavigate } from 'react-router-dom';
import './cummunitypage.css';

function Cummunitypage() {
  const navigate = useNavigate();
  return (
    <div className="cummunitypage">
      <div className="sr-header">
        <Link to='/' className="sr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="sr-logoimg" alt="logo" />
        </Link>

        <div className='cu-title'>
            <span className='cu-title-text'> 커뮤니티 </span>
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

      <div className='cu-body'>
        <div className='cu-nav'>
          <div className='selected'>전체게시판></div>
          <div>대학원 Q&A&gt; </div>
          <div>대학원 시험/면접 후기></div>
          <div>입학 요강 및 공고></div>
        </div>
        <div class="vertical-line"></div>
        <div className='cu-content'>
          <span>[전체게시판]</span>
          <div className='cu-search-box'>
            <div className='cu-search'>
              <input type="text" className="cu-search-input" placeholder="검색어 입력" />
                <Link to="/searchresultpage" className="cu-search-icon" style={{ textDecoration: "none" }} onClick={() => navigate('/searchresultpage')}>
                  <img src={Search} className="cu-searchimg" alt="searchicon" />
                </Link>
            </div>
          </div>
          <table className='cu-table'>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th> 작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>제목 1</td>
                <td>작성자 1</td>
                <td>2023-10-01</td>
              </tr>
              <tr>
                <td>2</td>
                <td>제목 2</td>
                <td>작성자 2</td>
                <td>2023-10-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cummunitypage;
