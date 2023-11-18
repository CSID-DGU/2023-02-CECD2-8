import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './signuppage.css';

function Signuppage() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    nickname: '',
    birthdate: '',
    sex: '',
    nationality: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  // ...
const handleSubmit = async (e) => {
  e.preventDefault();
  const queryParams = new URLSearchParams(formData).toString();

  try {
    const response = await fetch(`http://43.202.99.112/signUp.php?${queryParams}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();   
      if (data.message === 'Data received and user registered successfully') {
        alert('회원 가입 성공！'); 
        navigate('/loginpage');
      } else if (data.message ==='UserID already exists') {
        
        alert('아이디가 이미 존재합니다. 다른 아이디를 선택하십시오.');
      } else {
        
        alert('알 수 없는 오류가 발생했습니다. 나중에 다시 시도하십시오.');
      }
    } else {
      console.error('Error sending data:', response.status);
      
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
// ...



  return (
    <div className="signuppage">
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSubmit}>
          <Link to='/' style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
            <img src={logo} className="signup-logoimg" alt="logo" />
          </Link>
          <h1 className="signup-h1">회원가입</h1>
          <div className="signup-line"></div>
          <div className="su-form">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            className="signup-id"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="signup-pw"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            className="signup-email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="이름"
            className="signup-name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            className="signup-nickname"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birthdate"
            placeholder="[선택] 생년월일 8자리"
            className="signup-birthdate"
            onChange={handleChange}
          />
          <div className='radio-form2'>
            <div className='radio-item'>
              <input
                type="radio"
                className='radio-input'
                name='sex'
                value='남자'
                onChange={handleChange}
                required
              />
              <label>남자</label>
              <input
                type="radio"
                className='radio-input'
                name='sex'
                value='여자'
                onChange={handleChange}
                required
              />
              <label>여자</label>
            </div>
            <div className='radio-item'>
              <input
                type="radio"
                className='radio-input'
                name='nationality'
                value='내국인'
                onChange={handleChange}
                required
              />
              <label>내국인</label>
              <input
                type="radio"
                className='radio-input'
                name='nationality'
                value='외국인'
                onChange={handleChange}
                required
              />
              <label>외국인</label>
            </div>
          </div>
          </div>
          <button type="submit" className="signup-text">가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default Signuppage;
