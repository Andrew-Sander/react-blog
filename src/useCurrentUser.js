// useCurrentUser.js
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching current user', error);
            }
        };
        checkUser();
    }, []);

    return currentUser;
};

export default useCurrentUser;
