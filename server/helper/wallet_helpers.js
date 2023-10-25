const { Currency } = require("../controllers/api/v0/wallet/models/currency");
const { Payment } = require("../controllers/api/v0/wallet/models/payment");
const { Transaction } = require("../controllers/api/v0/wallet/models/transaction");


const isCurrency = async (id) => {
    try {
        const currency = await Currency.findByPk(id);
        if(currency === null) {
            return false;
        } else {
            return currency instanceof Currency;
        }
    } catch (error) {
        return false;
    }
    
}

const isPayment = async (id) => {

    try {
        const payment = await Payment.findByPk(id);
        if (payment === null) {
            return false;
        } else {
            return payment instanceof Payment;
        }
    } catch (error) {
        return false;
    }
    
}

const isTransaction = async (id) => {
    try {
        const transaction = await Transaction.findByPk(id);
       
        if (transaction === null) {
            return false;
        } else {
            return transaction instanceof Transaction;
        }

    } catch (error) {
        return false;
    }
 
}

module.exports = {
    isCurrency,
    isPayment,
    isTransaction
};