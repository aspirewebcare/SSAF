import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App';

const useAuth = () => {
    const [loggedUser, setLoggedUser] = useContext(AuthContext);

    const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))

    let isLogIn = (loggedUser?.jwt_token && loggedUser?.user_uid) || (userData?.jwt_token && userData?.user_uid)

    useEffect(() => {
        setLoggedUser(userData)
    }, [])

    return isLogIn
}

const PrivateRoute = () => {
    const auth = useAuth()
    const { pathname } = useLocation();


    return auth ? <Outlet /> : <Navigate to={'/login'} state={{ prevPath: pathname }} />
}


export default PrivateRoute;