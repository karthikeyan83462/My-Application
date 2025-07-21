import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
  }

  h2 {
    font-size: 2.25rem;
  }

  h3 {
    font-size: 1.875rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background: #f1f5f9;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  pre code {
    background: none;
    padding: 0;
    color: inherit;
  }

  blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #64748b;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.75rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }
    
    h2 {
      font-size: 1.875rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`; 