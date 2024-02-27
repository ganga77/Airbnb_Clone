import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({
    user: null,
    ready: false,
});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:4000/profile', {
                    credentials: 'include',
                });
        
                if (!response.ok) {
                    console.error('Error fetching user data. Server response:', response);
                    setUser(null); // Set user to null in case of errors
                } else {
                    const userInfo = await response.json();
                    console.log('User Info:', userInfo);
                    setUser(userInfo);
                }
        
                setReady(true);
            } catch (error) {
                console.error('Error in fetchUserData:', error);
                setUser(null);
                setReady(true);
            }
        };
        

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
