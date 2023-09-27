<?php
namespace App\Controller;

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
    public function registerClient($user): User
    {

        $user = new User($user->document, $user->names, $user->email, $user->phone);
        return $user;
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

    public function saludar()
    {
        return "hola";
    }
}
