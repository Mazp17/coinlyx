<?php

namespace App\DB;

class DbConnect
{
    private $server;
    private $userdb;
    private $psw;
    private $db;
    private $conexion;

    public function __construct()
    {
        $this->server = "localhost:3306";
        $this->userdb = "root";
        $this->psw = "";
        $this->db = "coinlyx";
    }

    private function connectDb()
    {
        $dsn = "mysql:host=$this->server;dbname=$this->db";

        try {
            $this->conexion =  new \PDO($dsn, $this->userdb, $this->psw);
        } catch (\Exception $e) {
            error_log($e->getMessage());
            exit("Something bad happened");
        }
    }

    public function executeQuery($query)
    {
        $this->connectDb();
        return $this->conexion->query($query);
    }

    /**
     * @throws \SoapFault
     */
    public function insertQuery($query, array $data)
    {
        $this->connectDb();
        try {
            $exec =  $this->conexion->prepare($query);
            $this->conexion->beginTransaction();
            $exec->execute($data);
            $id = $this->conexion->lastInsertId();
            $this->conexion->commit();
            return $id;
        } catch (\PDOException $e) {
            $this->conexion->rollback();
            if($e->getCode() == 23000) {
                throw new \SoapFault("400", "Ese numero de identificación ya existe");
            }
            throw new \SoapFault("500", $e->getMessage());
        }
    }
}
