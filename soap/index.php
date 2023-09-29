<?php
require __DIR__ . "/vendor/autoload.php";

$wallet = new \App\Controller\WalletService();
$user = new \App\Model\User("1011", "Miguel Zapata", "zpmaepp@gmail.com", "123123123");

$data = new stdClass();
print_r($wallet->getUser("asdas"));

