import { useEffect } from 'react';
import { fetchProjects } from '../../redux/projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/common/store';
import type { Project } from '../../redux/projects/payloadTypes';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { items: projects, loading, error } = useAppSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Projects</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div style={{ display: 'grid', gap: 24 }}>
        {projects.map((project: Project) => (
          <div key={project.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: '2rem' }}>{project.image}</div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.category && <div style={{ fontStyle: 'italic', color: '#888' }}>Category: {project.category}</div>}
            <div>
              {project.tags.map(tag => (
                <span key={tag} style={{ marginRight: 8, background: '#f0f0f0', borderRadius: 8, padding: '2px 8px' }}>{tag}</span>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>Live</a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
