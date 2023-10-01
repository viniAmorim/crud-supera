import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  background-color: #333; 
  color: #fff; 
  padding: 10px 0; 
  width: 100%; 
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    width: 100%;
    max-width: 1200px; 
    margin: 0 auto; 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #fff; 
    font-weight: bold;
    margin-right: 20px; 
  }

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }

  li {
    margin-right: 20px;
  }
`;

export const StyledButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fe7e00;
  }
`;
