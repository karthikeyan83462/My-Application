export const getAPIEndPoints = Object.freeze({
  projects: {
    base: () => '/projects',
    byId: (id: string | number) => `/projects/${id}`,
  },
  blogPosts: {
    base: () => '/blog-posts',
    byId: (id: string | number) => `/blog-posts/${id}`,
  },
  // Add more as needed...
});