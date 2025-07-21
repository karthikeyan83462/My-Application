export type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
  author?: string;
  image?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FetchBlogPostsRequest = {
  limit?: number;
  offset?: number;
  search?: string;
};

export type FetchBlogPostsResponse = BlogPost[];

export type FetchBlogPostByIdRequest = { id: string | number };

export type FetchBlogPostByIdResponse = BlogPost;

export type InFlightStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR';

export interface BlogPostsInFlights {
  fetchBlogPosts: { status: InFlightStatus };
  fetchBlogPostById: { status: InFlightStatus };
}

export interface BlogPostsState {
  items: BlogPost[];
  loading: boolean;
  error: string | null;
  inFlights: BlogPostsInFlights;
  selectedPost?: BlogPost | null;
  lastUpdated?: string;
} 