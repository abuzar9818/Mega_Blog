import React from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        AuthService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            type="button"
            onClick={handleLogout}
            className="inline-block px-6 py-2.5 text-sm font-semibold duration-200 rounded-lg bg-red-500/20 text-white hover:bg-red-500/30 hover:scale-105 transition-all border border-red-500/30 hover:border-red-500/50 hover:shadow-lg active:scale-100"
        >
            Logout
        </button>
    )
}

export default LogoutBtn