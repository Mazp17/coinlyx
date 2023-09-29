import express from "express";
import { createClient } from "soap";
import WalletService from "./src/controller/WalletService.js";
import wallet from "./src/routes/wallet.js";

import 'dotenv/config'
import User from "./src/model/user.js";

const app = express();
const port = process.env.PORT || 3000;


const wsdlUrl = process.env.URL_WSDL;

const walletService = new WalletService(wsdlUrl);

app.use(express.json());
app.post("/user/register", async (req, res) => {
    const user = new User(req.body);
    try {
        const value = await walletService.saveUser(user);
        res.json({
            status: true,
            code: 201,
            message: "Se ha creado el usuario con exito",
            data: value
        })
    } catch (error) {
        res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        });
    }
});

app.get("/user/:document", async (req, res) => {
    const document = req.params.document;
    const value = await walletService.getUser(document);
    if(!value) {
        res.json({
            status: false,
            code: 404,
            message: "No se ha encontrado un usuario con ese documento",
            data: {}
        });
        return;
    }
    res.json({
        status: true,
        code: 200,
        message: "Solicitud realizada con exito",
        data: value
    });
});




app.use("/wallet", wallet);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/* const server = http.createServer(async (req, res) => {
    const client = await createSoapClient(wsdlUrl);
    const value = await getUserFromWalletService(client, "10004033291");
    console.log(value.toString());
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(value));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}); */
