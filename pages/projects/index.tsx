import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { fetchProjects } from '../../redux/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/common/store';
import type { Project } from '../../redux/projects/payloadTypes';

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Apps' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'mobile', name: 'Mobile Apps' },
];

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { items: projects, loading, error } = useAppSelector(state => state.projects);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'all'
      ? projects
      : projects.filter((project: Project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <ProjectsContainer>
      <ProjectsHeader>
        <ProjectsTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </ProjectsTitle>
        <ProjectsDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A collection of my favorite projects showcasing design, backend, and full-stack development skills.
        </ProjectsDescription>
      </ProjectsHeader>

      <FilterSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <GlassyFilterButton
            key={category.id}
            $active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </GlassyFilterButton>
        ))}
      </FilterSection>

      <ProjectsGrid>
        {filteredProjects.map((project: Project, index: number) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <ProjectImage>
              <span>{project.image || '📁'}</span>
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tags?.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ProjectTags>
              <ProjectLinks>
                {project.liveUrl && (
                  <ProjectLink
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </ProjectLink>
                )}
                {project.githubUrl && (
                  <ProjectLink
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}

const ProjectsContainer = styled.div`
      max-width: 1200px;
      margin: 0 auto;
      padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[6]};
    `;

const ProjectsHeader = styled.div`
      text-align: center;
      margin-bottom: ${({ theme }) => theme.spacing[16]};
    `;

const ProjectsTitle = styled(motion.h1)`
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
      font-weight: ${({ theme }) => theme.fontWeights.extrabold};
      color: ${({ theme }) => theme.colors.text.primary};
      margin-bottom: ${({ theme }) => theme.spacing[6]};
    `;

const ProjectsDescription = styled(motion.p)`
      font-size: ${({ theme }) => theme.fontSizes.xl};
      color: ${({ theme }) => theme.colors.text.secondary};
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    `;

const FilterSection = styled(motion.div)`
      display: flex;
      justify-content: center;
      gap: ${({ theme }) => theme.spacing[4]};
      margin-bottom: ${({ theme }) => theme.spacing[12]};
      flex-wrap: wrap;
    `;

const GlassyFilterButton = styled(motion.button) <{ $active: boolean }>`
      padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
      border-radius: ${({ theme }) => theme.borderRadius.full};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      cursor: pointer;
      border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'rgba(200,200,200,0.25)')};
      background: ${({ $active }) => ($active ? 'rgba(96, 165, 250, 0.25)' : 'rgba(255,255,255,0.15)')};
      color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text.primary)};
      backdrop-filter: blur(10px) saturate(180%);
      transition: all ${({ theme }) => theme.transitions.base};
    
      &:hover, &:focus {
        background: rgba(96, 165, 250, 0.3);
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-2px) scale(1.03);
      }
    `;

const ProjectsGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: ${({ theme }) => theme.spacing[8]};
      margin-bottom: ${({ theme }) => theme.spacing[12]};
    `;

const ProjectCard = styled(motion.article)`
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      backdrop-filter: blur(12px) saturate(180%);
      border-radius: ${({ theme }) => theme.borderRadius['2xl']};
      overflow: hidden;
      cursor: pointer;
      transition: all ${({ theme }) => theme.transitions.base};
      color: ${({ theme }) => theme.colors.text.primary};
    
      &:hover {
        transform: translateY(-8px);
        box-shadow: ${({ theme }) => theme.shadows.xl};
        border-color: ${({ theme }) => theme.colors.primary};
      }
    `;

const ProjectImage = styled.div`
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.primary};
    `;

const ProjectContent = styled.div`
      padding: ${({ theme }) => theme.spacing[6]};
    `;

const ProjectTitle = styled.h3`
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      margin-bottom: ${({ theme }) => theme.spacing[3]};
    `;

const ProjectDescription = styled.p`
      color: ${({ theme }) => theme.colors.text.secondary};
      line-height: 1.6;
      margin-bottom: ${({ theme }) => theme.spacing[4]};
    `;

const ProjectTags = styled.div`
      display: flex;
      gap: ${({ theme }) => theme.spacing[2]};
      flex-wrap: wrap;
      margin-bottom: ${({ theme }) => theme.spacing[4]};
    `;

const Tag = styled.span`
      background: rgba(96, 165, 250, 0.18);
      color: ${({ theme }) => theme.colors.primary};
      padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
      border-radius: ${({ theme }) => theme.borderRadius.full};
      font-size: ${({ theme }) => theme.fontSizes.xs};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      backdrop-filter: blur(6px);
      border: 1px solid rgba(96, 165, 250, 0.3);
    `;

const ProjectLinks = styled.div`
      display: flex;
      gap: ${({ theme }) => theme.spacing[3]};
    `;

const ProjectLink = styled(motion.a)`
      padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      text-decoration: none;
      border: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text.primary};
      transition: all ${({ theme }) => theme.transitions.base};
    
      &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        border-color: ${({ theme }) => theme.colors.primary};
      }
    `;

