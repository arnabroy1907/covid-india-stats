import React from 'react';
import st from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBar = st.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 1rem;
    border-bottom: solid 1px #225599ff;
    background-color: #22559911;
`;

const NavLinks = st(NavLink)`
    text-decoration: none;
    cursor: pointer;
    color: #225599aa;
    font-weight: 700;
    font-size: 20px;
    margin-right: 1rem;
    &:hover {
        color: #225599ff;
    }
    &.active {
        color: #225599ff;
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
