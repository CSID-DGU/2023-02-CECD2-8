import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import "./sub3gscndpage.css";

function Sub3gscndpage() {
  const navigate = useNavigate();
  // const [selectedMajor, setSelectedMajor] = useState('');
  // const [selectedLocation, setSelectedLocation] = useState('');
  // const [selectedField, setSelectedField] = useState('');
  const [selectedResearch, setSelectedResearch] = useState('');
  const [selectedStates, setSelectedStates] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedLabSize, setSelectedLabSize] = useState('');
  const [selectedGPA, setSelectedGPA] = useState('');
  const [selectedGRE, setSelectedGRE] = useState('');
  const [selectedTOEFL, setSelectedTOEFL] = useState('');
  const [selectedIELTS, setSelectedIELTS] = useState('');
  const [selectedPTE, setSelectedPTE] = useState('');
  const [selectedRankingPriority, setSelectedRankingPriority] = useState('');
  const [selectedCostPriority, setSelectedCostPriority] = useState('');
  const [selectedYearPriority, setSelectedYearPriority] = useState('');
  const [selectedStudentPriority, setSelectedStudentPriority] = useState('');
  const [selectedLabSizePriority, setSelectedLabSizePriority] = useState('');

  const handleRecommendation = () => {
    // if (selectedField === 'Graduateschool') {
    //   // Navigate to a.js
    //   navigate('/gsrecpage');
    // } else if (selectedField === 'professor') {
    //   // Navigate to b.js
    //   navigate('/gprecpage');
    // } else if (selectedField === 'gp') {
    //   // Navigate to b.js
    //   navigate('/grrecpage');
    // }
    navigate('/gsprecpage', { //다음페이지로 전달
      state: {
        research: `${selectedResearch}`,
        states: `${selectedStates}`,
        ranking: `${selectedRanking}`,
        cost: `${selectedCost}`,
        year: `${selectedYear}`,
        student: `${selectedStudent}`,
        labsize: `${selectedLabSize}`,
        gpa: `${selectedGPA}`,
        gre: `${selectedGRE}`,
        toefl: `${selectedTOEFL}`,
        ielts: `${selectedIELTS}`,
        pte: `${selectedPTE}`,
        rankingP: `${selectedRankingPriority}`,
        costP: `${selectedCostPriority}`,
        yearP: `${selectedYearPriority}`,
        studentP: `${selectedStudentPriority}`,
        labsizeP: `${selectedLabSizePriority}`,
      },
    });
  };
  useEffect(() => {
    console.log('Selected Research:', selectedResearch);
    console.log('Selected States:', selectedStates);
    console.log('Selected Ranking:', selectedRanking);
    console.log('Selected Cost:', selectedCost);
    console.log('Selected Year:', selectedYear);
    console.log('Selected Student:', selectedStudent);
    console.log('Selected LabSize:', selectedLabSize);
    console.log('Selected GPA:', selectedGPA);
    console.log('Selected GRE:', selectedGRE);
    console.log('Selected TOEFL:', selectedTOEFL);
    console.log('Selected IELTS:', selectedIELTS);
    console.log('Selected PTE:', selectedPTE);
    console.log('Selected RankingPriority:', selectedRankingPriority);
    console.log('Selected CostPriority:', selectedCostPriority);
    console.log('Selected YearPriority:', selectedYearPriority);
    console.log('Selected StudentPriority:', selectedStudentPriority);
    console.log('Selected LabSizePriority:', selectedLabSizePriority);
  }, [selectedResearch, selectedStates, selectedRanking, selectedCost, selectedYear, selectedStudent, selectedLabSize, selectedGPA, selectedGRE, selectedTOEFL, selectedIELTS, selectedPTE, selectedRankingPriority, selectedCostPriority, selectedYearPriority, selectedStudentPriority, selectedLabSizePriority]);

  return (
    <div className="sub3-gscndpage">
      <div className="sub3-gscnd-box">
        <Link to='/' className="sub3-gscnd-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="sub3-gscnd-logoimg" alt="logo" />
        </Link>
        <h1 className="sub3-gscnd-h1">선택사항</h1>
        <div className="sub3-gscnd-line"></div>

        <div className='sub3-select-form'>
          <div className="sub3-select-major">
            <span>연구하고 싶은 분야> </span>
            <select className="options" required onChange={(e) => setSelectedResearch(e.target.value)}>
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
          <div className="sub3-select-location">
            <span>위치> </span>
            <select className="options" onChange={(e) => setSelectedStates(e.target.value)}>
              <option disabled selected hidden>위치선택(선택)</option>
              <optgroup label="Western" >
                <option value="Arizona" >Arizona</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Montana">Montana</option>
                <option value="Nevada">Nevada</option>
                <option value="New Mexico">New Mexico</option>
                <option value="Oregon">Oregon</option>
                <option value="Utah">Utah</option>
                <option value="Washington">Washington</option>
                <option value="DC">Washington, DC</option>
                <option value="Wyoming">Wyoming</option>
              </optgroup>
              <optgroup label="Midwest">
                <option value="Minnesota">Minnesota</option>
                <option value="Missouri">Missouri</option>
                <option value="Nebraska">Nebraska</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Michigan">Michigan</option>
              </optgroup>
              <optgroup label="Northeast">
                <option value="Connecticut">Connecticut</option>
                <option value="Maine">Maine</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New York">New York</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="Vermont">Vermont</option>
                <option value="Maryland">Maryland</option>
                <option value="Delaware">Delaware</option>
              </optgroup>
              <optgroup label="Southern">
                <option value="Texas">Texas</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Arkansas">Arkansas</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Alabama">Alabama</option>
                <option value="Georgia">Georgia</option>
                <option value="Florida">Florida</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Kentucky">Kentucky</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Virginia">Virginia</option>
                <option value="North Carolina">North Carolina</option>
                <option value="South Carolina">South Carolina</option>
              </optgroup>
              <optgroup label="Etc">
                <option value="Puerto Rico">Puerto Rico</option>
              </optgroup>
            </select>
            
          </div>
          <div className="sub3-select-ranking">
            <span>순위> </span>
            <select className="options" onChange={(e) => setSelectedRanking(e.target.value)}>
              <option disabled selected hidden>순위선택(선택)</option>
                <option value="10">10위 이내</option>
                <option value="20">20위 이내</option>
                <option value="30">30위 이내</option>
                <option value="50">50위 이내</option>
                <option value="100">100위 이내</option>
            </select>
            <div className='lab3-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab3-ranking-priority" onChange={(e) => setSelectedRankingPriority(e.target.value)}/>
            </div>
          </div>
          <div className="sub3-select-expenses">
            <span>비용> </span>
            <select className="options" onChange={(e) => setSelectedCost(e.target.value)}>
              <option disabled selected hidden>비용선택(선택)</option>
                <option value="10000">30,000달러 이하</option>
                <option value="30000">30,000달러 ~ 50,000달러</option>
                <option value="50000">50,000달러 ~ 70,000달러</option>
                <option value="70000">70,000달러 ~ 90,000달러</option>
                <option value="90000">90,000달러 이상</option>
            </select>
            <div className='lab3-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab3-expenses-priority" onChange={(e) => setSelectedCostPriority(e.target.value)}/>
            </div>
          </div>
          <div className="sub3-select-year">
              <span>교수 연차> </span>
              <select name="options" onChange={(e) => setSelectedYear(e.target.value)}>
                <option disabled selected hidden>교수연차선택(선택)</option>
                  <option value="1984">1993년도 이전부터(31년차 이상)</option>
                  <option value="1994">1994년도~2003년도(21~30년차)</option>
                  <option value="2004">2004년도~2013년도(11~20년차)</option>
                  <option value="2014"> 2014년도 이후부터(10년차이하)</option>
              </select>
              <div className='lab3-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab3-year-priority" onChange={(e) => setSelectedYearPriority(e.target.value)}/>
            </div>
            </div>
          <div className="sub3-select-student">
              <span>교수 담당 학생수> </span>
              <select className="options" onChange={(e) => setSelectedStudent(e.target.value)}>
                <option disabled selected hidden>교수담당학생수선택(선택)</option>
                  <option value="1">5명 이하</option>
                  <option value="6">6명~10명</option>
                  <option value="11">11명 이상</option>
              </select>
              <div className='lab3-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab3-student-priority" onChange={(e) => setSelectedStudentPriority(e.target.value)}/>
            </div>
            </div>
            <div className="sub3-select-labsize">
              <span>연구실 규모> </span>
              <select className="options" onChange={(e) => setSelectedLabSize(e.target.value)}>
                <option disabled selected hidden>연구실규모선택(선택)</option>
                  <option value="1">10명 이하</option>
                  <option value="11">11명~20명</option>
                  <option value="21">21명~30명</option>
                  <option value="31">31명 이상</option>
              </select>
              <div className='lab3-Priority'>
              <span>우선순위> </span> 
              <input type="number" name="lab3-labsize-priority" onChange={(e) => setSelectedLabSizePriority(e.target.value)}/>
            </div>
            </div>
        </div>

        <div className="sub3-input-form1">
          <div className="sub3-input-gpa">
            <span>GPA> </span>
            <input type="number" name="gpa" placeholder="GPA 점수(선택)" className="sub1-gpa" step="0.01" onChange={(e) => setSelectedGPA(e.target.value)}/>
          </div>
        </div>

        <div className='sub3-select-form2'>
          <div className="sub3-select-gre">
            <span>GRE> </span>
            <select className="options" onChange={(e) => setSelectedGRE(e.target.value)}>
              <option disabled selected hidden>GRE선택(선택)</option>
                <option value="Required">제출필요</option>
                <option value="Not Required">제출불필요</option>
                <option value="Optional">제출선택</option>
            </select>
          </div>
        </div>

        <div className="sub3-input-form2">
          <div className="sub3-input-toefl">
            <span>TOEFL> </span>
            <input type="number" name="TOEFL" placeholder="TOEFL 점수(선택)" className="sub1-toefl" step="0.01" onChange={(e) => setSelectedTOEFL(e.target.value)}/>
          </div>
          <div className="sub3-input-ielts">
            <span>IELTS> </span>
            <input type="number" name="IELTS" placeholder="IELTS 점수(선택)" className="sub1-ielts" step="0.01" onChange={(e) => setSelectedIELTS(e.target.value)}/>
          </div>
          <div className="sub3-input-ielts">
            <span>PTEAcademic> </span>
            <input type="number" name="PTEAcademic" placeholder="PTEAcademic 점수(선택)" className="sub1-ptea" step="0.01" onChange={(e) => setSelectedPTE(e.target.value)}/>
          </div>
        </div>
        
        <Link to='/gsprecpage' className="select-button" onClick={(e) => {
          e.preventDefault(); 
          if (selectedResearch) {
            handleRecommendation();
          } else {
            // Optionally, you can provide feedback to the user that a year needs to be selected.
            console.log('필수 항목 선택해 주세요.');
          }
          
          }}>
          <span className="select-button-text">추천 결과 보기</span>
        </Link>
      </div>
    </div>
  );
}

export default Sub3gscndpage;
