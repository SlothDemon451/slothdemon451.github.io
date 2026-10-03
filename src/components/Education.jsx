import '../assets/styles/Education.css';

export default function Education({ education }) {
  if (!education) return null;

  return (
    <section className="animate-slide-in-up" id="education" style={{ '--delay': '1s' }}>
      <div className="hud-panel education">
        <h3>&gt; usman/education</h3>
        <div id="education-list" className="education-items">
          {education.map((edu) => (
            <div key={edu.degree} className="education-item">
              <h4 className="education-title">{edu.degree}</h4>
              <p className="education-institute">{edu.institute}</p>
              <p className="education-timeline">
                <span>{edu.timeline}</span>
                {edu.location && <span className="education-location">{edu.location}</span>}
              </p>
              {edu.grade && (
                <p className="education-grade">
                  {edu.gradeLabel || 'Grade'}:{' '}
                  <span className="education-metric-highlight">{edu.grade}</span>
                </p>
              )}
              {edu.coursework && edu.coursework.length > 0 && (
                <p className="education-coursework">
                  <span className="education-coursework-label">Coursework:</span>{' '}
                  {edu.coursework.join(', ')}
                </p>
              )}
              {edu.award && <div className="education-gold-badge">{edu.award}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
