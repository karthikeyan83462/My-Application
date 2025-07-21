'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/common/store';
import { fetchBlogPosts } from '../redux/blogPosts/blogPostsSlice';
import { fetchProjects } from '../redux/projects/projectsSlice';
import type { BlogPost } from '../redux/blogPosts/payloadTypes';
import type { Project } from '../redux/projects/payloadTypes';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items: blogPosts, loading: loadingPosts, error: errorPosts } = useAppSelector(state => state.blogPosts);
  const { items: projects, loading: loadingProjects, error: errorProjects } = useAppSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchBlogPosts());
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <>
      <HeroSection>
        <MotionDiv {...fadeUp()}>
          👋 Hello, I&apos;m Karthikeyan
        </MotionDiv>

        <MotionH1 {...fadeUp(0.1)}>
          I build delightful digital experiences
        </MotionH1>

        <MotionP {...fadeUp(0.2)}>
          Full-stack developer passionate about solving problems and turning ideas into real products.
          I care about performance, clean design, and making the web better for users. I also write about
          web development, UI, and software engineering.
        </MotionP>

        <CTAContainer {...fadeUp(0.3)}>
          <StyledLink href="/blog">
            <GlassyButton $variant="primary">Read My Blog</GlassyButton>
          </StyledLink>
          <StyledLink href="/projects">
            <GlassyButton>View Projects</GlassyButton>
          </StyledLink>
        </CTAContainer>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle {...fadeUp()}>Featured Blog Posts</SectionTitle>
          <FeaturedGrid>
            {loadingPosts && <p>Loading...</p>}
            {errorPosts && <p style={{ color: 'red' }}>Error: {errorPosts}</p>}
            {blogPosts.map((post: BlogPost, index: number) => (
              <PostCard key={post.id} {...fadeUp(index * 0.1)} href={post.href}>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <CardMeta>
                  <span>{formatDate(post.date)}</span>
                  <TagList>
                    {post.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                  </TagList>
                </CardMeta>
              </PostCard>
            ))}
          </FeaturedGrid>

          <SectionTitle {...fadeUp()}>Featured Projects</SectionTitle>
          <FeaturedGrid>
            {loadingProjects && <p>Loading...</p>}
            {errorProjects && <p style={{ color: 'red' }}>Error: {errorProjects}</p>}
            {projects.map((project: Project, index: number) => (
              <PostCard key={project.id} {...fadeUp(index * 0.1)} href={project.href}>
                {project.image && <span style={{ fontSize: '2rem' }}>{project.image}</span>}
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                {project.category && <div style={{ fontStyle: 'italic', color: '#888', marginBottom: 4 }}>Category: {project.category}</div>}
                <TagList>
                  {project.tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
                </TagList>
                <div style={{ marginTop: 8 }}>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>Live</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
              </PostCard>
            ))}
          </FeaturedGrid>
        </Container>
      </Section>
    </>
  );
}

// Motion Elements
const MotionDiv = styled(motion.div)``;
const MotionH1 = styled(motion.h1)``;
const MotionP = styled(motion.p)``;
const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// Layout Sections
const HeroSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing[20]} 0 ${theme.spacing[16]}`};
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.spacing[6]};
  padding-right: ${({ theme }) => theme.spacing[6]};
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// Reusable Glassy Button
const GlassyButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: rgba(96, 165, 250, 0.18);
        color: ${theme.colors.primary};
        &:hover {
          background: rgba(96, 165, 250, 0.28);
          color: #fff;
          border-color: ${theme.colors.primary};
          transform: translateY(-2px) scale(1.03);
        }
      `
      : `
        background: rgba(255, 255, 255, 0.15);
        color: ${theme.colors.text.primary};
        &:hover {
          background: rgba(255, 255, 255, 0.25);
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          transform: translateY(-2px) scale(1.03);
        }
      `}
`;

// Section Background
const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

// Frosted Glass Post/Project Card
const PostCard = styled(motion.a)`
  display: block;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

// Glassy Tag (Now Dark Mode Safe)
const Tag = styled.span`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.2);

  color: ${({ theme }) => theme.colors.primary};
  background: rgba(96, 165, 250, 0.12);

  @media (prefers-color-scheme: dark) {
    background: rgba(96, 165, 250, 0.18);
    color: ${({ theme }) => theme.colors.primary};
  }
`;
