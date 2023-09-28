<?php

namespace App\Controller;

use App\CRUD\SessionCRUD;
use App\CRUD\UserCrud;
use App\CRUD\WalletCrud;
use App\DB\DbConnect;
use App\Model\User;
use App\Response\ConfirmPayResponse;
use App\Response\PayResponse;
use App\Response\WalletResponse;
use Cassandra\Date;
use SoapFault;

/**
 * Clase que se encargara de todas las operaciones de persistencia de datos
 */
class WalletService
{
    /**
     * Función encargada de registrar clientes
     * @param $user
     * @return User
     */

    private $bd;
    private UserCrud $userCrud;

    private WalletCrud $walletCrud;
    private SessionCRUD $sessionCRUD;

    public function __construct()
    {
        $this->bd = new DbConnect();
        $this->userCrud = new UserCrud();
        $this->walletCrud = new WalletCrud();
        $this->sessionCRUD = new SessionCRUD();
    }


    /**
     * @throws SoapFault
     */
    public function registerClient($user): User
    {
        $user = new User($user->document, $user->names, $user->email, $user->phone);
        $user = $this->userCrud->saveUser($user);


        return $user;
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
     * @param $request
     * @return WalletResponse|string
     * @throws SoapFault
     */
    public function loadWallet($request)
    {
        $user = $this->userCrud->searchUser($request->document);
        if (!$user) {
            throw new \SoapFault("400", "No existe este usuario");
        }

        if ($user["phone"] != $request->phone) {
            throw new \SoapFault("400", "El telefono no pertenece a ningun usuario");
        }

        if ($request->value == 0) {
            throw new \SoapFault("400", "No puedes recargar $0");

        }

        $balance = $this->walletCrud->load($user["id"], $request->value);
        $response = new WalletResponse();
        $response->status = 200;
        $response->message = "Se ha cargado con exito";
        $response->balance = (float)$balance;
        return $response;
    }

    /**
     * Realizar un pago
     * @param $request object with { document, value }
     * @return PayResponse
     * @throws SoapFault
     */
    public function makePay(object $request): PayResponse
    {
        date_default_timezone_set('America/Bogota');

        $user = $this->userCrud->searchUser($request->document);
        if (!$user) {
            throw new \SoapFault("404", "No hay un cliente registrado con ese numero de identificacion");
        }
        $wallet = $this->walletCrud->searchByUserId($user["id"]);

        if ($request->value > $wallet["balance"]) {
            throw new \SoapFault("400", "No tiene los fondos suficientes");
        }
        $session = $this->sessionCRUD->searchByActive($user["id"]);
        if ($session) {
            $to_time = strtotime($session["created_at"]);
            $from_time = strtotime(date("Y-m-d h:i:s"));
            $diff = round(abs($from_time - $to_time) / 60, 2);
            if (round(abs($from_time - $to_time) / 60, 2) <= 5) {
                throw new SoapFault("400", "Tienes un pago pendiente, intentalo en 5 minutos");
            }
            $this->sessionCRUD->setInactive($user["id"], $session["session_key"]);
        }

        session_start();
        $otp = rand(100000, 999999);
        $session = $this->sessionCRUD->save(session_id(), $otp, $user["id"], $request->value);
        $this->sendMail($user["email"], $otp);

        $response = new PayResponse();
        $response->status = 200;
        $response->message = "El codigo ha sido enviado al correo electronico";
        $response->sessionKey = $session["session_key"];

        return $response;
    }

    /**
     * Metodo para enviar el correo con el codigo de verificacion
     * @param $email
     * @param $otp
     * @return true
     * @throws SoapFault
     */
    public function sendMail($email, $otp): bool
    {
        $to_email = $email;
        $subject = "Codigo de verificación para transacción | COINLYX";
        $body = "Hola, tu codigo es: $otp Ingresalo en la aplicación para confirmar tu transacción";
        $headers = "From: zpmaepp@gmail.com" . "\r\n" .
            "Reply-To: zpmaepp@gmail.com" . "\r\n" .
            "X-Mailer: PHP/" . phpversion();
        if (mail($to_email, $subject, $body, $headers)) {
            return true;
        }
        throw new SoapFault("500", "No se pudo enviar el correo, por favor comunicate con el administrador");
    }

    /**
     * Confirmar un pago
     * @param $request object with { sessionKey, otp, document }
     * @return ConfirmPayResponse
     * @throws SoapFault
     */
    public function confirmPay(object $request): ConfirmPayResponse
    {
        $user = $this->userCrud->searchUser($request->document);
        if(!$user) {
            throw new SoapFault("404", "No existe el usuario indicado");
        }

        $session = $this->sessionCRUD->searchBySession($user["id"], $request->sessionKey);
        $wallet = $this->walletCrud->searchByUserId($user["id"]);

        if(!$session) {
            throw new SoapFault("404", "No existe una sesión para este usuario");
        }

        $to_time = strtotime($session["created_at"]);
        $from_time = strtotime(date("Y-m-d h:i:s"));
        if (round(abs($from_time - $to_time) / 60, 2) < 5) {
            throw new SoapFault("400", "El token ha vencido, por favor intenta nuevamente");
        }
        if($request->otp != $session["otp"]) {
            throw new SoapFault("400", "El codigo que ha ingresado no coincide, intentelo nuevamente");
        }

        $wallet["balance"] = $wallet["balance"] - $session["value"];
        $wallet = $this->walletCrud->update($user["id"], $wallet["balance"]);

        $this->sessionCRUD->setInactive($user["id"], $session["session_key"]);

        $response = new ConfirmPayResponse();
        $response->message = "Se ha confirmado el pago";
        $response->status = 200;

        return $response;
    }
}
