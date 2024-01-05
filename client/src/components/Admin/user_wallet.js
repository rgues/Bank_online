import moment from 'moment-js';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrencies, getUserWallet, getWalletTransaction } from '../../actions';
import { Link } from 'react-router-dom';
import { faArrowDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserWallet = ({ wallet,user, dispatch }) => {

   

    const [showModal, setSchowModal] = useState(false);
    const [bankName, setBankName] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [amountWord, setAmountWord] = useState('');
    const [purpose, setPurpose] = useState('');
    const [code, setCode] = useState('');
    const [codeTransfer, setCodeTransfer] = useState('');
    const [message, setMessage] = useState('');
    const [currency, setCurrency] = useState('');

    useEffect(() => {
        dispatch(getWalletTransaction());
        dispatch(getUserWallet());
        dispatch(getCurrencies());
    }, [dispatch]);

    const handleChange = (setState, id) => (event) => {
        setState(event.target.value);
        if (id === 'code') {
            setMessage('Please contact bank sender to get code.');
        }
    }

    const loadmore = () => {
        const nbTransaction = wallet.wallet.length;
        dispatch(getWalletTransaction(1,nbTransaction,'DESC',wallet.wallet));
    }

    const showWalletTransaction = (wallet) => (
        wallet && wallet.wallet && wallet.wallet.length ?
        wallet.wallet.map((item,i) => (
                item ? <tr key={i}>
                    <td>{item.reference ? item.reference : 'xxxxxxxxxxx'}</td>
                    <td>{item.transaction_type}</td>
                    <td>{item.amount}</td>
                    <td>{item.balance ? item.balance : 'waiting approval'}</td>
                    <td>{currencyName(item.currencyId)}</td>
                    <td>{ item.message }</td>
                    <td>{item.status}</td>
                    <td>{moment(item.transaction_date).format('MM-DD-YY:hh-mm')}</td>
                </tr> :
                    null
            ))
            : null
    )

    const parseCurrency = (amount) => {
        
        let parseAmount = "";
        let format = String(amount).split('.');
        const currentAmount =format[0];
      
        let amountSize = format[0].length;
       
        let nbComma = Math.floor(amountSize/3);
        
        let start = amountSize%3;

        
      
       
        if (nbComma) {
            for(let i= 0; i < nbComma ; i++) {
                
                let extra = currentAmount.substring(amountSize-(i*3), amountSize-(i*3)-3);
                
                parseAmount = parseAmount ? extra + ',' + parseAmount : extra;
             }
        }

        if (start) {
            let extra = currentAmount.substring(0,start);
            parseAmount = parseAmount ? extra + ',' + parseAmount : extra;
        }

        return  parseAmount ? format.length > 2 ? parseAmount+ format[1] : parseAmount  : amount;
    }

    const showUserWallet = () => {
        return wallet && wallet.myWallet && wallet.myWallet.wallet && wallet.myWallet.wallet.length ?

        wallet.myWallet.wallet.map((item,i) => (
                <div key={i} className='wallet-card'>
                       <div className='wallet-brand'>
                        Banco Connect
                    </div>
                    <span className="wallet-currency">
                        {item.currency}
                    </span>
                    <span className="wallet-balance">
                        {parseCurrency(item.balance)}
                    </span>

                    <div className='wallet-type'>
                        Wallet
                    </div>
            
                </div>
            ))

            : null;
    }

    const currencyName = (currency) => {
        const data = wallet && wallet.currencies && wallet.currencies.length ?
        wallet.currencies.find(item => item.id === currency) : null;
        return data ? data.code : null;
    }

    const openModal = (event) => {
        const wallets = wallet.myWallet.wallet;
        const checkBalance = wallets.some(item => item.balance > 0);
        
        if (checkBalance && user && user.login && user.login.canTransfer === 1) {
            setSchowModal(true);
        } else {
            alert('You aren\'t allow to use this service yet.');
        }
       
    }

    const showCurrencies = (wallet) => (
        wallet && wallet.myWallet && wallet.myWallet.wallet && wallet.myWallet.wallet.length ?
        wallet.myWallet.wallet.map((item,i) => (
                item.balance > 0 ?
                    <option key={i} value={item.currency}>{item.currency}</option>
                    : null
            ))

            : null
    )



    return (

        <div>

            <div className='wallet-container'>
                {showUserWallet()}

                {wallet.myWallet && wallet.myWallet.wallet ? <div className="btn-red">
                    <button onClick={(e) => openModal(e)}>Transfer to Domestic Account</button>
                </div> : null}

            </div>

            <div className='current_users'>
                <h2>Wallet Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Currency</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {showWalletTransaction(wallet)}
                    </tbody>
                </table>

                <div className='modal-container' style={{
                    display: showModal ? 'inline-block' : 'none'
                }}>

                    <div className='btn-white' onClick={() => setSchowModal(false)}>
                        <Link>
                            <FontAwesomeIcon style={{
                                color: '#fff',
                                margin: '10px',
                                fontSize: '1.5rem'
                            }} icon={faClose} />
                        </Link>
                    </div>

                    <form>

                        <div className='form_element'>
                            <input type="text" value={bankName} onChange={handleChange(setBankName, 'bankName')} placeholder='Bank Name' />
                        </div>

                        <div className='form_element'>
                            <input type="text" value={accountHolder} onChange={handleChange(setAccountHolder, 'accountHolder')} placeholder='Bank Account Holder' />
                        </div>

                        <div className='form_element'>
                            <input type="text" value={account} onChange={handleChange(setAccount, 'account')} placeholder='Bank Account Number' />
                        </div>

                        <div className='form_element'>
                            <input type="number" value={amount} onChange={handleChange(setAmount, 'amount')} placeholder='Amount in Figure' />
                        </div>

                        <div className='form_element'>
                            <input type="text" value={amountWord} onChange={handleChange(setAmountWord, 'amountWord')} placeholder='Amount in Word' />
                        </div>

                        <div className='form_element'>
                            <select value={currency} onChange={handleChange(setCurrency, 'currency')}  >
                                {showCurrencies(wallet)}
                            </select>
                        </div>

                        <div className='form_element'>
                            <textarea rows="2" value={purpose} onChange={handleChange(setPurpose, 'purpose')} placeholder='Purpose of Transfer' />
                        </div>

                        <div className='form_element'>
                            <input type="text" value={codeTransfer} onChange={handleChange(setCodeTransfer, 'codeTransfer')} placeholder='Reference Transfer Code' />
                        </div>

                        <div className='form_element'>
                            <input type="number" value={code} onChange={handleChange(setCode, 'code')} placeholder='Valid DTM code' />
                        </div>

                        {
                            message ? <div className="error">
                                {message}
                            </div>
                                : null
                        }

                        <div className='form_element'>
                            <button disabled={true}>SEND</button>
                        </div>

                    </form>

                </div>
            </div>

            {wallet && wallet.wallet && wallet.wallet.length && wallet.wallet.length < wallet.nbtrans &&
                        <div className='loadmore' onClick={loadmore}>
                        <FontAwesomeIcon icon={faArrowDown}  style={{
                            color:'#fff',
                            fontSize:'20px'
                        }}/>
                    </div>
            }
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        wallet: state.wallet,
        user: state.user
    }
}

export default connect(mapStateToProps)(UserWallet);