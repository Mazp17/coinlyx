<?php
require __DIR__ . "/vendor/autoload.php";
require __DIR__ . "/lib/nusoap/nusoap.php";

use App\controller\WalletService;

ini_set("soap.wsdl_cache_enabled", "0");
$server = new SOAPServer("simple.wsdl");
$server->setClass(WalletService::class);


$server->handle();
