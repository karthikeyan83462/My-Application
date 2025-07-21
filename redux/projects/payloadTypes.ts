export type OnReceiveProjectsPayloadType = {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  href: string;
}

export type RequestProjectPayloadType = {
  id: string
}

export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  href: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FetchProjectsRequest = {
  limit?: number;
  offset?: number;
  search?: string;
};

export type FetchProjectsResponse = Project[];

export type FetchProjectByIdRequest = { id: string | number };
export type FetchProjectByIdResponse = Project;

export type InFlightStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR';

export interface ProjectsInFlights {
  fetchProjects: { status: InFlightStatus };
  fetchProjectById: { status: InFlightStatus };
}

export interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
  inFlights: ProjectsInFlights;
  selectedProject?: Project | null;
  lastUpdated?: string;
}
