import React from 'react';
import st from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBar = st.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    border-bottom: solid 1px #2f8da7ff;
    box-shadow 0 -2px 5px #222;
    z-index: 1;
    background-color: #fff;
`;

const NavLinks = st(NavLink)`
    text-decoration: none;
    cursor: pointer;
    color: #2f8da7aa;
    font-weight: 700;
    font-size: 20px;
    padding: 1rem;
    &:hover {
        color: #fff;
        background-color: #2f8da7ff;
    }
    &.active {
        color: #fff;
        background-color: #2f8da7ff;
    }
`; 

export const Navbar = () => {
    return (
        <NavBar>
            <NavLinks exact to='/'>WORLD</NavLinks>
            <NavLinks exact to='/india'>INDIA</NavLinks>
        </NavBar>
    )
};
