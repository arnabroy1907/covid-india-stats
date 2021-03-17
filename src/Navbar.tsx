import React from 'react';
import st from 'styled-components';
import { NavLink } from 'react-router-dom';
import covidLogo from './assets/covid.png';

const NavBar = st.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #000;
    box-shadow 0 2px 6px #000;
    z-index: 1;
    background-color: #222;
`;

const NavLinks = st(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    height: 3rem;
    padding: 0 1rem;
    &:hover {
        color: #000;
        background-color: #fff;
    }
    &.active {
        color: #000;
        background-color: #fff;
    }
`; 

const LogoWrapper = st(NavLink)`
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    margin-right: 1.5rem;
    img {
        width: 2.5rem;
    }
`;

export const Navbar = () => {
    return (
        <NavBar>
            <LogoWrapper exact to='/'>
                <img alt='covid-logo' src={covidLogo} />
            </LogoWrapper>
            <NavLinks exact to='/'>WORLD</NavLinks>
            <NavLinks to='/india'>INDIA</NavLinks>
        </NavBar>
    )
};
