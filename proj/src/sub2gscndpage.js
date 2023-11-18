import React, { useState } from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import "./sub2gscndpage.css";

function Sub2gscndpage() {
    const navigate = useNavigate();
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedField, setSelectedField] = useState('');
  
    const handleRecommendation = () => {
      if (selectedField === 'Graduateschool') {
        // Navigate to a.js
        navigate('/gsrecpage');
      } else if (selectedField === 'professor') {
        // Navigate to b.js
        navigate('/gprecpage');
      } else if (selectedField === 'gp') {
        // Navigate to b.js
        navigate('/grrecpage');
      }
    };
  
    return (
      <div className="sub2-gscndpage">
        <div className="sub2-gscnd-box">
          <Link to='/' className="sub2-gscnd-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
            <img src={logo} className="sub2-gscnd-logoimg" alt="logo" />
          </Link>
          <h1 className="sub2-gscnd-h1">선택사항</h1>
          <div className="sub2-gscnd-line"></div>
  
          <div className='sub2-select-form'>
            <div className="sub2-select-major">
            <span>연구하고 싶은 분야> </span>
            <select className="options" required>
              <option disabled selected hidden>전공분야선택(필수)</option>
              <option value="SIGACCESS">SIGACCESS(접근 가능한 컴퓨팅)</option>
              <option value="SIGACT">SIGACT(알고리즘 및 계산 이론)</option>
              <option value="SIGADA">SIGADA(Ada 프로그래밍 언어)</option>
              <option value="SIGAI">SIGAI(인공 지능)</option>
              <option value="SIGAPP">SIGAP(응용 컴퓨팅)</option>
              <option value="SIGARCH">SIGARCH(컴퓨터 아키텍처)</option>
              <option value="SIGBED">SIGBED(임베디드 시스템)</option>
              <option value="SIGBIO">SIGBIO(생물정보학, 컴퓨터 생물학)</option>
              <option value="SIGCAS">SIGCAS(컴퓨터와 사회)</option>
              <option value="SIGCHI">SIGCHI(컴퓨터-인간 상호작용)</option>
              <option value="SIGCOMM">SIGCOMM(데이터 통신)</option>
              <option value="SIGCSE">SIGCSE(컴퓨터 공학 교육)</option>
              <option value="SIGDA">SIGDA(설계 자동화)</option>
              <option value="SIGDOC">SIGDOC(커뮤니케이션 디자인)</option>
              <option value="SIGECOM">SIGECOM(경제 및 계산)</option>
              <option value="SIGENERGY">SIGENERGY(에너지 시스템 및 정보학)</option>
              <option value="SIGEVO">SIGEVO(유전 및 진화 계산)</option>
              <option value="SIGGRAPH">SIGGRAPH(컴퓨터 그래픽 분야)</option>
              <option value="SIGHPC">SIGHPC(고성능 컴퓨팅)</option>
              <option value="SIGIR">SIGIR(정보 검색)</option>
              <option value="SIGITE">SIGITE(정보 기술 교육)</option>
              <option value="SIGKDD">SIGKDD(데이터 지식 발견)</option>
              <option value="SIGLOG">SIGLOG(논리 및 계산)</option>
              <option value="SIGMETRICS">SIGMETRICS(측정 및 평가)</option>
              <option value="SIGMICRO">SIGMICRO(마이크로아키텍처)</option>
              <option value="SIGMIS">SIGMM(경영 정보 시스템)</option>
              <option value="SIGMM">SIGMM(멀티미디어 시스템)</option>
              <option value="SIGMOBILE">SIGMOBILE(시스템, 사용자, 데이터 및 컴퓨터의 이동성)</option>
              <option value="SIGMOD">SIGMOD(데이터 관리)</option>
              <option value="SIGOPS">SIGOPS(운영 체제)</option>
              <option value="SIGPLAN">SIGPLAN(프로그래밍 언어)</option>
              <option value="SIGSAC">SIGSAC(보안, 감사 및 통제)</option>
              <option value="SIGSAM">SIGSAM(기호 및 대수 조작)</option>
              <option value="SIGSIM">SIGSIM(시뮬레이션)</option>
              <option value="SIGSOFT">SIGSOFT(소프트웨어 엔지니어링)</option>
              <option value="SIGSPATIAL">SIGSPATIA(공간정보)</option>
              <option value="SIGUCCS">SIGUCCS(대학 및 대학 컴퓨팅 서비스)</option>
              <option value="SIGWEB">SIGWEB(하이퍼텍스트, 하이퍼미디어 및 웹)</option>
            </select>
          </div>
            <div className="sub2-select-year">
              <span>교수 연차> </span>
              <select name="options">
                <option disabled selected hidden>교수연차선택(선택)</option>
                  <option value="1993">1993년도 이전부터(31년차 이상)</option>
                  <option value="2003">1994년도~2003년도(21~30년차)</option>
                  <option value="2013">2004년도~2013년도(11~20년차)</option>
                  <option value="2014"> 2014년도 이후부터(10년차이하)</option>
              </select>
              <div className='lab2-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab2-year-priority" />
            </div>
            </div>
            <div className="sub2-select-student">
              <span>교수 담당 학생수> </span>
              <select className="options">
                <option disabled selected hidden>연구실규모선택(선택)</option>
                  <option value="5">5명 이하</option>
                  <option value="10">6명~10명</option>
                  <option value="11">11명 이상</option>
              </select>
              <div className='lab2-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab2-student-priority" />
            </div>
            </div>
            <div className="sub2-select-labsize">
              <span>연구실 규모> </span>
              <select className="options">
                <option disabled selected hidden>연구실규모선택(선택)</option>
                  <option value="10">10명 이하</option>
                  <option value="20">11명~20명</option>
                  <option value="30">21명~30명</option>
                  <option value="31">31명 이상</option>
              </select>
              <div className='lab2-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab2-labsize-priority" />
            </div>
            </div>
          </div>
          <Link to='/gprecpage' className="select-button" onClick={handleRecommendation}>
          <span className="select-button-text">추천 결과 보기</span>
          </Link>
        </div>
      </div>
  );
}

export default Sub2gscndpage;
