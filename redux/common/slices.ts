import { combineReducers } from 'redux';
import projects, { ProjectsState } from '../projects/projectsSlice';
import blogPosts, { BlogPostsState } from '../blogPosts/blogPostsSlice';
// Add other slices here as your app grows

export type ApplicationState = {
  projects: ProjectsState;
  blogPosts: BlogPostsState;
  // Add other slices here
};

const appReducer = combineReducers<ApplicationState>({
  projects,
  blogPosts,
  // Add other slices here
});

const rootReducer = (state: ApplicationState | undefined, action: any) => {
  if (action.type === 'requestLogout/fulfilled') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer; 