import { Flex, SystemStyleObject } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';

export const Navbar = () => {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      backgroundColor: '#333',
      color: '#fff',
      padding: '0.625rem 0',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nav: {
      width: '100%',
      maxWidth: '75rem', 
      margin: '0 auto', 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ul: {
      listStyle: 'none',
      display: 'flex',
      padding: 0,
      margin: 0,
    },
    li: {
      marginRight: '1.25rem',
    },
    navButton: {
      backgroundColor: 'black',
      color: 'white',
      padding: '0.625rem 3.75rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#fe7e00',
      }
    }
  }
  const navigate = useNavigate();
  return (
    <Flex sx={styles?.wrapper}>
      <Flex sx={styles?.nav}>
        <Link to="/"><img src={"/images/logo.svg"} alt="welcome" /></Link>
        <Flex sx={styles?.ul}>
          <Flex sx={styles?.li}><Flex sx={styles?.navButton} onClick={() => navigate(ROUTES.registerUser)}>ADD USER</Flex></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}


