<?php

require __DIR__ . "/vendor/autoload.php";

$wallet = new \App\Controller\WalletService();

$data = new stdClass();
$data->document = "10004033291";
$data->sessionKey = "htapivghr52joidvsi2561n4d7";
$data->otp = "348897";
print_r($wallet->confirmPay($data));
