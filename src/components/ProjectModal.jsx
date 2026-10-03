import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import SkillChip from './SkillChip';
import ProjectLinks from './ProjectLinks';
import '../assets/styles/ProjectModal.css';

export default function ProjectModal({ isOpen, project, onClose }) {
  // Keep the last project around so the fade-out still shows content
  const [activeProject, setActiveProject] = useState(project);
  if (project && project !== activeProject) setActiveProject(project);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!activeProject) return null;

  const { name, techStack, images, details, description } = activeProject;

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content hud-panel">
        <button className="modal-close" id="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-body">
          {/* Left column: screenshots, then title and stack */}
          <div className="modal-media">
            <Carousel images={images} projectName={name} />
            <div className="modal-meta">
              <h2 id="modal-title">{name}</h2>
              <div className="modal-tech" id="modal-tech">
                {techStack && techStack.map((tag) => <SkillChip key={tag} label={tag} />)}
              </div>
            </div>
          </div>

          {/* Right column: the write-up */}
          <div className="modal-text-content">
            <div id="modal-description">
              {details ? (
                <div className="modal-description">
                  <p>{details.description}</p>
                  {details.points && details.points.length > 0 && (
                    <ul>
                      {details.points.map((point) => {
                        const [lead, ...rest] = point.split(': ');
                        const body = rest.join(': ');
                        return (
                          <li key={point}>
                            {body ? (
                              <>
                                <strong>{lead}.</strong> {body}
                              </>
                            ) : (
                              point
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <p>{description}</p>
              )}
            </div>

            <div className="modal-links">
              <ProjectLinks project={activeProject} className="modal-live-link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
