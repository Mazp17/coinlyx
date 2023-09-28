<?php

namespace App\CRUD;

use App\DB\DbConnect;

class WalletCrud
{
    private DbConnect $db;

    public function __construct()
    {
        $this->db = new DbConnect();
    }


    public function save()
    {

    }

    /**
     * Metodo para cargar la billetera
     * @param $userId
     * @param $value
     * @throws \SoapFault
     */
    public function load($userId, $value)
    {
        $old = $this->searchByUserId($userId);
        $oldValue = (float) $old["balance"];

        $value = $oldValue + $value;

        $query = "update balance set balance = ? where userId = ?";
        $this->db->insertQuery($query, [$value, $userId]);

        return $this->searchByUserId($userId)["balance"];

    }

    /**
     * @param $userId
     * @param $value
     * @return mixed
     * @throws \SoapFault
     */
    public function update($userId, $value)
    {
        $query = "UPDATE balance set balance = ? where userId = ?";
        $this->db->insertQuery($query, [$value, $userId]);
        return $this->searchByUserId($userId);
    }

    public function searchByUserId($userId)
    {
        $query = "SELECT * FROM balance WHERE userid = $userId";
        return $this->db->executeQuery($query)->fetch();
    }
}
