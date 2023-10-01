import { Link, useNavigate } from 'react-router-dom';

import {NavbarWrapper, StyledButton} from './Navbar.styles';

function Navbar() {
  const navigate = useNavigate()
  return (
    <NavbarWrapper>
      <nav>
        <Link to="/"><img src={"/images/logo.svg"} alt="welcome" /></Link>
        <ul>
          <li><StyledButton onClick={() => navigate('/add-user')}>ADD USER</StyledButton></li>
        </ul>
      </nav>
    </NavbarWrapper>
  )
}

export default Navbar;


        
       
       