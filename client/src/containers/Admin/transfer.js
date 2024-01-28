import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers, getPayments, getCurrencies, getHideHeader, clearHideHeader, creditWallet, clearWallet } from '../../actions';
import { useNavigate } from 'react-router-dom';


const Transfert = ({ dispatch, user, wallet }) => {

    let validation = {
        type: {
            validation: {
                required: true,
                maxLen: 25
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        paymentId: {
            validation: {
                required: true,
                maxLen: 256
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        userId: {
            validation: {
                required: true,
                maxLen: 256
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        tellerId: {
            validation: {
                required: false,
                maxLen: 256
            },
            valid: true,
            touched: false,
            validationMessage: ''
        },
        purpose: {
            validation: {
                required: true,
                maxLen: 1000
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        remark: {
            validation: {
                required: true,
                maxLen: 1000
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        receiver_message: {
            validation: {
                required: true,
                maxLen: 1000
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        amount_wallet: {
            validation: {
                required: true,
                pattern: /^[0-9.]+$/
            },
            valid: true,
            touched: false,
            validationMessage: ''
        },
        amount_paid: {
            validation: {
                required: true,
                pattern: /^[0-9.]+$/
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        currency_wallet: {
            validation: {
                required: true,
                maxLen: 256
            },
            valid: true,
            touched: false,
            validationMessage: ''
        },
        currency_paid: {
            validation: {
                required: true,
                maxLen: 256
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        transaction_date: {
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            validationMessage: ''
        }
    }

    const [type, setType] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [userId, setUserId] = useState('');
    const [tellerId, setTellerId] = useState('');
    const [purpose, setPurpose] = useState('');
    const [remark, setRemark] = useState('');
    const [receiver_message, setReceiver_message] = useState('');
    const [amount_wallet, setAmount_wallet] = useState('');
    const [amount_paid, setAmount_paid] = useState('');
    const [currency_paid, setCurrency_paid] = useState('');
    const [currency_wallet, setCurrency_wallet] = useState('');
    const [transaction_date, setTransactionDate] = useState('');
    const [formValidation, setFormValidation] = useState(validation);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
       
        dispatch(getUsers());
        dispatch(getPayments());
        dispatch(getCurrencies());
        dispatch(getHideHeader(true));

        return () => {
            dispatch(clearHideHeader());
            dispatch(clearWallet());
            clearForm();
        }
    }, []);

    const clearForm = () => {
        setType('');
        setPaymentId('');
        setUserId('');
        setPurpose('');
        setTellerId('');
        setRemark('');
        setReceiver_message('');
        setAmount_wallet('');
        setAmount_paid('');
        setCurrency_paid('');
        setCurrency_wallet('');
        setTransactionDate(new Date());
    }

    // Check for update
    useEffect(() => {
        if (wallet && wallet.credit && wallet.credit.success) {
            navigate('/user');
        }
    })

    const validateForm = (inputName, value) => {

        const input = formValidation[inputName];
        let error = [true, ''];

        if (input.validation.maxLen) {
            const valid = value.length <= input.validation.maxLen;
            const message = `${!valid ? `Must be less than ${input.validation.maxLen}` : ''}`
            error = valid ? error : [valid, message]
        }

        if (input.validation.pattern) {
            const valid = input.validation.pattern.test(value);
            const message = `${!valid ? `This fiels is incorrect` : ''}`
            error = valid ? error : [valid, message]
        }

        if (input.validation.minLen) {
            const valid = value.length >= input.validation.minLen;
            const message = `${!valid ? `Must be greather than ${input.validation.minLen}` : ''}`
            error = valid ? error : [valid, message]
        }

        if (input.validation.required) {
            const valid = value.trim() !== '';
            const message = `${!valid ? `This field is required !` : ''}`
            error = valid ? error : [valid, message]
        }

        return error;
    }

    const showValidation = (data) => {
        let errorMessage = null;
        if (data.validation && !data.valid) {
            errorMessage = (
                <div className="error">
                    {data.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }


    const handleInputChange = (setState, inputName, blur) => (event) => {

        const newFormValidation = formValidation;

        if (blur) {
            let validData = validateForm(inputName, event.target.value);
            newFormValidation[inputName].valid = validData[0];
            newFormValidation[inputName].validationMessage = validData[1];
        }

        newFormValidation[inputName].touched = blur;
        // set current admin user
        if (!tellerId) {
            setTellerId(user.login.id);
        }

        // Set the amount user 'll receive in wallet
        if (inputName === 'amount_paid') {
            setAmount_wallet(amount_paid);
        }

        if (inputName === 'currency_paid') {
            setCurrency_wallet(currency_paid);
        }

        if (inputName === 'transaction_date') {
            setTransactionDate( new Date(transaction_date));
        }

        setState(event.target.value);
        setFormValidation(newFormValidation);

    }

    const submitForm = (event) => {
        event.preventDefault();

        let formValid = true;
        for (let key in formValidation) {
            formValid = formValid && formValidation[key].valid;
        }

        if (formValid) {
            dispatch(creditWallet(
                {
                    type, paymentId, userId, tellerId, purpose, remark,
                    receiver_message, amount_wallet, amount_paid,
                    currency_paid, currency_wallet, transaction_date
                }
            ));
        } else {
            setError('Error Invalid form !')
        }

    }

    const showCurrencies = (wallet) => (
        wallet && wallet.currencies && wallet.currencies.length ?
        wallet.currencies.map(item=> (
                item ?
                    <option key={item.id} value={item.id}>{item.code}</option>
                    : null
            )) : null
    )

    const showPayments = (wallet) => (
        wallet && wallet.payments && wallet.payments.length ?
        wallet.payments.map(item => (
                item ?
                    <option key={item.id} value={item.id}>{item.name}</option>
                    : null
            )) : null
    )

    const showUsers = (user) => (
        user && user.users && user.users.length ?
            user.users.map(item => (
                item && item.active === 1 && item.id !== user.login.id  && item.role === 'client' ?
                    <option key={item.id} value={item.id}>{item.firstname} {item.lastname}</option>
                    : null
            )) : null
    )

    return (

        <div className='transfer-container' >

            <div className='rl_container'>

                <form onSubmit={submitForm}>

                    <h2>
                        Transfer Money To Account
                    </h2>
                    <p>Sending money and confirm the transaction before user's wallet 'll be credited.</p>
                    <div className={`form_element ${formValidation['type'].touched && !formValidation['type'].valid ? ' form_invalid' : ''}`}>
                        <select value={type}
                            onBlur={handleInputChange(setType, 'type', true)}
                            onChange={handleInputChange(setType, 'type', false)} >
                            <option key="0" value=''>Transaction Type</option> 
                            <option key="1" value="credit">Transfer</option>
                            {/*<option key="2" value="debit">Withdrawal</option>*/}
                        </select>
                        {formValidation['type'].touched ? showValidation(formValidation['type']) : null}
                    </div>

                    <div className={`form_element ${formValidation['paymentId'].touched && !formValidation['paymentId'].valid ? ' form_invalid' : ''}`}>
                
                        <select value={paymentId}
                            onBlur={handleInputChange(setPaymentId, 'paymentId', true)}
                            onChange={handleInputChange(setPaymentId, 'paymentId', false)} >
                            <option  key="0" value=''>Payment Type</option>
                            {showPayments(wallet)}
                        </select>
                        {formValidation['paymentId'].touched ? showValidation(formValidation['paymentId']) : null}
                    </div>

                    <div className={`form_element ${formValidation['userId'].touched && !formValidation['userId'].valid ? ' form_invalid' : ''}`}>
                        <select value={userId}
                            onBlur={handleInputChange(setUserId, 'userId', true)}
                            onChange={handleInputChange(setUserId, 'userId', false)} >
                            <option key="0" value=''>Receiver Name</option>
                            {showUsers(user)}
                        </select>
                        {formValidation['userId'].touched ? showValidation(formValidation['userId']) : null}
                    </div>

                    <div className={`form_element ${formValidation['currency_paid'].touched && !formValidation['currency_paid'].valid ? ' form_invalid' : ''}`}>
                        <select value={currency_paid}
                            onBlur={handleInputChange(setCurrency_paid, 'currency_paid', true)}
                            onChange={handleInputChange(setCurrency_paid, 'currency_paid', false)}>
                                 <option key="0" value=''>Currency</option>
                            {showCurrencies(wallet)}
                        </select>
                        {formValidation['currency_paid'].touched ? showValidation(formValidation['currency_paid']) : null}
                    </div>

                    <div className={`form_element ${formValidation['amount_paid'].touched && !formValidation['amount_paid'].valid ? ' form_invalid' : ''}`}>
                        <input type="number" placeholder='Amount Received' value={amount_paid}
                            onBlur={handleInputChange(setAmount_paid, 'amount_paid', true)}
                            onChange={handleInputChange(setAmount_paid, 'amount_paid', false)} />
                        {formValidation['amount_paid'].touched ? showValidation(formValidation['amount_paid']) : null}
                    </div>


                    <div className={`form_element ${formValidation['purpose'].touched && !formValidation['purpose'].valid ? ' form_invalid' : ''}`}>
                        <textarea rows="2" placeholder='Purpose' value={purpose}
                            onBlur={handleInputChange(setPurpose, 'purpose', true)}
                            onChange={handleInputChange(setPurpose, 'purpose', false)} />
                        {formValidation['purpose'].touched ? showValidation(formValidation['purpose']) : null}
                    </div>


                    <div className={`form_element ${formValidation['remark'].touched && !formValidation['remark'].valid ? ' form_invalid' : ''}`}>
                        <textarea rows="2" placeholder='Remark' value={remark}
                            onBlur={handleInputChange(setRemark, 'remark', true)}
                            onChange={handleInputChange(setRemark, 'remark', false)} />
                        {formValidation['remark'].touched ? showValidation(formValidation['remark']) : null}
                    </div>

                    <div className={`form_element ${formValidation['receiver_message'].touched && !formValidation['receiver_message'].valid ? ' form_invalid' : ''}`}>
                        <textarea rows="2" placeholder='Receiver Bank Message' value={receiver_message}
                            onBlur={handleInputChange(setReceiver_message, 'receiver_message', true)}
                            onChange={handleInputChange(setReceiver_message, 'receiver_message', false)} />
                        {formValidation['receiver_message'].touched ? showValidation(formValidation['receiver_message']) : null}
                    </div>

                    <div className={`form_element ${formValidation['transaction_date'].touched && !formValidation['transaction_date'].valid ? ' form_invalid' : ''}`}>
                        <input type="date" placeholder='Transaction Date' value={transaction_date}
                            onBlur={handleInputChange(setTransactionDate, 'transaction_date', true)}
                            onChange={handleInputChange(setTransactionDate, 'transaction_date', false)} />
                        {formValidation['transaction_date'].touched ? showValidation(formValidation['transaction_date']) : null}
                    </div>

                    {
                        wallet.credit ?
                            <div className='error'>
                                {wallet.credit.message}
                            </div>
                            : null
                    }

                    {
                        error !== '' ?
                            <div className='error'>
                                {error}
                            </div>
                            : null
                    }

                    <button type="submit">Transfer</button>
                </form>

            </div>

        </div>


    );
};

const mapStateToProps = (state) => {


    return {
        user: state.user,
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(Transfert);