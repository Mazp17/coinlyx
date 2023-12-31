import express from "express";
import WalletService from "../controller/WalletService.js";
import 'dotenv/config'

const router = express.Router();
const walletService = new WalletService(process.env.URL_WSDL);

router.get("/balance", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

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
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const data = {
        document: req.body.document,
        phone: req.body.phone,
        value: req.body.value
    };
    try {
        const value = await walletService.loadWallet(data);
        return res.json({
            status: true,
            code: 200,
            message: "Se ha cargado con exito",
            data: value
        })
    } catch (error) {
        return res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        })
    }
});

router.post("/confirm", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const data = {
        sessionKey: req.body.sessionKey,
        otp: req.body.otp,
        document: req.body.document
    };
    try {
        const value = await walletService.confirmPay(data);
        return res.json({
            status: true,
            code: 200,
            message: value.message,
            data: value
        })
    } catch(error) {
        return res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        });
    }
});

router.post("/pay", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    const data = {
        document: req.body.document,
        value: req.body.value
    }
    try {
        const value = await walletService.makePay(data);
        return res.json({
            status: true,
            code: 200,
            message: value.message,
            data: value
        });
    } catch(error) {
        return res.json({
            status: false,
            code: 400,
            message: error.message,
            data: {}
        });
    }
});

export default router;