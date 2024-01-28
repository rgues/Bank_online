
const { admin } = require("../../../../../middleware/admin");
const { auth } = require("../../../../../middleware/auth");
const { manager } = require("../../../../../middleware/manager");
const { walletFormValidator, transferFormValidators, transferFormValidator } = require("../../../../../validator/wallet_validator");
const { Currency } = require("../models/currency");
const { Payment } = require("../models/payment");
const { Transaction } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { Code } = require("../models/code");
const { Transfer } = require("../models/transfer");


module.exports = function (app) {

    /* Currencies routes */
    app.get('/api/wallet/currencies', async (req, res) => {
        // /api/users?order=ASC
        let order = req.query.order;
        try {
            const currencies = await Currency.findAll({where: { active: 1 }, order: [['id', order]] });
            res.status(200).send(currencies);

        } catch (err) {
            res.status(400).send(err);
        }
    });


    // auth,admin, 
    app.post('/api/wallet/currency', auth, manager, async (req, res) => {

        try {
            const currency = await Currency.create(req.body);
            res.status(200).json({
                success: true,
                currency
            });
        } catch (err) {
            res.status(400).send(err);
        }

    });

    /* Code Transfert */

        /* Get code */
        app.get('/api/wallet/codes', async (req, res) => {
            // /api/users?order=ASC&skip=value&limit=value
            let order = req.query.order;
            let skip = parseInt(req.query.skip);
            let limit = parseInt(req.query.limit);

            try {
                const codes = await Code.findAll({
                where: { 
                    active: 1
                },
                order: [['id', order]] ,
                offset: skip,
                limit: limit
            });

                const nbCodes = Code.count();

                res.status(200).send({codes: codes, nbCodes: codes.length});
    
            } catch (err) {
                res.status(400).send(err);
            }
        });

            
        // auth, admin 
        app.post('/api/wallet/code', auth, manager, async (req, res) => {
    
            try {
                const code = await Code.create(req.body);
                res.status(200).json({
                    success: true,
                    code
                });
            } catch (err) {
                res.status(400).send(err);
            }
    
        });

            // updated code
            app.get('/api/wallet/code/update', auth, manager, async (req, res) => {
    
                try {
                    let id = req.query.id;
                    const code = await Code.findByPk(id);

                    if (code instanceof Code) {
                        code.set({active: 0});
                        await code.save();
                        await code.reload();
                        res.status(200).json({success:true, code:code});
                    } else {
                        res.status(200).json({success:false, message:'Code does not exist.'});
                    }
            
                } catch (err) {
                    res.status(400).send(err);
                }
        
            });

        // disable and delete code
        app.get('/api/wallet/code/archive', auth, manager, async (req, res) => {
    
            try {
                let id = req.query.id;
                const code = await Code.findByPk(id);
        
                code.set({active: 0});
        
                await code.save();
                await code.reload();

                res.status(200).send({code:code, success:true});
            } catch (err) {
                res.status(400).send(err);
            }
    
        });

          /* Get code */
          app.get('/api/wallet/checkcode', auth, async (req, res) => {
            // /api/wallet/checkcode?codeTransfer=value&codeReference=value&currency=value
            let codeTransfer = req.query.codeTransfer;
            let codeReference = req.query.codeReference;
            let currency = req.query.currency;
            let amount = req.query.amountInFigure;
            try {
                const code = await Code.findOne({
                where: { 
                    active: 1, 
                    codeTransfer: codeTransfer, 
                    codeReference:codeReference, 
                    currency: currency 
                } });

                if (code) {

                    if ( parseFloat(amount) <= parseFloat(code.amountLimit)) {
                        res.status(200).send({success: true, valid_code: true, valid_amount: true, code});
                    } else {
                        res.status(200).send({success: false, valid_code: true, valid_amount: false, code});
                    }
                   
                } else {
                    res.status(200).send({success: false, valid_code: false, valid_amount: false, code});
                }
    
            } catch (err) {
                res.status(400).send(err);
            }
        });

       /* Transfert routes */

       // save transfert
       app.post('/api/wallet/transfer', auth, transferFormValidator, async (req, res) => {
        try {
            const transfer = await Transfer.create(req.body);
            res.status(200).json({ success: true, transfer });
        } catch (err) {
            res.status(400).send(err);
        }
      });

    app.get('/api/wallet/transfer/archive', auth, async (req, res) => {
    
        try {
            let id = req.query.id;
            const transfer = await Transfer.findByPk(id);
            transfer.set({archive: 1});
            await transfer.save();
            await transfer.reload();

        } catch (err) {
            res.status(400).send(err);
        }
    });

    /* payment routes */
    app.get('/api/wallet/payment', async (req, res) => {
        // /api/users?order=ASC
        let order = req.query.order;
        try {
            const payment = await Payment.findAll({ where: { active: 1 }, order: [['id', order]] });
            res.status(200).send(payment);

        } catch (err) {
            res.status(400).send(err);
        }
    });


    // auth,admin, 
    app.post('/api/wallet/payment', auth, manager, async (req, res) => {
        try {
            const payment = await Payment.create(req.body);
            res.status(200).json({
                success: true,
                payment
            });
        } catch (err) {
            res.status(400).send(err);
        }

    });


    // Payment by credit card
    app.post('/api/wallet/credit', auth, manager, walletFormValidator, async (req, res) => {

        try {

            let { paymentId } = req.body;
            let fees = parseFloat(0);
            let serveramountPaid = parseFloat(0);
            let walletAmountPaid = parseFloat(req.body.amount_wallet);
            let userAmountPaid = parseFloat(req.body.amount_paid);

            const payment = await Payment.findByPk(paymentId);

            switch (payment.fees_type) {
                case 'number':
                    fees = parseFloat(payment.fees);
                    serveramountPaid = parseFloat(fees) + walletAmountPaid;
                    break;

                case 'percentage':
                    fees = parseFloat(payment.fees) * 0.01;
                    serveramountPaid = parseFloat(fees) + walletAmountPaid;
                    break;

                default:
                    break;
            }

            if (userAmountPaid < serveramountPaid) {
                return res.status(400).json({ success: false, message: 'Payment failed, amount paid insufficient', amount: serveramountPaid });
            }

            try {

                const params = {
                    ...req.body,
                    status: 'pending',
                    transferId: 0,
                    fees_paid: fees,
                    fees_type: payment.fees_type,
                    amount_paid: userAmountPaid,
                    amount_wallet: parseFloat(req.body.amount_wallet),
                    transaction_date: new Date(),
                };

                const transaction = await Transaction.create(params);

                try {

                    const data = {
                        status: transaction.status,
                        amount: transaction.amount_wallet,
                        currencyId: transaction.currency_wallet,
                        userId: transaction.userId,
                        reference: transaction.reference,
                        balance: 0,
                        transaction_date: new Date(),
                        transactionId: transaction.id,
                        message: transaction.receiver_message,
                        transaction_type: transaction.type,
                        confirm: 0
                    };

                    const wallet = await Wallet.create(data);
                    // construct response with new balance for each currency
                    return res.status(200).json({
                        success: true,
                        wallet: wallet
                    });

                } catch (err) {
                    // failed to credit delete the transaction
                    
                    await transaction.destroy({ force: true });
                    return res.status(400).send(err);
                }
            } catch (err) {
                
                return res.status(400).send(err);
            }

        } catch (err) {
          
            return res.status(400).send(err);
        }

    });

      // Debit user wallet after transfer is done
      app.post('/api/wallet/dedit', transferFormValidator, auth, admin, async (req, res) => {

        try {

            const payment = await Payment.findOne();

            // save the transfert
            const transferData = {
                ...req.body,
                message:req.body.purpose
            }

            const transfer = await Transfer.create(transferData);

            try {

                const params = {
                    paymentId: payment.id,
                    userId:req.body.userId,
                    tellerId: req.body.userId,
                    transferId: transfer.id,
                    type:'debit',
                    status: 'pending',
                    purpose:req.body.purpose,
                    remark:`Transfer to Domestical Account with following information,  Bank Name: ${req.body.bankName}, Account Name :  ${req.body.accountHolder} and Account Number :  ${req.body.accountNumber} `,
                    receiver_message:`${req.body.amountInFigure} ${req.body.currency} has been debited from your account.`,
                    amount_paid: parseFloat(req.body.amountInFigure),
                    amount_wallet: parseFloat(req.body.amountInFigure),
                    currency_wallet:req.body.currencyId,
                    currency_paid:req.body.currencyId,
                    transaction_date: req.body.transaction_date
                };


                const transaction = await Transaction.create(params);

                try {

                    const data = {
                        status: transaction.status,
                        amount: transaction.amount_wallet,
                        currencyId: transaction.currency_wallet,
                        userId: transaction.userId,
                        reference: transaction.reference,
                        balance: 0,
                        transaction_date: transaction.transaction_date,
                        transactionId: transaction.id,
                        message: transaction.receiver_message,
                        transaction_type: transaction.type,
                        confirm: 0
                    };

                    const wallet = await Wallet.create(data);
                    // construct response with new balance for each currency
                    return res.status(200).json({
                        success: true,
                        wallet: wallet
                    });

                } catch (err) {
                    // failed to credit delete the transaction
                    console.log(err);
                    await transaction.destroy({ force: true });
                    return res.status(400).send(err);
                }
            } catch (err) {
             
                return res.status(400).send(err);
            }

        } catch (err) {
        
            return res.status(400).send(err);
        }

    });

    // Get the user wallet transaction
    app.get('/api/wallet/transaction', auth, async (req, res) => {

        let skip = parseInt(req.query.skip);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;
        let user = req.user;

        try {
            const transaction = await Wallet.findAll(
                {
                    where: { userId: user.id, archive:0 },
                    order: [['updatedAt', order]],
                    offset: skip,
                    limit: limit
                });

            const nbtrans = await Wallet.count({ where: { userId: user.id , archive:0} });
            res.status(200).json({ transaction, nbtrans });

        } catch (err) {
           
            res.status(400).send(err);
        }
    });


    // Get list of transaction by admin
    app.get('/api/transaction/admin', auth, manager, async (req, res) => {

        let skip = parseInt(req.query.skip);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;
        let userId = req.user.id;
        const currentRole = req.user.role;
        let transaction = [];
        let nbtrans = 0;

        try {

            if(currentRole === 'admin') {
                transaction = await Transaction.findAll({
                    where: { archive: 0 },
                    order: [['updatedAt', order]],
                    offset: skip,
                    limit: limit
                });
                
             nbtrans = await Transaction.count({ where: { archive: 0} });
            }

            if(currentRole === 'manager') {
                transaction = await Transaction.findAll({
                    where: { tellerId: userId, archive: 0 },
                    order: [['updatedAt', order]],
                    offset: skip,
                    limit: limit
                });
                
             nbtrans = await Transaction.count({ where: { tellerId: userId,archive: 0 } });
            }

            res.status(200).json({ transaction, nbtrans });

        } catch (err) {
         
            res.status(400).send(err);
        }
    });


    app.get('/api/transaction/confirm', auth, admin, async (req, res) => {
        // /api/transaction/confirm?id=64e0bc5bd3a9bc810be1f80c
        try {

            let id = req.query.id;
            const transaction = await Transaction.findByPk(id);

            transaction.set({
                confirm: 1,
                status: 'complete'
            });

            await transaction.save();
            await transaction.reload();

            const lastTransaction = await Wallet.findAll({
                where: { userId: transaction.userId, confirm: 1, currencyId: transaction.currency_wallet },
                order: [['updatedAt', 'DESC']],
                limit: 1
            });

            let currentBalance = parseFloat(transaction.amount_wallet);
            if (lastTransaction && lastTransaction.length > 0) {
                currentBalance = parseFloat(lastTransaction[0].balance);
                switch (transaction.type) {
                    case 'credit':
                        currentBalance += parseFloat(transaction.amount_wallet);
                        break;
                    case 'debit':
                        currentBalance -= parseFloat(transaction.amount_wallet);
                        break;
                    default:
                        break;
                }

            }
            const newBalance = await Wallet.findOne({ where: { 'userId': transaction.userId, 'transactionId': transaction.id } });

            newBalance.set({
                confirm: 1,
                status: transaction.status,
                balance: currentBalance
            });

            await newBalance.save();

            res.status(200).json({ success: true, transaction });
        } catch (err) {
        
            res.status(400).send(err);
        }
    });

    app.get('/api/transaction/archive', auth, admin, async (req, res) => {
        // /api/transaction/confirm?id=64e0bc5bd3a9bc810be1f80c
        try {

            let id = req.query.id;
            const transaction = await Transaction.findByPk(id);

            transaction.set({
                archive: 1
            });

            await transaction.save();
            await transaction.reload();

            const wallet = await Wallet.findOne({ where: { 'userId': transaction.userId, 'transactionId': transaction.id } });

            if (wallet && wallet.status === 'pending') {
                wallet.set({
                    archive: 1
                });
                await wallet.save();
            }

            res.status(200).json({ success: true, transaction });
        } catch (err) {
        
            res.status(400).send(err);
        }
    });

    app.get('/api/user/wallet', auth, async (req, res) => {

        try {
            const userId = req.user.id;
            const currencyId = req.query.id;
            const currency = await Currency.findByPk(currencyId);

            const transactions = await Wallet.findAll({
                where: { userId: userId, confirm: 1, archive: 0, currencyId: currencyId },
                order: [['updatedAt', 'DESC']],
                limit: 1
            });

            transactions.map(trans => {
                res.status(200).json({ success: true, wallet: { currency, balance: trans.balance } });
            })

            res.status(200).json({ success: true, wallet: { currency, balance: 0 } });

        } catch (err) {
            
            res.status(400).send(err);
        }
    });

    app.get('/api/user/wallets', auth, async (req, res) => {

        try {

            const userId = req.user.id;
            const currencies = await Currency.findAll();

            try {
                let response = [];
                while (currencies.length) {
                    let currency = currencies.pop();
                    let wallet = await Wallet.findAll({
                        where: { userId: userId, confirm: 1, archive: 0, currencyId: currency.id },
                        order: [['updatedAt', 'DESC']],
                        limit: 1
                    });
                    response.push({ currency: currency.code, currencyId: currency.id, balance: wallet.length ? wallet[0].balance : 0 });
                }
                res.status(200).json({ success: true, wallet: response });

            } catch (err) {
                res.status(400).send(err);
            }

        } catch (err) {
            res.status(400).send(err);
        }
    });


}