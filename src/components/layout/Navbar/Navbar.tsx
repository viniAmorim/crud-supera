import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { NavbarWrapper, StyledButton } from './Navbar.styles';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavbarWrapper>
      <nav>
        <Link to="/"><img src={"/images/logo.svg"} alt="welcome" /></Link>
        <ul>
          <li><StyledButton onClick={() => navigate(routes.REGISTER)}>ADD USER</StyledButton></li>
        </ul>
      </nav>
    </NavbarWrapper>
  );
}

export default Navbar
