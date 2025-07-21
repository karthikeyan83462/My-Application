import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import requests from '../../common/utils/api';
import { getAPIEndPoints } from '../../utils/api';
import type {
  ProjectsState,
  FetchProjectsRequest,
  FetchProjectsResponse,
  FetchProjectByIdRequest,
  FetchProjectByIdResponse,
} from './payloadTypes';


const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  inFlights: {
    fetchProjects: { status: 'INITIAL' },
    fetchProjectById: { status: 'INITIAL' },
  },
  selectedProject: null,
  lastUpdated: undefined,
};



// Async thunk for fetching all projects
export const fetchProjects = createAsyncThunk<FetchProjectsResponse, FetchProjectsRequest | void, { rejectValue: string }>(
  'projects/fetchProjects',
  async (params, { rejectWithValue }) => {
    try {
      const res = await requests.get(getAPIEndPoints.projects.base(), { params });
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Unknown error');
    }
  }
);

// Async thunk for fetching a single project by ID
export const fetchProjectById = createAsyncThunk<
  FetchProjectByIdResponse,
  FetchProjectByIdRequest,
  { rejectValue: string }
>(
  'projects/fetchProjectById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await requests.get(getAPIEndPoints.projects.byId(id));
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Unknown error');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearSelectedProject(state) {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.inFlights.fetchProjects.status = 'PENDING';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<FetchProjectsResponse>) => {
        state.loading = false;
        state.items = action.payload;
        state.inFlights.fetchProjects.status = 'SUCCESS';
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch projects';
        state.inFlights.fetchProjects.status = 'ERROR';
      })

//================================================================================================================
      // Fetch project by ID

      .addCase(fetchProjectById.pending, (state) => {
        state.inFlights.fetchProjectById.status = 'PENDING';
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<FetchProjectByIdResponse>) => {
        state.selectedProject = action.payload;
        state.inFlights.fetchProjectById.status = 'SUCCESS';
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.selectedProject = null;
        state.inFlights.fetchProjectById.status = 'ERROR';
        state.error = action.payload || 'Failed to fetch project';
      })

//================================================================================================================

  },
});

export const { clearSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer; 