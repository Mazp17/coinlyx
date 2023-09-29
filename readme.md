# COINLYX

Esta aplicación permite la "simulación" de una billetera digital. 

Dentro de las opciones que ofrece, son:
- Crear un cliente
- Recargar la billetera
- Consultar saldo
- Realizar pago
- Confirmar pago (Se envia un codo OTP al correo del cliente)

## Installation

Para usar esta aplicación, debes hacer lo siguiente:

### SOAP
Para desplegar el servicio SOAP, que esta realizado en PHP, debes:
- Desplegar un servidor php y configurar un servidor email.
- Clonar repositorio
- Ejecutar ``` composer install ``` Esto te permitirá descargar las dependencias.
- Acceder a http://yourdomain.com/soap.php, si no muestra ningun error, esta bien configurado.

### API REST
Para desplegar el servicio API REST, que esta bajo la tecnologia de Node JS, haz lo siguiente:
- Dentro del repositorio, en la carpeta api ejecuta `` npm install ``
- Luego ejecuta `` npm run start ``, esto te generará el servidor api

### FRONTEND
Para desplegar el cliente, que esta bajo react, haz lo siguiente:
- Dentro de la carpeta frontend ejecuta el comando ``` npm install ```
- Luego ejectua ``` npm run dev ``` para ejecutar el servidor de desarrollo de vite. 

> Recuerda generar la base de datos con el script que está dentro de ``db/``

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Aclaraciones

> Este es un ejercicio propuesto como prueba tecnica por la inmobiliaria Alberto Alvarez