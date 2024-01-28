import { ARCHIVE_TRANSACTION, 
         CLEAR_TRANSACTION, 
         CONFIRM_TRANSACTION, 
         CREDIT_WALLET, 
         GENERATE_CODE, 
         DELETE_CODE, 
         GET_CODES, 
         GET_CURRENCIES, 
         GET_PAYMENTS, 
         GET_TRANSACTIONS, 
         GET_USER_WALLET, 
         GET_WALLET_TRANSACTIONS, 
         CLEAR_GENERATE_CODE,
         CHECK_CODE,
         CLEAR_CHECK_CODE,
         SAVE_TRANSFER,
         CLEAR_TRANSFER} from "../actions/types";

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
            
        case GENERATE_CODE:
            return { ...state, code:action.payload.code, code_success:action.payload.success }; 

        case CLEAR_GENERATE_CODE:
            return { ...state, code:action.payload.code, code_success:action.payload.success }; 

        case CHECK_CODE:
            return { ...state, checkcode:action.payload }; 

        case CLEAR_CHECK_CODE:
            return { ...state, checkcode:action.payload }; 

        case SAVE_TRANSFER:
            return { ...state, debit:action.payload};
        
        case CLEAR_TRANSFER:
            return { ...state, debit:action.payload};

        case DELETE_CODE:
            return { ...state, codes:action.payload.codes, nbCodes:action.payload.nbCodes }; 

        case GET_WALLET_TRANSACTIONS:
            return { ...state, wallet:action.payload.transaction,nbtrans:action.payload.nbtrans};
        
        case GET_TRANSACTIONS:
            return { ...state, transactions:action.payload.transaction,nbtrans:action.payload.nbtrans};

        case GET_USER_WALLET:
            return { ...state, myWallet:action.payload};

        case GET_CODES:
            return { ...state, codes:action.payload.codes, nbCodes: action.payload.nbCodes};
        
        case CONFIRM_TRANSACTION:
            return { ...state, confirm:action.payload.success, transactions: action.payload.transactions};

        case ARCHIVE_TRANSACTION:
            return { ...state, confirm:action.payload.success, transactions: action.payload.transactions};

        default:
            return state;
    }
}

export default walletReducer; 