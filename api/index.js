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

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
    res.set('Access-Control-Allow-Origin', '*');

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
