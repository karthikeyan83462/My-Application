import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPIEndPoints } from '../../utils/api';
import requests from '../../common/utils/api';
import type {
  BlogPostsState,
  BlogPost,
  FetchBlogPostsRequest,
  FetchBlogPostsResponse,
  FetchBlogPostByIdRequest,
  FetchBlogPostByIdResponse,
  InFlightStatus
} from './payloadTypes';

// Async thunk for fetching all blog posts
export const fetchBlogPosts = createAsyncThunk<
  FetchBlogPostsResponse,
  FetchBlogPostsRequest | void,
  { rejectValue: string }
>(
  'blogPosts/fetchBlogPosts',
  async (params, { rejectWithValue }) => {
    try {
      const res = await requests.get(getAPIEndPoints.blogPosts.base(), { params });
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Unknown error');
    }
  }
);

// Async thunk for fetching a single blog post by ID
export const fetchBlogPostById = createAsyncThunk<
  FetchBlogPostByIdResponse,
  FetchBlogPostByIdRequest,
  { rejectValue: string }
>(
  'blogPosts/fetchBlogPostById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await requests.get(getAPIEndPoints.blogPosts.byId(id));
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Unknown error');
    }
  }
);

const initialState: BlogPostsState = {
  items: [],
  loading: false,
  error: null,
  inFlights: {
    fetchBlogPosts: { status: 'INITIAL' },
    fetchBlogPostById: { status: 'INITIAL' },
  },
  selectedPost: null,
  lastUpdated: undefined,
};

const blogPostsSlice = createSlice({
  name: 'blogPosts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blog posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.inFlights.fetchBlogPosts.status = 'PENDING';
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action: PayloadAction<FetchBlogPostsResponse>) => {
        state.loading = false;
        state.items = action.payload;
        state.inFlights.fetchBlogPosts.status = 'SUCCESS';
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch blog posts';
        state.inFlights.fetchBlogPosts.status = 'ERROR';
      })
      // Fetch blog post by ID
      .addCase(fetchBlogPostById.pending, (state) => {
        state.inFlights.fetchBlogPostById.status = 'PENDING';
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action: PayloadAction<FetchBlogPostByIdResponse>) => {
        state.selectedPost = action.payload;
        state.inFlights.fetchBlogPostById.status = 'SUCCESS';
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.selectedPost = null;
        state.inFlights.fetchBlogPostById.status = 'ERROR';
        state.error = action.payload || 'Failed to fetch blog post';
      });
  },
});

export const { clearSelectedPost } = blogPostsSlice.actions;
export default blogPostsSlice.reducer; 