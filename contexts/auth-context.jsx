import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user ,setUser ] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        AsyncStorage.setItem('authToken', userData.token);
    };
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        AsyncStorage.removeItem('authToken');
    };
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export default AuthContext;