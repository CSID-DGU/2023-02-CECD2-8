import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './gsprecpage.css';

function Gsprecpage() {
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
  const [selectedStates, setSelectedStates] = useState(
    location.state?.states
  );
  const [selectedRanking, setSelectedRanking] = useState(
    location.state?.ranking
  );
  const [selectedCost, setselectedCost] = useState(
    location.state?.cost
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
  const [selectedGPA, setselectedGPA] = useState(
    location.state?.gpa
  );
  const [selectedGRE, setselectedGRE] = useState(
    location.state?.gre
  );
  const [selectedTOEFL, setselectedTOEFL] = useState(
    location.state?.toefl
  );
  const [selectedIELTS, setselectedIELTS] = useState(
    location.state?.ielts
  );
  const [selectedPTE, setselectedPTE] = useState(
    location.state?.pte
  );
  const [selectedRankingPriority, setSelectedRankingPriority] = useState(
    location.state?.rankingP
  );
  const [selectedCostPriority, setSelectedCostPriority] = useState(
    location.state?.costP
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

  const fetchDataFromDatabase = (dataToQuery) => {
    // 使用 dataToQuery 作为查询参数进行 GET 请求
    fetch(`http://3.38.161.125/univandprofrecommend5.php?query=${dataToQuery}`) //php 파일 작성
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

  // 학교 결과페이지로 이동
  const toPage1 = (professor) => {
    navigate('/srgsrecpage', { state: { resultData: professor.UniversityName } });
  };
  // 교수 결과페이지로 이동
  const toPage2 = (professor) => {
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
      return (  //data null, 사용자가 입력안했을 경우 처리
        //(professor.Category === selectedResearch) &&
        (professor.Category.includes(selectedResearch)) &&
        (selectedStates === "" || professor.State === selectedStates) &&
        (selectedGPA === "" || professor.GPA === null || Number(professor.GPA) <= selectedGPA) &&
        (selectedGRE === "" || professor.GRE === selectedGRE) &&
        (selectedTOEFL === "" || professor.TOEFL === null || Number(professor.TOEFL) <= selectedTOEFL) &&
        (selectedIELTS === "" || professor.IELTS === null || Number(professor.IELTS) <= selectedIELTS) &&
        (selectedPTE === "" || professor.PTEAcademic === null || Number(professor.PTEAcademic) <= selectedPTE)
      );
    });
    //return searchResults;
  };
  const filterProfessors = filterProfessor();

  //점수 계산
  const selectedAttributes = [selectedResearch, selectedRanking, selectedCost, selectedYear, selectedStudent, selectedLabSize];
  const selectedPriorities = [selectedRankingPriority, selectedCostPriority, selectedYearPriority, selectedStudentPriority, selectedLabSizePriority];
  const calculateScore = (professor) => {
    let score = 0;
    const selectedAttributesCount = selectedAttributes.filter(attr => attr).length;
    const selectedPrioritiesCount = selectedPriorities.filter(priority => priority).length;
    if (selectedAttributesCount === 1 && !selectedPrioritiesCount) {  //필수 속성만
      console.log("calculateDefaultAttributes");
      score = calculateDefaultAttributes(professor);
    } else if (selectedAttributesCount === 2 && !selectedPrioritiesCount) { //속성 2개
      console.log("calculate2Attribute");
      score = calculate2Attribute(professor);
    } else if (selectedAttributesCount === 3 && !selectedPrioritiesCount) {  //속성 3개(우선순위 x)
      console.log("calculate3AttributeNP");
      score = calculate3AttributeNP(professor);
    } else if (selectedAttributesCount === 4 && !selectedPrioritiesCount) {  //속성 4개(우선순위 x)
      console.log("calculate4AttributeNP");
      score = calculate4AttributeNP(professor);
    } else if (selectedAttributesCount === 5 && !selectedPrioritiesCount) {  //속성 5개(우선순위 x)
      console.log("calculate5AttributeNP");
      score = calculate5AttributeNP(professor);
    } else if (selectedAttributesCount === 6 && !selectedPrioritiesCount) {  //모든 속성(우선순위 x)
      console.log("calculateAllAttributesNP");
      score = calculateAllAttributesNP(professor);
    } else if (selectedAttributesCount === 3 && selectedPrioritiesCount === 2) {  //속성 3개(우선순위 o)
      console.log("calculate3AttributeYP");
      score = calculate3AttributeYP(professor);
    } else if (selectedAttributesCount === 4 && selectedPrioritiesCount === 3) {  //속성 4개(우선순위 o)
      console.log("calculate4AttributeYP");
      score = calculate4AttributeYP(professor);
    } else if (selectedAttributesCount === 5 && selectedPrioritiesCount === 4) {  //속성 5개(우선순위 o)
      console.log("calculate5AttributeYP");
      score = calculate5AttributeYP(professor);
    } else if (selectedAttributesCount === 6 && selectedPrioritiesCount === 5) {  //모든 속성(우선순위 o)
      console.log("calculateAllAttributesYP");
      score = calculateAllAttributesYP(professor);
    } else {
      score = 0;
    }
    return score;
  };

  //1)모든 속성 선택 (우선순위 x)
  const calculateAllAttributesNP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.1 * livingscore);
    console.log('score1:', score);
    score += (0.2 * rankingscore);
    console.log('score2:', score);
    score += (0.2 * costscore);
    console.log('score3:', score);
    score += (0.2 * hindex);
    console.log('score4:', score);
    score += (0.1 * yearscore);
    console.log('score5:', score);
    score += (0.1 * studentscore);
    console.log('score6:', score);
    score += (0.1 * labsizescore);
    console.log('score7:', score);
    return score;
  };
  //2)필수 속성(분야)만 선택
  const calculateDefaultAttributes = (professor) => {
    let score = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let rankingscore = 0;
    rankingscore = (203 - Number(professor.Ranking)) / 202 * 100
    
    score += (0.4 * hindex);
    score += (0.3 * livingscore);
    score += (0.3 * rankingscore);
    return score;
  };
  //3)속성 2개 선택
  const calculate2Attribute = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.3 * hindex);
    score += (0.3 * livingscore);
    if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.4 * rankingscore);
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.4 * costscore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.4 * yearscore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.4 * studentscore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.4 * labsizescore);
    } else {
      score = 0;
    } 
    return score;
  };
  //4)속성 3개 선택 (우선순위 x)
  const calculate3AttributeNP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.3 * hindex);
    score += (0.3 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && !selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * costscore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * yearscore);
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * studentscore);
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * yearscore);
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * studentscore);
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * yearscore); score += (0.2 * studentscore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * yearscore); score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      score += (0.2 * studentscore);  score += (0.2 * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //5)속성 4개 선택 (우선순위 x)
  const calculate4AttributeNP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.2 * hindex);
    score += (0.2 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * costscore); score += (0.2 * yearscore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * costscore); score += (0.2 * studentscore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * costscore); score += (0.2 * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * yearscore); score += (0.2 * studentscore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * yearscore); score += (0.2 * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      score += (0.2 * rankingscore);  score += (0.2 * studentscore);  score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * yearscore); score += (0.2 * studentscore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * yearscore); score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      score += (0.2 * costscore); score += (0.2 * studentscore);  score += (0.2 * labsizescore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      score += (0.2 * yearscore); score += (0.2 * studentscore);  score += (0.2 * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //6)속성 5개 선택 (우선순위 x)
  const calculate5AttributeNP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.2 * hindex);
    score += (0.2 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      score += (0.15 * rankingscore); score += (0.15 * costscore);  score += (0.15 * yearscore);  score += (0.15 * studentscore);
    } else if (selectedResearch && selectedRanking && selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      score += (0.15 * rankingscore); score += (0.15 * costscore);  score += (0.15 * yearscore);  score += (0.15 * labsizescore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      score += (0.15 * rankingscore); score += (0.15 * costscore);  score += (0.15 * studentscore); score += (0.15 * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      score += (0.15 * rankingscore); score += (0.15 * yearscore);  score += (0.15 * studentscore); score += (0.15 * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      score += (0.15 * costscore);  score += (0.15 * yearscore);  score += (0.15 * studentscore); score += (0.15 * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //가중치 설정 함수
  const calculateWeight5 = (priority, defaultWeight) => {
    switch (priority) {
      case 1: return defaultWeight + 0.1;
      case 2: return defaultWeight + 0.08;
      case 3: return defaultWeight + 0.06;
      case 4: return defaultWeight + 0.04;
      case 5: return defaultWeight + 0.02;
      default:  return defaultWeight;}
  };
  const calculateWeight4 = (priority, defaultWeight) => {
    switch (priority) {
      case 1: return defaultWeight + 0.14;
      case 2: return defaultWeight + 0.12;
      case 3: return defaultWeight + 0.08;
      case 4: return defaultWeight + 0.06;
      default:  return defaultWeight;}
  };
  const calculateWeight3 = (priority, defaultWeight) => {
    switch (priority) {
      case 1: return defaultWeight + 0.11;
      case 2: return defaultWeight + 0.09;
      case 3: return defaultWeight + 0.05;
      default:  return defaultWeight;}
  };
  //7)모든 속성 선택 (우선순위 o)
  const calculateAllAttributesYP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}
    
    const rankingWeight = calculateWeight5(Number(selectedRankingPriority), 0.1);
    const costWeight = calculateWeight5(Number(selectedCostPriority), 0.1);
    const yearWeight = calculateWeight5(Number(selectedYearPriority), 0.1);
    const studentWeight = calculateWeight5(Number(selectedStudentPriority), 0.1);
    const labsizeWeight = calculateWeight5(Number(selectedLabSizePriority), 0.1);
    console.log(rankingWeight, costWeight, yearWeight, studentWeight, labsizeWeight);
    score += (0.1 * hindex);
    score += (0.1 * livingscore);
    score += (rankingWeight * rankingscore);
    score += (costWeight * costscore);
    score += (yearWeight * yearscore);
    score += (studentWeight * studentscore);
    score += (labsizeWeight * labsizescore);
    return score;
  };
  //8)속성 3개 선택 (우선순위 o)
  const calculate3AttributeYP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.15 * hindex);
    score += (0.15 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && !selectedYear && !selectedStudent && !selectedLabSize) {
      if (selectedRankingPriority < selectedCostPriority) {score += (0.4 * rankingscore); score += (0.3 * costscore);}
      else {score += (0.3 * rankingscore);  score += (0.4 * costscore);}
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      if (selectedRankingPriority < selectedYearPriority) {score += (0.4 * rankingscore); score += (0.3 * yearscore);}
      else {score += (0.3 * rankingscore);  score += (0.4 * yearscore);}
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      if (selectedRankingPriority < selectedStudentPriority) {score += (0.4 * rankingscore);  score += (0.3 * studentscore);}
      else {score += (0.3 * rankingscore);  score += (0.4 * studentscore);}
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      if (selectedRankingPriority < selectedLabSizePriority) {score += (0.4 * rankingscore);  score += (0.3 * labsizescore);}
      else {score += (0.3 * rankingscore);  score += (0.4 * labsizescore);}
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      if (selectedCostPriority < selectedYearPriority) {score += (0.4 * costscore); score += (0.3 * yearscore);}
      else {score += (0.3 * costscore); score += (0.4 * yearscore);}
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      if (selectedCostPriority < selectedStudentPriority) {score += (0.4 * costscore);  score += (0.3 * studentscore);}
      else {score += (0.3 * costscore); score += (0.4 * studentscore);}
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {      
      if (selectedCostPriority < selectedLabSizePriority) {score += (0.4 * costscore);  score += (0.3 * labsizescore);}
      else {score += (0.3 * costscore); score += (0.4 * labsizescore);}
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      if (selectedYearPriority < selectedStudentPriority) {score += (0.4 * yearscore);  score += (0.3 * studentscore);}
      else {score += (0.3 * yearscore); score += (0.4 * studentscore);}
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      if (selectedYearPriority < selectedLabSizePriority) {score += (0.4 * yearscore);  score += (0.3 * labsizescore);}
      else {score += (0.3 * yearscore); score += (0.4 * labsizescore);}
    } else if (selectedResearch && !selectedRanking && !selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      if (selectedStudentPriority < selectedLabSizePriority) {score += (0.4 * studentscore);  score += (0.3 * labsizescore);}
      else {score += (0.3 * studentscore);  score += (0.4 * labsizescore);}
    } else {
      score = 0;
    }
    return score;
  };
  //9)속성 4개 선택 (우선순위 o)
  const calculate4AttributeYP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.15 * hindex);
    score += (0.15 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && selectedYear && !selectedStudent && !selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && selectedStudent && !selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (studentWeight * studentscore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && !selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (yearWeight * yearscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight3(Number(selectedRankingPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (rankingWeight * rankingscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      const costWeight = calculateWeight3(Number(selectedCostPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (costWeight * costscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && !selectedRanking && !selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      const yearWeight = calculateWeight3(Number(selectedYearPriority), 0.15);
      const studentWeight = calculateWeight3(Number(selectedStudentPriority), 0.15);
      const labsizeWeight = calculateWeight3(Number(selectedLabSizePriority), 0.15);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
    } else {
      score = 0;
    }
    return score;
  };
  //10)속성 5개 선택 (우선순위 o)
  const calculate5AttributeYP = (professor) => {
    let score = 0;  let rankingscore = 0; let costscore = 0;
    let yearscore = 0;  let studentscore = 0; let labsizescore = 0;
    let hindex = 0;
    hindex = Number(professor.revisedHindex);
    let livingscore = 0;
    switch (professor.LivingEnvironment) {
      case "A+":  livingscore = 100;  break;
      case "A":   livingscore = 95;   break;
      case "A-":  livingscore = 90;   break;
      case "B+":  livingscore = 85;   break;
      case "B":   livingscore = 80;   break;
      case "B-":  livingscore = 75;   break;
      case "C+":  livingscore = 70;   break;
      case "C":   livingscore = 65;   break;
      case "C-":  livingscore = 60;   break;
      default:  livingscore = 0;}
    let cost = 0; const averageExpensesOn = 46616;  const averageExpensesOff = 47924;
    const actualExpensesOn = professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : 
                            professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : averageExpensesOn;
    const actualExpensesOff = professor.ExpensesOff !== null ? Number(professor.ExpensesOff) : 
                             professor.ExpensesOn !== null ? Number(professor.ExpensesOn) : averageExpensesOff;
    cost = Number(professor.Tuition) + ((actualExpensesOn + actualExpensesOff) / 2); console.log(cost);
    if (Number(professor.Ranking) <= selectedRanking) {rankingscore = 100;}
    else  {rankingscore = 80;}
    if (selectedCost <=  cost && cost < selectedCost + 20000) {costscore = 100;}
    else  {costscore = 80;}
    if (selectedYear <=  Number(professor.AcademicYear) && Number(professor.AcademicYear) < selectedYear + 10)  {yearscore = 100;}
    else  {yearscore = 80;}
    if (selectedStudent <= Number(professor.Students) && Number(professor.Students) < selectedStudent + 5)  {studentscore = 100;}
    else  {studentscore = 80;}
    if (selectedLabSize <= Number(professor.LabSize) && Number(professor.LabSize) < selectedLabSize + 10) {labsizescore = 100;}
    else  {labsizescore = 80;}

    score += (0.1 * hindex);
    score += (0.1 * livingscore);
    if (selectedResearch && selectedRanking && selectedCost && selectedYear && selectedStudent && !selectedLabSize) {
      const rankingWeight = calculateWeight4(Number(selectedRankingPriority), 0.1);
      const costWeight = calculateWeight4(Number(selectedCostPriority), 0.1);
      const yearWeight = calculateWeight4(Number(selectedYearPriority), 0.1);
      const studentWeight = calculateWeight4(Number(selectedStudentPriority), 0.1);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
    } else if (selectedResearch && selectedRanking && selectedCost && selectedYear && !selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight4(Number(selectedRankingPriority), 0.1);
      const costWeight = calculateWeight4(Number(selectedCostPriority), 0.1);
      const yearWeight = calculateWeight4(Number(selectedYearPriority), 0.1);
      const labsizeWeight = calculateWeight4(Number(selectedLabSizePriority), 0.1);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && selectedRanking && selectedCost && !selectedYear && selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight4(Number(selectedRankingPriority), 0.1);
      const costWeight = calculateWeight4(Number(selectedCostPriority), 0.1);
      const studentWeight = calculateWeight4(Number(selectedStudentPriority), 0.1);
      const labsizeWeight = calculateWeight4(Number(selectedLabSizePriority), 0.1);
      score += (rankingWeight * rankingscore);
      score += (costWeight * costscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && selectedRanking && !selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      const rankingWeight = calculateWeight4(Number(selectedRankingPriority), 0.1);
      const yearWeight = calculateWeight4(Number(selectedYearPriority), 0.1);
      const studentWeight = calculateWeight4(Number(selectedStudentPriority), 0.1);
      const labsizeWeight = calculateWeight4(Number(selectedLabSizePriority), 0.1);
      score += (rankingWeight * rankingscore);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
    } else if (selectedResearch && !selectedRanking && selectedCost && selectedYear && selectedStudent && selectedLabSize) {
      const costWeight = calculateWeight4(Number(selectedCostPriority), 0.1);
      const yearWeight = calculateWeight4(Number(selectedYearPriority), 0.1);
      const studentWeight = calculateWeight4(Number(selectedStudentPriority), 0.1);
      const labsizeWeight = calculateWeight4(Number(selectedLabSizePriority), 0.1);
      score += (costWeight * costscore);
      score += (yearWeight * yearscore);
      score += (studentWeight * studentscore);
      score += (labsizeWeight * labsizescore);
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
    <div className="gsprecpage">
      <div className="gsp-header">
        <Link to='/' className="gsp-logo" style={{ textDecoration: "none" }} onClick={() => navigate('/mainpage')}>
          <img src={logo} className="gsp-logoimg" alt="logo" />
        </Link>

        <div className='gsp-title'>
            <span className='gsp-title-text'> 대학원 및 교수 추천 </span>
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
      
      <div className="gsp-line"></div>

      <div className="gsp-contents">
        {rankedProfessors.map((professor, index) => (
          <div key={index}>
            <p><button onClick={() => toPage2(professor)}>{index + 1}. {professor.ProfessorName} </button> | <button onClick={() => toPage1(professor)}> {professor.UniversityName}</button></p>
            <span>- 연구분야: {professor.ResearchArea} </span>
          </div>
        ))}
        {/* <div className='gsp-content1'>
          <span>1. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content2'>
          <span>2. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content3'>
          <span>3. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content4'>
          <span>4. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div>
        <div className='gsp-content5'>
          <span>5. 대학명</span>
          <span>- 1. 교수명</span>
          <span>- 2. 교수명</span>
        </div> */}
      </div>


    </div>
  );
}

export default Gsprecpage;
