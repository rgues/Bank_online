const { isUser } = require("../helper/user_helper");
const { isPayment, isCurrency } = require("../helper/wallet_helpers");


let walletFormValidator = async (req, res, next) => {

    const params = req.body;
    const userAdmin = await isUser(params.userId);
    const userTeller = await isUser(params.tellerId);
    const payment = await isPayment(params.paymentId);
    const currencyWallet = await isCurrency(params.currency_wallet);
    const currencyPaid = await isCurrency(params.currency_paid);

    if (params.hasOwnProperty('type') && !params.type) {
       return res.status(400).json({ success: false, message: 'Transaction type is required !' })
    }

    if (params.hasOwnProperty('paymentId')) {
        if (!params.paymentId) {
            return  res.status(400).json({ success: false, message: 'Payment  is required !' })
        }

        if (params.paymentId && !payment) {
            return res.status(400).json({ success: false, message: 'Payment doesn\'t exist !' })
        }
    }

    if (params.hasOwnProperty('userId')) {
        if (!params.userId) {
            return res.status(400).json({ success: false, message: 'User  is required !' })
        }

        if (params.userId && !userAdmin) {
            return res.status(400).json({ success: false, message: 'User doesn\'t exist !' })
        }
    }

    if (params.hasOwnProperty('tellerId')) {
        if (!params.tellerId) {
            return res.status(400).json({ success: false, message: 'User admin is required !' })
        }

        if (params.tellerId && !userTeller) {
            return res.status(400).json({ success: false, message: 'User admin doesn\'t exist !' })
        }
    }

    if (params.hasOwnProperty('currency_wallet') || params.hasOwnProperty('currency_paid')) {
        if (!params.currency_wallet) {
            return res.status(400).json({ success: false, message: 'Wallet currency  is required !' })
        }

        if (params.currency_wallet && !currencyWallet) {
            return res.status(400).json({ success: false, message: 'Wallet currency doesn\'t exist !' })
        }

        if (!params.currency_paid) {
            return res.status(400).json({ success: false, message: 'Payment currency  is required !' })
        }

        if (params.currency_paid && !currencyPaid) {
            return res.status(400).json({ success: false, message: 'Payment currency doesn\'t exist !' })
        }
    }

    if (params.hasOwnProperty('amount_wallet') || params.hasOwnProperty('amount_paid')) {
        if (!params.amount_wallet) {
            return res.status(400).json({ success: false, message: 'Wallet amount  is required !' })
        }


        if (!params.amount_paid) {
            return res.status(400).json({ success: false, message: 'Payment amount  is required !' })
        }

    }

    next();
}


module.exports = { walletFormValidator }