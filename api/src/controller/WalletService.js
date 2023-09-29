import { createClient } from "soap";

export default class WalletService {
    constructor(wsdlUrl) {
        this._wsdlUrl = wsdlUrl;
        this._client;
        this._init();
    }
    
    async _init() {
        this._client = await this.createSoapClient();
    }
    
    createSoapClient() {
        return new Promise((resolve, reject) => {
            createClient(this._wsdlUrl, (err, client) => {
                if(err) reject(err);

                resolve(client);
            });
        }); 
    }

    getUser(documentUser) {
        return new Promise((resolve, reject) => {
            this._client.WalletService.WalletServicePort.GetUser(documentUser, (err, value) => {
                if(err) reject(err);

                resolve(value);
            })
        });
    }

    getSaldo({document, phone}) {
        return new Promise((resolve, reject) => {
            this._client.WalletService.WalletServicePort.getSaldo({
                document: document,
                phone: phone
            }, (err, value) => {
                if(err){
                    reject(err);  
                } 

                resolve(value);
            })
        });
    }

    saveUser(user) {
        return new Promise((resolve, reject) => {
            this._client.WalletService.WalletServicePort.registerClient(user, (err, value) => {
                if(err) reject(err);
                resolve(value);
            })
        })
    }

    loadWallet(data) {
        return new Promise((resolve, reject) => {
            this._client.WalletService.WalletServicePort.LoadWallet(data, (err, value) => {
                if(err) reject(err);
                resolve(value);
            })
        });
    }
}