const crypto = require("crypto");

const privateKeySymbol = Symbol('privateKey')
class Carteira {

    constructor() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
        });
        this.publicKey = publicKey.export({ type: 'pkcs1', format: 'pem' });
        this[privateKeySymbol] = privateKey.export({ type: 'pkcs1', format: "pem" });
    }

    transaction(publicKey, value) {

        const transaction = {
            to: this.publicKey,
            from: publicKey,
            value,

        }

        const signature = crypto.sign("sha256", Buffer.from(JSON.stringify(transaction)), {
            key: this[privateKeySymbol],
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        }).toString('base64');
        return { signature: signature, transaction: JSON.stringify(transaction) };
    }

}

module.exports = Carteira;