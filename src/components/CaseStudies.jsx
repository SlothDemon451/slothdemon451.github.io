import SkillChip from './SkillChip';
import '../assets/styles/CaseStudies.css';

function CaseStudyCard({ study, onOpen }) {
  const open = () => onOpen(study);
  return (
    <article
      className="hud-panel case-card"
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label={`${study.title}. Read case study`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="case-card-metric">
        <span className="case-card-metric-value">{study.metric.value}</span>
        <span className="case-card-metric-label">{study.metric.label}</span>
      </div>

      <h4 className="case-card-title">{study.title}</h4>
      <p className="case-card-problem">{study.problem}</p>

      <div className="case-card-tech">
        {study.techStack.slice(0, 4).map((tag) => (
          <SkillChip key={tag} label={tag} compact />
        ))}
        {study.techStack.length > 4 && (
          <span className="skill-chip skill-chip--sm tech-more">+{study.techStack.length - 4}</span>
        )}
      </div>

      <div className="case-card-footer">
        <span className="case-card-cta">
          Read case study
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </span>
      </div>
    </article>
  );
}

export default function CaseStudies({ studies, onOpen }) {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="animate-slide-in-up" id="case-studies" style={{ '--delay': '0.7s' }}>
      <div className="hud-panel case-studies">
        <div className="section-heading">
          <h3>&gt; usman/case-studies</h3>
          <span className="section-heading-meta">problem, approach, result</span>
        </div>
        <div className="case-list">
          {studies.map((study) => (
            <CaseStudyCard key={study.id} study={study} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
