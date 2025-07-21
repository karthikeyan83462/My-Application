import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;  
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[6]};
  position: relative;
  overflow: hidden;
`;

const AnimatedBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at 60% 40%, ${({ theme }) => theme.colors.primary}22 0%, transparent 70%),
    radial-gradient(circle at 30% 70%, ${({ theme }) => theme.colors.secondary}22 0%, transparent 80%);
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
  z-index: 1;
  position: relative;
`;

const Astronaut = styled(motion.span)`
  font-size: 10rem;
  display: inline-block;
`;

const NotFoundSubtitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const NotFoundDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  line-height: 1.6;
`;

const NotFoundActions = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button) <{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  border: 2px solid transparent;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: ${theme.colors.primary};
        color: white;
        box-shadow: ${theme.shadows.md};
        
        &:hover {
          background: ${theme.colors.primaryHover};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.lg};
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.text.primary};
        border-color: ${theme.colors.border};
        
        &:hover {
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          transform: translateY(-2px);
        }
      `
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <AnimatedBg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <NotFoundContent>
        <Astronaut
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          role="img"
          aria-label="astronaut"
        >
          🚀
        </Astronaut>
        <NotFoundSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Lost in Space!
        </NotFoundSubtitle>
        <NotFoundDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The page you&apos;re looking for drifted off into the cosmic void. But don&apos;t worry, you can always return to safety!
        </NotFoundDescription>
        <NotFoundActions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/" passHref>
            <ActionButton $variant="primary">
              🏠 Go Home
            </ActionButton>
          </Link>
          <Link href="/blog" passHref>
            <ActionButton>
              📝 Read Blog
            </ActionButton>
          </Link>
        </NotFoundActions>
      </NotFoundContent>
    </NotFoundContainer>
  );
} 