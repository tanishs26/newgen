import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login');
        } else if (!authentication && authStatus) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [authentication, authStatus, navigate]);

    return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
