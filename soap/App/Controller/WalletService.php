<?php
namespace App\Controller;

use App\CRUD\UserCrud;
use App\DB\DbConnect;
use App\Model\User;

/**
 * Clase que se encargara de todas las operaciones de persistencia de datos
 */
class WalletService {
    /**
     * Función encargada de registrar clientes
     * @param $user
     * @return User
     */

    private $bd;
    private UserCrud $userCrud;

    public function __construct()
    {
        $this->bd = new DbConnect();
        $this->userCrud = new UserCrud();
    }


    public function registerClient($user)
    {
        $user = new User($user->document, $user->names, $user->email, $user->phone);
        return $this->userCrud->saveUser($user);
    }

    public function getUser($document)
    {
        return $this->userCrud->searchUser($document);
    }

    /**
     * Obtener el saldo de un cliente determinado
     */
    public function getSaldo()
    {
        return "Get saldo";
    }

    /**
     * Cargar la billetera, es decir ingresar dinero
     */
    public function loadWallet()
    {
        return "reload wallet";
    }

    /**
     * Realizar un pago
     */
    public function makePay()
    {
        return "make pay";
    }

    /**
     * Confirmar un pago
     */
    public function confirmPay()
    {
        return "confirm pay";
    }

}
