'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[8]};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.base};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;


const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: '🐙',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: '🐦',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: '💼',
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: '✉️',
  },
];

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Thanks for stopping by! Let&apos;s build something amazing together.
        </FooterText>
        
        <SocialLinks>
          {socialLinks.map((link) => (
            <SocialLink
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={link.name}
            >
              <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
            </SocialLink>
          ))}
        </SocialLinks>

        <Copyright>
          @ No copyrights
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
} 