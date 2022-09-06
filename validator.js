const crypto = require("crypto");

class Validator {
    isVerified(trade) {
        const transactionParse = JSON.parse(trade.transaction)
        return crypto.verify(
            "sha256",
            Buffer.from(trade.transaction),
            {
                key: transactionParse.to,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            },
            Buffer.from(trade.signature, 'base64')
        );
    }

}

module.exports = Validator