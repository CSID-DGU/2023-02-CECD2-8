<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


$serverName = "cs.cfdwai4lv47a.ap-northeast-2.rds.amazonaws.com";
$database = "cs";
$username = "admin";
$password = "zhao7825169";
$port = "3306";

$conn = new mysqli($serverName, $username, $password, $database,$port);

if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    

}
?>
