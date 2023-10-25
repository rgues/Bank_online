import { CLEAR_GET_USER, 
         CLEAR_HEADER_NAV, 
         CLEAR_PASSWORD, 
         CLEAR_REGISTER_AND_UPDATE, 
         GET_HEADER_NAV, 
         GET_ROLES, 
         GET_USER, 
         GET_USERS, 
         LOGIN_USER, 
         UPDATE_PASSWORD, 
         USER_ARCHIVE, 
         USER_AUTH, 
         USER_DISABLE, 
         USER_ENABLE, 
         USER_REGISTER_USER, 
         USER_UPDATE_USER } from '../actions/types';

const userReducer = (state = {}, action) => {

    switch (action.type) { 

        case LOGIN_USER:
            return { ...state, login: action.payload };
        
        case UPDATE_PASSWORD:
            return { ...state, update: action.payload };

        case CLEAR_PASSWORD:
            return { ...state, update: action.payload };

        case USER_AUTH:
            return { ...state, login: action.payload };

        case GET_USERS:
            return { ...state, users: action.payload.users, nbusers: action.payload.nbusers };

        case GET_USER:
            return { ...state, current_user: action.payload };

        case CLEAR_GET_USER:
                return { ...state, current_user: action.payload };

        case USER_REGISTER_USER:
            return { ...state, register: action.payload.success,message: action.payload.message, users: action.payload.users };

        case USER_UPDATE_USER:
            return { ...state, register: action.payload.success,message: action.payload.message, users: action.payload.users };

        case CLEAR_REGISTER_AND_UPDATE:
            return {...state, register: action.payload.register, message: action.payload.message}
            
        case USER_ENABLE:
            return { ...state, register: action.payload.success, users: action.payload.users };

        case USER_DISABLE:
            return { ...state, register: action.payload.success, users: action.payload.users };
        
        case USER_ARCHIVE:
            return { ...state, register: action.payload.success, users: action.payload.users };

        case GET_ROLES:
            return { ...state, roles:action.payload};

        case GET_HEADER_NAV:
            return { ...state, hideHedear:action.payload.hideHedear};

        case CLEAR_HEADER_NAV:
            return { ...state, hideHedear:action.payload.hideHedear};

        default:
            return state;
    }
}

export default userReducer; 