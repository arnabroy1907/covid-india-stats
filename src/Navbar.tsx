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
    border-bottom: solid 1px #2f8da7ff;
    box-shadow 0 -2px 5px #222;
    z-index: 1;
    background-color: #fff;
`;

const NavLinks = st(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: #2f8da7aa;
    font-weight: 700;
    font-size: 20px;
    height: 3rem;
    padding: 0 1rem;
    &:hover {
        color: #fff;
        background-color: #2f8da7ff;
    }
    &.active {
        color: #fff;
        background-color: #2f8da7ff;
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
            <NavLinks exact to='/india'>INDIA</NavLinks>
        </NavBar>
    )
};
