<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_host="127.0.0.1:3306";        //Change this
$db_user="root";        //Change this
$db_pass="1123";        //Change this
$db_name="bookstore";     //Do not change

$db_conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if (mysqli_connect_errno())
{
    echo 'Connection to database failed:'.mysqli_connect_error();
    exit();
}

$query="SELECT * FROM Books";

$result = $db_conn->query($query);

$response = array();
while ($row = $result->fetch_assoc()) $response[] = $row;   

$jsondata = json_encode($response);

echo $jsondata;

$result->free();


$db_conn->close();