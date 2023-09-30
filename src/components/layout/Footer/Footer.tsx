import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import {
  FooterWrapper,
  SocialIcons,
  SocialIcon,
  FooterText,
} from './Footer.styles';

function Footer() {
  return (
    <FooterWrapper>
      <footer>
        <SocialIcons>
          <SocialIcon><FaFacebook /></SocialIcon>
          <SocialIcon><FaInstagram /></SocialIcon>
          <SocialIcon><FaLinkedin /></SocialIcon>
        </SocialIcons>
        <FooterText>CRUD</FooterText>
      </footer>
    </FooterWrapper>
  )
}

export default Footer;
