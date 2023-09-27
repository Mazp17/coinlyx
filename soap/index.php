<?php
require __DIR__ . "/vendor/autoload.php";

$wallet = new \App\Controller\WalletService();

echo(json_encode($wallet->getUser("1000403329")));
