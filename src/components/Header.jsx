import '../assets/styles/Header.css';

const SOCIAL_ICONS = {
  mail: (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  linkedin: (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
    </svg>
  ),
  github: (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.930 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  phone: (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z" />
    </svg>
  ),
};

export default function Header({ personalInfo }) {
  if (!personalInfo) return null;
  const { name, title, socialLinks } = personalInfo;

  return (
    <header className="animate-slide-in-up" style={{ '--delay': '0s' }}>
      <div className="hud-panel" id="info">
        <div className="header-text">
          <h1 id="name">{name}</h1>
          <h2 id="title">{title}</h2>
          <div className="hud-panel-social" id="social-links">
            {Object.entries(socialLinks).map(([platform, linkData]) => (
              <a
                key={platform}
                href={linkData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOCIAL_ICONS[platform]}
                <span>{linkData.label}</span>
              </a>
            ))}
          </div>
        </div>

        <a
          className="launch-button"
          href="assets/Muhammad_Usman_Imran_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Muhammad_Usman_Imran_CV.pdf"
        >
          Download resume
        </a>
      </div>
    </header>
  );
}
