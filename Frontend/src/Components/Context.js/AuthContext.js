import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // In a real app, you would fetch the user from an API after login.
    // For this example, we'll simulate a logged-in user.
    // You can change the role here to 'analyst' to test.
    const [user, setUser] = useState({
        name: 'Admin User',
        role: 'admin', // <-- CHANGE TO 'analyst' TO SEE THE OTHER SIDEBAR
    });

    // You would have login/logout functions here to set the user state
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
