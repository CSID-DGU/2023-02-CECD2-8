import React,{ useState} from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './loginpage.css';

function Loginpage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      username: '',
      password: '',
  });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    // ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    
    try {
      const response = await fetch(`http://43.202.99.112/Login.php?${queryParams}`, {
         method: 'GET',  
      });
  
      if (response.ok) {
        const data = await response.json();   
        if (data.message === 'Login successful') {
          alert('로그인 성공！'); 
          
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/');
        } else if (data.message ==='Invalid username or password') {
          alert('알 수 없는 아이디거나 틀린 비밀번호입니다.다시 입력하세요!');
        } else {
          alert('알 수 없는 오류가 발생했습니다. 나중에 다시 시도하십시오.');
        }
      } else {
        console.error('Error sending data:', response.status);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert(error);
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e); // 传递事件对象
    }
  };
  
  return (
    <div className="loginpage">
      <div className="login-header"></div>
      <div className="login-box">
        <Link to='/' className="login-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="login-logoimg" alt="logo" />
        </Link>
        <h1 className="login-h1">로그인</h1>
        <div className="login-line"></div>
        <form className="login-form" >
          <div>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            className="login-id"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="login-pw"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            required
          />
          </div>
          <Link to="/signuppage" style={{ textDecoration: "none" }} onClick={() => navigate('/signuppage')} className='login-su'>
            <span className='login-signup'>회원가입</span>
          </Link>
        </form>
        <form className="login-form2" onSubmit={handleSubmit}>
            <button type="submit" className="login-login-text">로그인</button>
        </form>
        
      </div>
    </div>
  );
}

export default Loginpage;
