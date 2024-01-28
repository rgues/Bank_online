import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveCode, getHideHeader, clearHideHeader, clearGenerateCode } from '../../actions';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const GenerateCode = ({ dispatch, wallet }) => {

    const [amountLimit, setAmountLimit] = useState('');
    const [currency, setCurrency] = useState('');
    const [codeReference, setCodeReference] = useState('');
    const [codeTransfer, setCodeTransfer] = useState('');
  
    useEffect(() => {
        dispatch(getHideHeader(true));
        return () => {
            dispatch(clearHideHeader());

        }
    }, []);

    useEffect(() => {
        if (wallet && wallet.code_success) {
            alert('Code has been generated successfully.');
            setAmountLimit('');
            setCurrency('');
            setCodeReference('');
            setCodeTransfer('');
            dispatch(clearGenerateCode());
        }
    });

    // Sent login data
    const submitForm = (e) => {
        e.preventDefault();

        console.log({ amountLimit, currency,codeReference, codeTransfer });

        if (!amountLimit || amountLimit < 0) {
            alert('Max amount should be greather than 0');
        } else if (!currency) {
            alert('Currency must be set.')
        } else if (!codeReference || !codeTransfer) {
            alert(`Code ${codeReference ? 'Transfer' : 'Reference'} must be set.`)
        } else {
            dispatch(saveCode({ amountLimit, currency,codeReference, codeTransfer }))
        }
       
    }

    const handleInputMaxAmount = (event) => {  
        setAmountLimit(event.target.value);
    }

    const handleInputCodeReference = (event) => {
        setCodeReference(event.target.value);
    }

    const handleInputCurrency = (event) => {
        setCurrency(event.target.value);
    }

    const handleInputCodeTransfer = (event) => {
        setCodeTransfer(event.target.value);
    }

    const  generateCode = (step) => {
        const alphanum = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
        let alphaRef = '';
        for (let i=0; i< step; i++) {
            alphaRef += alphanum.charAt(Math.floor(Math.random()*36))
        }
        return alphaRef
      
    }

    const  generateCodeRef = () => {
            let code = generateCode(10);
            setCodeReference(code);
    }

    
    const  generateCodeTrans = () => {
        let code = generateCode(5);
        setCodeTransfer(code);
   }

    const showCurrencies = (wallet) => (
        wallet && wallet.currencies && wallet.currencies.length ?
        wallet.currencies.map(item=> (
                item ?
                    <option key={item.id} value={item.code}>{item.code}</option>
                    : null
            )) : null
    )

    return (
        <div className='auth-container' >

          <div className="equity-brand-ads" style={{
                background: `url(/images/banco_brand.png)`
            }}>
        </div>

            <div className='rl_container login'>
                <form onSubmit={submitForm}>

                    <h2>Transfer code</h2>

                    <p>Here, you can generate code transfert and code reference 
                        to allow a user to make a transfer.
                    </p> 

                    <div className='form_element'>
                        <input
                            type="text"
                            placeholder='Code Reference'
                            disabled={true}
                            value={codeReference}
                            onChange={handleInputCodeReference} />
                                <FontAwesomeIcon onClick={generateCodeRef}  icon={faEdit} style={{
                            color: '#a32a29',
                            fontSize: '1.5rem'
                        }} />
                    </div> 

                    <div className='form_element'>
                        <input
                            type="text"
                            placeholder='Code Transfer'
                            disabled={true}
                            value={codeTransfer}
                            onChange={handleInputCodeTransfer} />
                                <FontAwesomeIcon onClick={generateCodeTrans}  icon={faEdit} style={{
                            color: '#a32a29',
                            fontSize: '1.5rem'
                        }} />
                    </div> 

                    <div className='form_element'>
                        <input
                            type="number"
                            placeholder='Max Amount'
                            value={amountLimit}
                            onChange={handleInputMaxAmount} />
                    </div>

                    <div className="form_element">
                        <select value={currency}
                            onChange={handleInputCurrency}>
                                 <option key="0" value=''>Currency</option>
                            {showCurrencies(wallet)}
                        </select>
                    </div>

        
                    <button type="submit" >Save</button>

    
                </form>
            </div>

        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(GenerateCode);