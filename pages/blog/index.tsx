import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/common/store';
import { fetchBlogPosts } from '../../redux/blogPosts/blogPostsSlice';
import type { BlogPost } from '../../redux/blogPosts/payloadTypes';

// Motion helper for fade-up animation
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

export default function BlogPage() {
  const dispatch = useAppDispatch();
  const { items: blogPosts, loading, error } = useAppSelector(state => state.blogPosts);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const currentPage = 1;
  const totalPages: number = 3;

  return (
    <BlogContainer>
      <BlogHeader>
        <MotionTitle {...fadeUp()}>Blog</MotionTitle>
        <MotionDescription {...fadeUp(0.1)}>
          Thoughts, tutorials, and insights about web development, design, and building delightful digital experiences.
        </MotionDescription>
      </BlogHeader>

      <BlogGrid>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {blogPosts.map((post: BlogPost) => (
          <StyledLink key={post.id} href={`/blog/${post.id}`}>
            <BlogCard {...fadeUp(0.1)} whileHover={{ y: -4 }}>
              <CardTitle>{post.title}</CardTitle>
              <CardMeta>
                <MetaInfo>
                  <MetaText>{formatDate(post.date)}</MetaText>
                </MetaInfo>
                <TagList>
                  {post.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </CardMeta>
            </BlogCard>
          </StyledLink>
        ))}
      </BlogGrid>

      <Pagination>
        <PaginationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PaginationButton
            key={page}
            $active={page === currentPage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </PaginationButton>
        ))}

        <PaginationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </Pagination>
    </BlogContainer>
  );
}

// Styled Components
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[6]}`};
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const MotionTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const MotionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const BlogCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[8]};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MetaText = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[12]};
`;

const PaginationButton = styled(motion.button)<{ $active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.text.primary)};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;