import { ARCHIVE_TRANSACTION, 
         CLEAR_TRANSACTION, 
         CONFIRM_TRANSACTION, 
         CREDIT_WALLET, 
         GET_CURRENCIES, 
         GET_PAYMENTS, 
         GET_TRANSACTIONS, 
         GET_USER_WALLET, 
         GET_WALLET_TRANSACTIONS } from "../actions/types";

const walletReducer = (state = {}, action) => {

    switch (action.type) { 

        case GET_CURRENCIES:
            return { ...state, currencies:action.payload};

        case GET_PAYMENTS:
            return { ...state, payments:action.payload}; 
        
        case CREDIT_WALLET:
            return { ...state, credit:action.payload};

        case CLEAR_TRANSACTION:
            return { ...state, credit:action.payload}; 

        case GET_WALLET_TRANSACTIONS:
            return { ...state, wallet:action.payload.transaction,nbtrans:action.payload.nbtrans};
        
        case GET_TRANSACTIONS:
            return { ...state, transactions:action.payload.transaction,nbtrans:action.payload.nbtrans};

        case GET_USER_WALLET:
            return { ...state, myWallet:action.payload};
        
        case CONFIRM_TRANSACTION:
            return { ...state, confirm:action.payload.success, transactions: action.payload.transactions};

        case ARCHIVE_TRANSACTION:
            return { ...state, confirm:action.payload.success, transactions: action.payload.transactions};

        default:
            return state;
    }
}

export default walletReducer; 