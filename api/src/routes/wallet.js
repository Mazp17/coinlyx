import express from "express";
import WalletService from "../controller/WalletService.js";
import 'dotenv/config'

const router = express.Router();
const walletService = new WalletService(process.env.URL_WSDL);

router.get("/balance", async (req, res) => {
    const data = {
        document: req.query.document,
        phone: req.query.phone
    };
    try {
        const value = await walletService.getSaldo(data);
        return res.json({
            status: true,
            code: 200,
            message: "Solicitud realizada con exito",
            data: {
                saldo: value
            }
        });
    } catch (error) {
        return res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        });
    }
});

router.post("/load", async (req, res) => {
    const data = {
        document: req.body.document,
        phone: req.body.phone,
        value: req.body.value
    };
    try {
        const value = await walletService.loadWallet(data);
        res.json({
            status: true,
            code: 200,
            message: "Se ha cargado con exito",
            data: value
        })
    } catch (error) {
        res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        })
    }
});

router.get("/confirm", (req, res) => {
    res.end("Confirm Pay");
});

router.post("/pay", (req, res) => {
    const data = {
        document: req.body.document,
        value: req.body.value
    }

    return res.json(data);
});

export default router;