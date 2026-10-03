import { useState, useEffect } from 'react';
import SkillChip from './SkillChip';
import '../assets/styles/ProjectModal.css';
import '../assets/styles/CaseStudies.css';

export default function CaseStudyModal({ isOpen, study, onClose }) {
  // Keep the last study around so the fade-out still shows content
  const [active, setActive] = useState(study);
  if (study && study !== active) setActive(study);

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

  if (!active) return null;

  const { title, context, metric, stats, problem, approach, result, techStack, link } = active;

  return (
    <div
      className={`modal case-modal ${isOpen ? 'active' : ''}`}
      id="case-study-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      aria-hidden={!isOpen}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content hud-panel case-modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <header className="case-modal-header">
          <p className="case-modal-context">{context}</p>
          <h2 id="case-modal-title">{title}</h2>
          <div className="case-modal-stats">
            <div className="case-stat case-stat--primary">
              <span className="case-stat-value">{metric.value}</span>
              <span className="case-stat-label">{metric.label}</span>
            </div>
            {stats && stats.map((s) => (
              <div key={s.label} className="case-stat">
                <span className="case-stat-value">{s.value}</span>
                <span className="case-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="case-modal-body">
          <section className="case-section">
            <h3>Problem</h3>
            <p>{problem}</p>
          </section>

          <section className="case-section">
            <h3>Approach</h3>
            <ol>
              {approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="case-section">
            <h3>Result</h3>
            <p>{result}</p>
          </section>

          <section className="case-section">
            <h3>Stack</h3>
            <div className="modal-tech">
              {techStack.map((tag) => <SkillChip key={tag} label={tag} />)}
            </div>
          </section>

          {link && (
            <a className="modal-live-link modal-live-link--solo" href={link} target="_blank" rel="noopener noreferrer">
              Visit live site
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
