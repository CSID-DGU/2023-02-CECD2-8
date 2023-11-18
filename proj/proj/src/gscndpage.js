import React, { useState } from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './gscndpage.css';

function Gscndpage() {

  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedField, setSelectedField] = useState('');

  const handleRecommendation = () => {
    if (selectedField === 'Graduateschool') {
      // Navigate to a.js
      navigate('/sub1gscndpage');
    } else if (selectedField === 'professor') {
      // Navigate to b.js
      navigate('/sub2gscndpage');
    } else if (selectedField === 'gp') {
      // Navigate to b.js
      navigate('/sub3gscndpage');
    }
  };

  return (
    <div className="gscndpage">
      <div className="gscnd-box">
        <Link to='/' className="gscnd-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gscnd-logoimg" alt="logo" />
        </Link>
        <h1 className="gscnd-h1">분야 선택</h1>
        <div className="gscnd-line"></div>

        <div className='select-form'>
          <div name="select-Field">
            <span>추천받고 싶은 분야> </span>
            <select name="options" value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)} required>
              <option value="" disabled selected hidden>대학원, 교수, 대학원+교수 중 택1(필수)</option>
              <option value="Graduateschool">대학원</option>
              <option value="professor">교수</option>
              <option value="gp">대학원+교수</option>
            </select>
          </div>
        </div>
        <div className="next-button" onClick={handleRecommendation}>
          <span className="next-button-text">다음</span>
        </div>

      </div>
    </div>
  );
}

export default Gscndpage;
