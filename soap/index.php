<?php
require __DIR__ . "/vendor/autoload.php";

try {
    $client = new SoapClient("simple.wsdl");

    $response = array();
    $response['helloResponse'] = $client->saludar();

    print "<pre>";
    print_r($response);
    print "</pre>";
} catch (SoapFault $e) {
    var_dump($e);
}