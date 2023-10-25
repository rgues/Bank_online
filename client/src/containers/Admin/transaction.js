import moment from 'moment-js';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransaction, confirmTransaction,archiveTransaction,  getCurrencies } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowDown, faRemove} from '@fortawesome/free-solid-svg-icons';

const Transaction = ({ user,wallet, showMore, dispatch }) => {

    useEffect(() => {
        dispatch(getTransaction());
        dispatch(getCurrencies());
    }, [dispatch]);

    const loadmore = () => {
        const nbTransaction = wallet.transactions.length;
        dispatch(getTransaction(1,nbTransaction,'DESC',wallet.transactions));
    }

    const confirm = (transaction) => {
        dispatch(confirmTransaction(transaction.id, wallet.transactions.length ? wallet.transactions : []));
    }
    const archive = (transaction) => {
        dispatch(archiveTransaction(transaction.id, wallet.transactions.length ? wallet.transactions : []));
    }

    const currencyName = (currency) => {
        const data = wallet && wallet.currencies && wallet.currencies.length ?
        wallet.currencies.find(item => item.id === currency) : null;
        return data ? data.code : null;
    }

    const showWalletTransaction = (wallet) => (
        wallet && wallet.transactions && wallet.transactions.length ?
        wallet.transactions.map((item,i) => (
                item ? <tr key={i}>
                    <td>{item.reference}</td>
                    <td>{item.type}</td>
                    <td>{item.amount_paid}</td>
                    <td>{currencyName(item.currency_paid)}</td>
                    <td>{item.purpose}</td>
                    <td>{item.remark}</td>
                    <td>{item.receiver_message}</td>
                    <td>{item.status}</td>
                    <td>{moment(item.transaction_date).format('MM-DD-YY:hh-mm')}</td>
                    <td>
                        {item.confirm === 1 ? <button className='confirm'>Ok</button> : ''}
                        {item.confirm === 0 ? user.login.role === 'admin' ? <button onClick={() => confirm(item)} >No</button> : 'No' : ''}
                 </td>
                 <td>
                 {item.archive === 0 &&  user.login.role === 'admin' ? <button onClick={() => archive(item)} >
                        <FontAwesomeIcon icon={faRemove}  style={{
                            color:'#fff',
                            fontSize:'20px'
                        }}/>
                        </button>  : ''}
                    </td>
                </tr> :
                    null
            ))
            : null
    )

    return (

        <div>
            {wallet && wallet.transactions && wallet.transactions.length ?

                <div className='current_users'>
                    <h2>Transactions</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Purpose</th>
                                <th>Remark</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Confirm</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showWalletTransaction(wallet)}
                        </tbody>
                       
                    </table>
                </div>
             
                : null
            }

           
            {showMore && wallet && wallet.transactions && wallet.transactions.length && wallet.transactions.length < wallet.nbtrans &&
                        <div className='loadmore' onClick={loadmore}>
                        <FontAwesomeIcon icon={faArrowDown}  style={{
                            color:'#fff',
                            fontSize:'20px'
                        }}/>
                    </div>
            }
              
        </div>

    );
 }
    const mapStateToProps = (state) => {   
        return {
            wallet: state.wallet,
            user: state.user
        }
    }

    export default connect(mapStateToProps)(Transaction);