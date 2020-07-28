<?php
ini_set('error_reporting','On');
error_reporting(E_ALL);

$json = file_get_contents("php://input");

$data = json_decode($json);
// print_r($data);

$to = 'ul@noknok.ru';
$subject = "Новый квиз";
$from = "From: info@noknok.ru";
$message = '';
foreach ($data as $key) {
    $message .= "<p><b>$key->question</b> $key->answer</p>";
}

$sendMail = mail($to,$subject, $message, $from);
echo $sendMail? 'Успешно':"Ошибка"; 
    