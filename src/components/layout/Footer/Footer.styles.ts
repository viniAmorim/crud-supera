import styled from 'styled-components';

export const FooterWrapper = styled.div`
  background-color: #333;
  color: #fff;
  padding: 0.5em;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const SocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 1em;
`;

export const SocialIcon = styled.li`
  margin: 0 1em;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #fe7e00;
  }
`;

export const FooterText = styled.span`
  font-weight: bold;
  color: #fe7e00;
`;
