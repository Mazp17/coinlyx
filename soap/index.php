<?php
require __DIR__ . "/vendor/autoload.php";

$wallet = new \App\Controller\WalletService();
$user = new \App\Model\User("1011", "Miguel Zapata", "zpmaepp@gmail.com", "123123123");

$data = new stdClass();
$data->value  = 300.0;
$data->document = "1000403329";
$data->phone = "3046089301";
print_r($wallet->makePay($data));

