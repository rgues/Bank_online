import axios from 'axios';
import { URL } from '../config';
import { ARCHIVE_TRANSACTION, 
         CLEAR_GET_USER, 
         CLEAR_HEADER_NAV, 
         CLEAR_PASSWORD, 
         CLEAR_REGISTER_AND_UPDATE, 
         CLEAR_TRANSACTION, 
         CONFIRM_TRANSACTION, 
         CREDIT_WALLET, 
         GET_CURRENCIES, 
         GET_HEADER_NAV, 
         GET_PAYMENTS, 
         GET_ROLES, 
         GET_TRANSACTIONS, 
         GET_USER, 
         GET_USERS, 
         GET_USER_WALLET, 
         GET_WALLET_TRANSACTIONS, 
         LOGIN_USER, 
         UPDATE_PASSWORD, 
         USER_ARCHIVE, 
         USER_AUTH, 
         USER_DISABLE, 
         USER_ENABLE, 
         USER_REGISTER_USER, 
         USER_UPDATE_USER } from './types';

/*========= User ACTION ==================*/

export function getHideHeader(state) {

    return {
        type: GET_HEADER_NAV,
        payload: {hideHedear:state }
    }
}

export function clearHideHeader() {

    return {
        type: CLEAR_HEADER_NAV,
        payload: {hideHedear:false}
    }
}

