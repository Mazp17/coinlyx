<?php

namespace App\CRUD;

use App\DB\DbConnect;

class SessionCRUD
{
    private DbConnect $db;

    public function __construct()
    {
        $this->db = new DbConnect();
    }

    /**
     * Metodo para guardar la session
     * @param $sessionId
     * @param $otp
     * @param $userId
     * @param $value
     * @return mixed
     * @throws \SoapFault
     */
    public function save($sessionId, $otp, $userId, $value)
    {
        $query = "INSERT INTO sessions (user_id, session_key, otp, value) values (?, ?, ?, ?)";
        $result = $this->db->insertQuery($query, [$userId, $sessionId, $otp, $value]);

        return $this->searchBySession($userId, $sessionId);
    }

    public function searchBySession($userId, $sessionId)
    {
        $query = "SELECT * FROM sessions WHERE session_key = '$sessionId' and user_id = '$userId' and status = 1";
        return $this->db->executeQuery($query)->fetch();
    }

    public function searchByActive($userId)
    {
        $query = "SELECT * FROM sessions WHERE user_id = $userId and status = 1";
        return $this->db->executeQuery($query)->fetch();
    }

    /**
     * @throws \SoapFault
     */
    public function setInactive($userId, $sessionKey)
    {
        $query = "update sessions set status = 0 where user_id = ? and session_key = ? and status = 1";
        return $this->db->insertQuery($query, [$userId, $sessionKey]);
    }
}
