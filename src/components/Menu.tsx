import { motion } from 'framer-motion';
import styled from "styled-components"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeMode } from './ThemeContext';
import { useState, useEffect } from 'react';


const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Menu() {
    const pathname = usePathname();
    const { mode, toggle } = useThemeMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <NavLinks>
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} passHref>
                        <NavLink
                            $active={pathname === item.href}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item.name}
                        </NavLink>
                    </Link>
                ))}
                <ThemeSwitchButton onClick={toggle} aria-label="Toggle dark mode">
                    {mode === 'dark' ? '🌞' : '🌙'}
                </ThemeSwitchButton>
            </NavLinks>
            {isMobileMenuOpen && (
                <MobileMenu
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {navItems.map((item, index) => (
                        <Link key={item.name} href={item.href} passHref>
                            <MobileNavLink
                                $active={pathname === item.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </MobileNavLink>
                        </Link>
                    ))}
                    <ThemeSwitchButton onClick={toggle} aria-label="Toggle dark mode">
                        {mode === 'dark' ? '🌞' : '🌙'}
                    </ThemeSwitchButton>
                </MobileMenu>
            )}
        </>
    )
}



const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  z-index: 100;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavLink = styled(motion.div) <{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text.primary)};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;


const MenuContainer = styled(motion.div)`
    width: 120px;
    height: 50px;
    background-color: #4952B0;
    border-radius: 10000px;
    margin-right: 100px;
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
`

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;


const NavLink = styled(motion.div) <{ $active: boolean }>`
  position: relative;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text.secondary)};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;


const ThemeSwitchButton = styled.button`
  margin-left: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;