export function loginUser(data) {

    const request = axios.post(`${URL}/api/login`,data)
    .then(response => response.data)
    .catch(err => {
       // console.log(err);
    });

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function updatePassword(data) {

    const request = axios.post(`${URL}/api/update/password`,data)
    .then(response => response.data)
    .catch(err => {
       // console.log(err);
    });

    return {
        type: UPDATE_PASSWORD,
        payload: request
    }
}

export function clearPassword() {

    return {
        type: CLEAR_PASSWORD,
        payload: {}
    }
}

export function getRoles() {

    const request = axios.get(`${URL}/api/user/role`)
    .then(response => response.data)
    .catch(err => []
    );

    return {
        type: GET_ROLES,
        payload: request
    }
}

export function auth () {

    const request = axios.get(`${URL}/api/auth`)
    .then(response => response.data)
    .catch(err => {
        //console.log(err);
    });

    return {
        type: USER_AUTH,
        payload:request
    }
}

export function getUserDetail(id) {

    const request = axios.get(`${URL}/api/user?id=${id}`)
    .then(response => response.data)
    .catch(err => [])

return {
type: GET_USER,
payload: request
}

}

export function clearUser() {

    return {
        type: CLEAR_GET_USER,
        payload: null
    }
}


export function getUsers(limit = 10, start = 0, order = 'DESC', list = '') {

    const request = axios.get(`${URL}/api/users?skip=${start}&limit=${limit}&order=${order}`)
                    .then(response => {
                        if (list) {
                            return {users: [...list,...response.data.users],
                                    nbusers:response.data.nbusers
                            };
                        } else {
                            return {users:response.data.users, nbusers:response.data.nbusers};
                        }
                    }).catch(err => [])

    return {
        type: GET_USERS,
        payload: request
    }
}

export function getWalletTransaction(limit = 10, start = 0, order = 'DESC', list = '') {

    const request = axios.get(`${URL}/api/wallet/transaction?skip=${start}&limit=${limit}&order=${order}`)
                    .then(response => {
                        if (list) {
                            return {transaction :[...list,...response.data.transaction], nbtrans: response.data.nbtrans };
                        } else {
                            return {transaction:response.data.transaction,nbtrans:response.data.nbtrans};
                        }
                    }).catch(err => [])

    return {
        type: GET_WALLET_TRANSACTIONS,
        payload: request
    }
}


export function getTransaction(limit = 10, start = 0, order = 'DESC', list = '') {

    const request = axios.get(`${URL}/api/transaction/admin?skip=${start}&limit=${limit}&order=${order}`)
                    .then(response => {
                       
                        if (list) {
                            return {transaction :[...list,...response.data.transaction], nbtrans: response.data.nbtrans };
                        } else {
                            return {transaction:response.data.transaction,nbtrans:response.data.nbtrans};
                        }
                    }).catch(err => [])

    return {
        type: GET_TRANSACTIONS,
        payload: request
    }
}

export function getUserWallet() {

    const request = axios.get(`${URL}/api/user/wallets`)
    .then(response =>  response.data)
    .catch(err => [])

    return {
            type: GET_USER_WALLET,
            payload: request
    }
}

export function confirmTransaction (id,transactionsList) {

    const request = axios.get(`${URL}/api/transaction/confirm?id=${id}`)
   
    return (dispatch) => {

            request.then(({data}) => {

                let transactions = transactionsList;
                
                if (data.transaction) {
                   const newList = transactionsList.filter(item => item.id !== data.transaction.id)
                   transactions = [...newList,data.transaction]
                }
            
                let response = {
                    success: data.success,
                    transactions
                }

                dispatch({
                    type: CONFIRM_TRANSACTION,
                    payload:response
                })

            }).catch(err => {
                //console.log(err);
            });
       
    }
}

export function archiveTransaction (id,transactionsList) {

    const request = axios.get(`${URL}/api/transaction/archive?id=${id}`)
   
    return (dispatch) => {

            request.then(({data}) => {

                let transactions = transactionsList;
                
                if (data.transaction) {
                   const newList = transactionsList.filter(item => item.id !== data.transaction.id)
                   transactions = [...newList]
                }
            
                let response = {
                    success: data.success,
                    transactions
                }

                dispatch({
                    type: ARCHIVE_TRANSACTION,
                    payload:response
                })

            }).catch(err => {
                //console.log(err);
            });
       
    }
}

export function getCurrencies(order = 'ASC') {

    const request = axios.get(`${URL}/api/wallet/currencies?order=${order}`)
                    .then( response => response.data)
                    .catch(err => [])

    return {
        type: GET_CURRENCIES,
        payload: request
    }
}

export function getPayments(order = 'ASC') {

    const request = axios.get(`${URL}/api/wallet/payment?order=${order}`)
                    .then( response => response.data)
                    .catch(err => [])

    return {
        type: GET_PAYMENTS,
        payload: request
    }
}

export function creditWallet(transaction) {

    const request = axios.post(`${URL}/api/wallet/credit`,transaction)
                    .then(response => response.data)
                    .catch(err => err.response.data);

    return {
        type: CREDIT_WALLET,
        payload: request
    }
}

export function clearWallet() {

    return {
        type: CLEAR_TRANSACTION,
        payload: {}
    }
}

export function userRegister (user,userList) {

    const request = axios.post(`${URL}/api/register`,user)
   
    return (dispatch) => {

            request.then(({data}) => {

                let response = {
                    success: data.success,
                    users: data.user ? [...userList,data.user] : userList,
                    message: data.message ? data.message: null
                }

                dispatch({
                    type: USER_REGISTER_USER,
                    payload:response
                })

            }).catch(err =>{
                    // console.log(err);
                    dispatch({
                        type: USER_REGISTER_USER,
                        payload:err.response.data
                    })
              
            })
       
    }
}

export function userUpdate (user,userList) {

    const request = axios.post(`${URL}/api/user/update`,user)
   
    return (dispatch) => {

            request.then(({data}) => {

                const newList =  userList.filter(item => item.id === user.id);
              
                let response = {
                    success: data.success,
                    users: data.user ? [...newList,data.user] : userList,
                    message: data.message ? data.message: null
                }

                dispatch({
                    type: USER_UPDATE_USER,
                    payload:response
                })

            }).catch(err =>{
               
                if (err && err.status === 400){
                    dispatch({
                        type: USER_UPDATE_USER,
                        payload:err.response.data
                    })
                } else {
                   // console.log(err);
                }
            })
       
    }
}

export function clearRegisterAndUpdate() {

    return {
        type: CLEAR_REGISTER_AND_UPDATE,
        payload: {register:null, message:null }
    }
}

export function enableStatus (id,userList) {

    const request = axios.get(`${URL}/api/user/enable?id=${id}`)
   
    return (dispatch) => {

            request.then(({data}) => {
                let users = userList;
                
                if (data.user) {
                   const newList = userList.filter(item => item.id !== data.user.id)
                    users = [...newList,data.user]
                }
            
                let response = {
                    success: data.success,
                    users
                }
                dispatch({
                    type: USER_ENABLE,
                    payload:response
                })

            }).catch(err => {
                // console.log(err)
            })
       
    }
}

export function disableStatus (id,userList) {

    const request = axios.get(`${URL}/api/user/disable?id=${id}`)
   
    return (dispatch) => {

            request.then(({data}) => {
                let users = userList;

                if (data.user) {
                   const newList = userList.filter(item => item.id !== data.user.id)
                    users = [...newList,data.user]
                }
            
                let response = {
                    success: data.success,
                    users
                }

                dispatch({
                    type: USER_DISABLE,
                    payload:response
                })
            }).catch(err => { 
                //console.log(err)
            })
    }
}


export function archiveUser (id,userList) {

    const request = axios.get(`${URL}/api/user/archive?id=${id}`)
   
    return (dispatch) => {

            request.then(({data}) => {
                let users = userList;
                
                if (data.user) {
                   const newList = userList.filter(item => item.id !== data.user.id)
                    users = [...newList]
                }
            
                let response = {
                    success: data.success,
                    users
                }
                dispatch({
                    type: USER_ARCHIVE,
                    payload:response
                })

            }).catch(err => {
                // console.log(err)
            })
       
    }
}
