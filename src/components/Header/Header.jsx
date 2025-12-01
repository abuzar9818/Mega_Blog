import React from "react";
import { Link } from "react-router-dom";
import {Container,Logo, LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    
    return (
        <header className="py-4 px-0 shadow-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-md">

            <Container>
                <nav className='flex items-center justify-between gap-6'>
                    <div className='flex-shrink-0 py-1'>
                        <Link to='/' className="block hover:opacity-90 transition-opacity duration-200">
                            <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className='flex items-center gap-2.5 ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-5 py-2.5 text-sm font-semibold rounded-lg bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-white/20 active:translate-y-0 whitespace-nowrap'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className="ml-1">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
