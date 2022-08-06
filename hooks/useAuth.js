import { useReducer, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
    const [stateAuth, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
    
                case 'SIGN_IN':
                return {
                    isAuth: true,
                    token: action.token,
                };
    
                case 'SIGN_OUT':
                AsyncStorage.clear();
                return {
                    isAuth: false,
                    token: null,
                };
            }
        },
        {
            isAuth: false,
            token: null,
        }
    );
    
    const authActions = useMemo(() => ({
        signIn: async (data) => {
            dispatch({ type: 'SIGN_IN', token: data });
        },
        signOut: () => {
            dispatch({ type: 'SIGN_OUT' })
        },
    }), []);

    return [ stateAuth, authActions];
}

