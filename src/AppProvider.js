import React, { useContext, useReducer } from "react";
const AppContext = React.createContext();

const useAppContext = () => {
    return useContext(AppContext);
}

const initialstate = {
    usuario: {},
    userState: false,
    primerLogin: false,
    tickets:[]
}
const reducer = (state, action) => {
    switch (action.type) {

        case 'ESTADO-USUARIO':
            return {
                ...state,
                userState: action.value.login

            }
        case 'LOGOUT':
            return {
                ...state,
                userState: action.value.login

            }
        case 'SETUSER':
            return {
                ...state,
                usuario: action.value.usr
            }
        case 'PRIMER-LOGIN':
            return {
                ...state,
                primerLogin: action.value.firsLogin
            }

    }

    return state;
}


const AppProvider = ({ children }) => {
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(reducer, initialstate)
    return (
        <AppContext.Provider value={{
            sms: state.mensaje,
            usuario: state.usuario,
            userState: state.userState,
            primerLogin:state.primerLogin,
            dispatch
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider,
    useAppContext,
}