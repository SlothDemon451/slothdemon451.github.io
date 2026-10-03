import '../assets/styles/Certifications.css';

export default function Certifications({ certifications }) {
  if (!certifications) return null;

  return (
    <section className="animate-slide-in-up" id="certificate" style={{ '--delay': '1.2s' }}>
      <div className="hud-panel certifications">
        <h3>&gt; usman/certifications</h3>
        <div className="certifications-list" id="certifications-list">
          {certifications.map((cert, index) => {
            const delay = 1.2 + index * 0.1;
            return (
              <div
                key={index}
                className="hud-panel certification-item animate-slide-in-up"
                style={{ '--delay': `${delay}s` }}
              >
                <div>
                  <h4>{cert.name}</h4>
                  <p>{cert.institute}</p>
                </div>
                <a href={cert.link} target="_blank" rel="noopener noreferrer nofollow">
                  See Credentials
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
