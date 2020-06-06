import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { ReactComponent as LogoSvg } from '../assets/sweet-treats-logo.svg';

function Navbar({ auth, handleLogout }) {
    return (
        <NavbarContainer>
            <div>
                <Link to="/">
                    <LogoSvg />
                </Link>
            </div>
            <div>
                <NavList>
                    { auth
                        ?
                            <>
                                <NavItem>
                                    <Link to="/settings">
                                        Settings
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/my-products">
                                        My Products
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <button type="button" onClick={() => handleLogout()}>Log out</button>
                                </NavItem>
                            </>
                        :
                            <>
                                <NavItem>
                                    <Link to="/signup">
                                        <p>Sign up</p>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login">
                                        <p>Log in</p>
                                    </Link>
                                </NavItem>
                            </>
                    }
                </NavList>
            </div>
        </NavbarContainer>
    );
}

export default Navbar;

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    a {
        color: black;
        text-decoration: none;
    }
    h1 {
        margin: 1rem;
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    margin: 1rem;
`;