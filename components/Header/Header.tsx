'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    document.documentElement.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Nav>
        <Link href="/" passHref>
          <Logo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Karthikeyan A
          </Logo>
        </Link>

        <Spacer />
        <Menu/>
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuLine $isOpen={isMobileMenuOpen} />
          <MenuLine $isOpen={isMobileMenuOpen} />
          <MenuLine $isOpen={isMobileMenuOpen} />
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
}

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 110;
  height: 80px;
  padding: 0;
  transition: background 0.3s, border 0.3s, top 0.3s, backdrop-filter 0.3s;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0 1.5rem 1.5rem;
  /* Always stick to top for mobile, ignore scroll offset */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 0;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: none;
    border-radius: 0;
  }
`;


const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Logo = styled(motion.div)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;


const MenuLine = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.base};
  transform-origin: center;

  &:nth-child(1) {
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none')};
  }

  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none')};
  }
`;


