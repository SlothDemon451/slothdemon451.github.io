import { getMonogram } from '../lib/projects';
import SkillChip from './SkillChip';
import ProjectLinks from './ProjectLinks';
import '../assets/styles/ProjectCard.css';

/**
 * Project card.
 *
 * Props:
 *   project     – project data object
 *   onOpenModal – called when the card is activated
 *   index       – (optional) stagger delay for the featured grid
 */
export default function ProjectCard({ project, onOpenModal, index }) {
  const { name, description, techStack, images } = project;
  const delay = index !== undefined ? 0.6 + index * 0.12 : undefined;
  const hasImage = images && images.length > 0;

  const open = () => onOpenModal(project);

  return (
    <article
      className={`hud-panel project-card${index !== undefined ? ' animate-slide-in-up' : ''}`}
      style={delay !== undefined ? { '--delay': `${delay}s` } : undefined}
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label={`${name}. View details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="project-card-img-wrap">
        {hasImage ? (
          <img src={images[0]} alt="" className="project-card-img" loading="lazy" />
        ) : (
          <div className="project-img-placeholder" aria-hidden="true">
            <span className="project-img-monogram">{getMonogram(name)}</span>
          </div>
        )}
        {images && images.length > 1 && (
          <span className="project-card-count">{images.length} screens</span>
        )}
      </div>

      <div className="project-card-body">
        <h4 className="project-card-title">{name}</h4>
        <p className="project-card-desc">{description}</p>
        <div className="project-tech">
          {techStack.slice(0, 4).map((tag) => (
            <SkillChip key={tag} label={tag} compact />
          ))}
          {techStack.length > 4 && (
            <span className="skill-chip skill-chip--sm tech-more">+{techStack.length - 4}</span>
          )}
        </div>
      </div>

      <div className="project-card-footer">
        <span className="project-card-cta">
          View details
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </span>
        <span className="project-card-links">
          <ProjectLinks project={project} className="project-card-live" stop />
        </span>
      </div>
    </article>
  );
}
