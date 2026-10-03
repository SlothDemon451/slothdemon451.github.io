import '../assets/styles/Experience.css';

export default function Experience({ experience }) {
  if (!experience) return null;

  return (
    <section className="animate-slide-in-up" id="experience" style={{ '--delay': '0.4s' }}>
      <div className="hud-panel experiences">
        <h3>&gt; usman/experience</h3>
        <ol className="experience-items" id="experience-list">
          {experience.map((exp, index) => (
            <li
              key={`${exp.company}-${exp.timeline}`}
              className={`experience-item${index === 0 ? ' experience-item--current' : ''}`}
            >
              <span className="experience-marker" aria-hidden="true" />
              <p className="experience-timeline">{exp.timeline}</p>
              <h4 className="experience-role">{exp.title}</h4>
              <p className="experience-institute">{exp.company}</p>
              <p className="experience-description">{exp.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
