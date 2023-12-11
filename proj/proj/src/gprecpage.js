import logo from './logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './gprecpage.css';
import React, { useEffect, useState } from 'react';

function Gprecpage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userID, setuserID] = useState('');
  // const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const location = useLocation();
  //const resultData = location.state.resultData;
  //전달받은 데이터
  const [selectedResearch, setSelectedResearch] = useState(
    location.state?.research
  );
  const [selectedYear, setselectedYear] = useState(
    location.state?.year
  );
  const [selectedStudent, setSelectedStudent] = useState(
    location.state?.student
  );
  const [selectedLabSize, setSelectedLabSize] = useState(
    location.state?.labsize
  );
  const [selectedYearPriority, setSelectedYearPriority] = useState(
    location.state?.yearP
  );
  const [selectedStudentPriority, setSelectedStudentPriority] = useState(
    location.state?.studentP
  );
  const [selectedLabSizePriority, setSelectedLabSizePriority] = useState(
    location.state?.labsizeP
  );
  useEffect(() => {
    console.log('Selected Research:', selectedResearch);
    console.log('Selected Year:', selectedYear);
    console.log('Selected Student:', selectedStudent);
    console.log('Selected LabSize:', selectedLabSize);
    console.log('Selected YearPriority:', selectedYearPriority);
    console.log('Selected StudentPriority:', selectedStudentPriority);
    console.log('Selected LabSizePriority:', selectedLabSizePriority);
  }, [selectedResearch, selectedYear, selectedStudent, selectedLabSize, selectedYearPriority, selectedStudentPriority, selectedLabSizePriority]);

  const fetchDataFromDatabase = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://3.38.161.125/professorrecommend1.php?query=${dataToQuery}`) //php 파일 작성
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // 更新查询结果的状态
      })
      .catch((error) => {
        console.error("查询数据库时出错：", error);
      });
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(loggedIn);
    setuserID(userID);
    fetchDataFromDatabase();
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


  // 교수 결과페이지로 이동
  const toPage = (professor) => {
    navigate('/srprofpage', { state: { resultData: professor.ProfessorName } });
  };

  //h-index 보정
  const calculateHindex = () => {
    const revisedProfessors = searchResults.map(professor => {
        const hindexGS = Number(professor.HindexGS);
        const hindexScopus = Number(professor.HindexScopus);
        let revisedHindex;
        if (hindexGS <= hindexScopus * 1.426) {
          revisedHindex = (hindexGS + hindexScopus) / 2;
        } else if (hindexScopus * 1.426 < hindexGS && hindexGS <= hindexScopus * 1.67) {
          revisedHindex = hindexScopus * 1.213;
        } else if (hindexScopus * 1.67 < hindexGS) {
          revisedHindex = (hindexScopus + (hindexGS * 0.854)) / 2;
        } else {
          revisedHindex = hindexGS;
        }
        return {
            ...professor,
            revisedHindex: revisedHindex
        };
    });
    return revisedProfessors;
  };
  const calculateHindexProfessors = calculateHindex();

  //h-index 정규화
  const hindexNomalize = () => {
    const normalize = (value, min, max) => {
        return (value - min) / (max - min) * 100;
    };
    let maxHindex = -Infinity;
    let minHindex = Infinity;
    calculateHindexProfessors.forEach(professor => {
        const hindex = Number(professor.revisedHindex);
        maxHindex = Math.max(maxHindex, hindex);
        minHindex = Math.min(minHindex, hindex);
    });
    //console.log(maxHindex, minHindex);
    // 정규화된 hindex 값을 갖는 새로운 배열 생성
    const normalizedProfessors = calculateHindexProfessors.map(professor => {
        const normalizedHindex = normalize(Number(professor.revisedHindex), minHindex, maxHindex);
        // 원래의 속성과 정규화된 hindex 값을 갖는 새로운 객체 반환
        return {
            ...professor,
            revisedHindex: normalizedHindex
        };
    });
    return normalizedProfessors;
  };
  const hindexnProfessors = hindexNomalize();

  //필터링
  const filterProfessor = () => {
    return hindexnProfessors.filter(professor => {
      return (
        //(professor.Category === selectedResearch) //&&
        (professor.Category.includes(selectedResearch)) //&&
      );
    });
    //return searchResults;
  };
  const filterProfessors = filterProfessor();

  //점수계산
  const calculateScore = (professor) => {
    let score = 0;
    if (selectedResearch && selectedYear && selectedStudent && selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculateAllAttributesNP");
      score = calculateAllAttributesNP(professor);
    } else if (selectedResearch && !selectedYear && !selectedStudent && !selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculateDefaultAttributes");
      score = calculateDefaultAttributes(professor);
    } else if (selectedResearch && selectedYear && !selectedStudent && !selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate2AttributeNP1");
      score = calculate2AttributeNP(professor);
    } else if (selectedResearch && !selectedYear && selectedStudent && !selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate2AttributeNP2");
      score = calculate2AttributeNP(professor);
    } else if (selectedResearch && !selectedYear && !selectedStudent && selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate2AttributeNP3");
      score = calculate2AttributeNP(professor);
    } else if (selectedResearch && selectedYear && selectedStudent && !selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate3AttributeNP1");
      score = calculate3AttributeNP(professor);
    } else if (selectedResearch && selectedYear && !selectedStudent && selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate3AttributeNP2");
      score = calculate3AttributeNP(professor);
    } else if (selectedResearch && !selectedYear && selectedStudent && selectedLabSize && !selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate3AttributeNP3");
      score = calculate3AttributeNP(professor);
    } else if (selectedResearch && selectedYear && selectedStudent && selectedLabSize && selectedYearPriority && selectedStudentPriority && selectedLabSizePriority) {
      console.log("calculateAllAttributesYP");
      score = calculateAllAttributesYP(professor);
    } else if (selectedResearch && selectedYear && !selectedStudent && !selectedLabSize && selectedYearPriority && !selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate2AttributeYP1");
      score = calculate2AttributeYP(professor);
    } else if (selectedResearch && !selectedYear && selectedStudent && !selectedLabSize && !selectedYearPriority && selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate2AttributeYP2");
      score = calculate2AttributeYP(professor);
    } else if (selectedResearch && !selectedYear && !selectedStudent && selectedLabSize && !selectedYearPriority && !selectedStudentPriority && selectedLabSizePriority) {
      console.log("calculate2AttributeYP3");
      score = calculate2AttributeYP(professor);
    } else if (selectedResearch && selectedYear && selectedStudent && !selectedLabSize && selectedYearPriority && selectedStudentPriority && !selectedLabSizePriority) {
      console.log("calculate3AttributeYP1");
      score = calculate3AttributeYP(professor);
    } else if (selectedResearch && selectedYear && !selectedStudent && selectedLabSize && selectedYearPriority && !selectedStudentPriority && selectedLabSizePriority) {
      console.log("calculate3AttributeYP2");
      score = calculate3AttributeYP(professor);
    } else if (selectedResearch && !selectedYear && selectedStudent && selectedLabSize && !selectedYearPriority && selectedStudentPriority && selectedLabSizePriority) {
      console.log("calculate3AttributeYP3");
      score = calculate3AttributeYP(professor);
    } else {
      score = 0;
    }
    return score;
  };

  //1)모든 속성 선택 (우선순위 x)
  const calculateAllAttributesNP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}
    
    score += (0.4 * hindex);
    //console.log('score1:', score);
    score += (0.2 * yearscore);
    //console.log('score2:', score);
    score += (0.2 * studentscore);
    //console.log('score3:', score);
    score += (0.2 * labsizescore);
    //console.log('score4:', score);
    return score;
  };
  //2)필수 속성(분야)만 선택
  const calculateDefaultAttributes = (professor) => {
    let score = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    score += hindex;
    return score;
  };
  //3)속성 2개 선택 (우선순위 x)
  const calculate2AttributeNP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.5 * hindex);
    if (selectedResearch && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.5 * yearscore);
    } else if (selectedResearch && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.5 * studentscore);
    } else if (selectedResearch && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.5 * labsizescore);
    } else {
      score = 0;
    } 
    return score;
  };
  //4)속성 3개 선택 (우선순위 x)
  const calculate3AttributeNP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.5 * hindex);
    if (selectedResearch && selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.25 * yearscore);  score += (0.25 * studentscore);
    } else if (selectedResearch && selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.25 * yearscore);  score += (0.25 * labsizescore);
    } else if (selectedResearch && !selectedYear && selectedStudent && selectedLabSize) {
      score += (0.25 * studentscore); score += (0.25 * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //5)모든 속성 선택 (우선순위 o)
  const calculateAllAttributesYP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    const priorityKey = `${selectedYearPriority}-${selectedStudentPriority}-${selectedLabSizePriority}`;
    if (priorityKey === '1-2-3') {
        score += (0.4 * hindex);  score += (0.3 * yearscore); score += (0.2 * studentscore);  score += (0.1 * labsizescore);
        console.log('1-2-3');
    } else if (priorityKey === '1-3-2') {
        score += (0.4 * hindex);  score += (0.3 * yearscore); score += (0.1 * studentscore);  score += (0.2 * labsizescore);
        console.log('1-3-2');
    } else if (priorityKey === '2-1-3') {
        score += (0.4 * hindex);  score += (0.2 * yearscore); score += (0.3 * studentscore);  score += (0.1 * labsizescore);
        console.log('2-1-3');
    } else if (priorityKey === '2-3-1') {
        score += (0.4 * hindex);  score += (0.2 * yearscore); score += (0.1 * studentscore);  score += (0.3 * labsizescore);
        console.log('2-3-1');
    } else if (priorityKey === '3-1-2') {
        score += (0.4 * hindex);  score += (0.1 * yearscore); score += (0.3 * studentscore);  score += (0.2 * labsizescore);
        console.log('3-1-2');
    } else if (priorityKey === '3-2-1') {
        score += (0.4 * hindex);  score += (0.1 * yearscore); score += (0.2 * studentscore);  score += (0.3 * labsizescore);
        console.log('3-2-1');
    } else {
        score = 0;
    }
    return score;
  };
  //6)속성 2개 선택 (우선순위 o)
  const calculate2AttributeYP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.4 * hindex);
    if (selectedResearch && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.6 * yearscore);
    } else if (selectedResearch && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.6 * studentscore);
    } else if (selectedResearch && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.6 * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //7)속성 3개 선택 (우선순위 o)
  const calculate3AttributeYP = (professor) => {
    let score = 0;  let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.4 * hindex);
    if (selectedResearch && selectedYear && selectedStudent && !selectedLabSize) {
      if (selectedYearPriority < selectedStudentPriority) {
        score += 0.35 * yearscore;  score += 0.25 * studentscore;
      } else {
        score += 0.25 * yearscore;  score += 0.35 * studentscore;
      }
    } else if (selectedResearch && selectedYear && !selectedStudent && selectedLabSize) {
      if (selectedYearPriority < selectedLabSizePriority) {
        score += (0.35 * yearscore);  score += (0.25 * labsizescore);
      } else {
        score += (0.25 * yearscore);  score += (0.35 * labsizescore);
      }
    } else if (selectedResearch && !selectedYear && selectedStudent && selectedLabSize) {
      if (selectedStudentPriority < selectedLabSizePriority) {
        score += (0.35 * studentscore); score += (0.25 * labsizescore);
      } else {
        score += (0.25 * studentscore); score += (0.35 * labsizescore);
      }
    } else {
      score = 0;
    }
    return score;
  };

  const calculateProfessor = () => {
    return filterProfessors.map((professor) => {
      const score = calculateScore(professor);
      return { ...professor, score }; // 교수 객체에 점수 추가
    });
  };
  const rankedProfessors = calculateProfessor().sort((a, b) => b.score - a.score);

  return (
    <div className="gprecpage">
      <div className="gpr-header">
        <Link to='/' className="gpr-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gpr-logoimg" alt="logo" />
        </Link>

        <div className='gpr-title'>
            <span className='gpr-title-text'> 교수 추천 </span>
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
                <button className="dropdown-button">저장한 게시물</button>
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
      
      <div className="gpr-line"></div>

      <div className="gpr-contents">
        {rankedProfessors.map((professor, index) => (
          <div key={index}>
            <p><button onClick={() => toPage(professor)}>{index + 1}. {professor.ProfessorName} </button> </p>
              <span>- 대학명: {professor.UniversityName} | 직급: {professor.Title} | <a href={professor.SiteLink}>{professor.SiteLink}</a> </span>
          </div>
        ))}
        
      </div>

    </div>
  );
}

export default Gprecpage;
