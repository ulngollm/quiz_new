<?php
ini_set('error_reporting','On');
error_reporting(E_ALL);

$json = file_get_contents("php://input");
$json = strip_tags($json);
$data = json_decode($json);

// print_r($data);

$to = 'ul@noknok.ru';
$subject = "Новый квиз";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= "From: info@noknok.ru\r\n";
$message = '';
foreach ($data as $key) {
    $message .= "<p><b>$key->question</b> $key->answer</p>";
}

$sendMail = mail($to,$subject, $message, $headers);
echo $sendMail? 'OK':"Error"; 
    