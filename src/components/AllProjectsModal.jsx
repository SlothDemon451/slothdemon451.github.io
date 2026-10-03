import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { CATEGORIES, filterByCategory } from '../lib/projects';
import '../assets/styles/AllProjectsModal.css';

export default function AllProjectsModal({ isOpen, projects, onClose, onOpenProject }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Reset the tab so the modal always reopens on "All"
  const close = () => {
    setActiveCategory('all');
    onClose();
  };

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveCategory('all');
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const visible = filterByCategory(projects, activeCategory);

  return (
    <div
      className={`modal all-projects-modal ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-projects-title"
      aria-hidden={!isOpen}
    >
      <div className="modal-backdrop" onClick={close}></div>

      <div className="modal-content hud-panel all-projects-modal-content">
        <div className="all-projects-modal-header">
          <h2 className="all-projects-modal-title" id="all-projects-title">&gt; usman/all-projects</h2>
          <button className="modal-close" onClick={close} aria-label="Close">&times;</button>
        </div>

        <div className="all-projects-tabs" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((cat) => {
            const count = filterByCategory(projects, cat.id).length;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                className={`all-projects-tab ${active ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="all-projects-grid-container">
          <div className="all-projects-grid">
            {visible.length === 0 ? (
              <div className="all-projects-empty">
                <p>No projects in this category yet.</p>
              </div>
            ) : (
              visible.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenModal={onOpenProject}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
