<?php

namespace App\CRUD;

use App\DB\DbConnect;
use App\Model\User;
use SoapFault;

/**
 * Clase encargada de la consulta y persistencia de los datos
 * de la clase usuario
 */
class UserCrud {

    private DbConnect $db;

    public function __construct()
    {
        $this->db = new DbConnect();
    }


    /**
     * Metodo para obtener un usuario en especifico usando su numero de documento
     * @param $document
     */
    public function searchUser($document)
    {
        $query = "SELECT * FROM users WHERE document = '$document'";
        return $this->db->executeQuery($query)->fetch();
    }

    /**
     * Metodo para persistir un usuario
     * @param User $user
     * @return User
     * @throws SoapFault
     */
    public function saveUser(User $user)
    {
        $userG = $this->searchUser($user->document);
        if($userG) {
            throw new SoapFault("400", "Este numero de documento ya existe");
        }

        $query = "INSERT INTO users (document, names, email, phone) VALUES (?, ?, ?, ?)";
        $result = $this->db->insertQuery($query, [$user->document, $user->names, $user->email, $user->phone]);
        $user->setId($result);

        $query = "INSERT INTO balance (userId) VALUES (?)";
        $result = $this->db->insertQuery($query, [$user->getId()]);
        return $user;
    }

    /**
     * Metodo para actualizar un usuario
     * @param User $user
     * @return void
     */
    public function updateUser(User $user)
    {

    }
}
