import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./changePage.css"; // Make sure to create the corresponding CSS file

function ChangePage() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
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

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    setFormData(prevFormData => ({
      ...prevFormData,
      username: userID
    }));
  }, [userID]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    alert(queryParams)
    try {
      const response = await fetch(`http://3.38.161.125/updataUserInfo.php?${queryParams}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();   
        if (data.message==='User data updated successfully') {
          alert('수정 성공！'); 
          navigate('/');
        } else {
          alert("Failed to update user information");
        }
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };



  return (
    <div className="changepage">
      <h2>개인 정보 수정</h2>
      <label>UserID :    {userID}</label>
     
      <form onSubmit={handleSubmit}>
    
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
            
        <button type="submit" >저장</button>
      </form>
    </div>
  );
}

export default ChangePage;
