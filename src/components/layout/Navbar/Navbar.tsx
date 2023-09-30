import React from 'react';
import { Link } from 'react-router-dom';

import {NavbarWrapper} from './Navbar.styles';

function Navbar() {
  return (
    <NavbarWrapper>
      <nav>
        <Link to="/"><img src={"/images/logo.svg"} alt="welcome" /></Link>
        <ul>
          <li><Link to="/users-list">ADD USERS</Link></li>
        </ul>
      </nav>
    </NavbarWrapper>
  )
}

export default Navbar;


        
       
       