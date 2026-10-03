import { getProjectLinks } from '../lib/projects';

const ICONS = {
  live: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z" />
    </svg>
  ),
  ios: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71s1.7.71 2.87.69c1.19-.02 1.94-1.08 2.66-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.3-3.55zM14.17 6.16c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.55 1.31-.56.65-1.05 1.7-.92 2.7.97.07 1.96-.49 2.57-1.23z" />
    </svg>
  ),
  android: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.3a1 1 0 0 1 1.1-.1l15.6 9a1 1 0 0 1 0 1.7l-15.6 9A1 1 0 0 1 3.2 21V3a1 1 0 0 1 .4-.7zm1.6 2.4v14.6l7.3-7.3-7.3-7.3zm8.7 8.7l-6.4 6.4 9.1-5.2-2.7-1.2zm0-2.8l2.7-1.2-9.1-5.2 6.4 6.4z" />
    </svg>
  ),
};

/**
 * Renders a project's external links (live site, App Store, Google Play).
 *
 * Props:
 *   project   – project data object
 *   className – class applied to each link
 *   stop      – stop click propagation (for use inside clickable cards)
 */
export default function ProjectLinks({ project, className, stop = false }) {
  const links = getProjectLinks(project);
  if (links.length === 0) return null;

  return (
    <>
      {links.map((link) => (
        <a
          key={link.kind}
          href={link.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          aria-label={link.label}
          onClick={stop ? (e) => e.stopPropagation() : undefined}
        >
          {ICONS[link.kind]}
          <span>{link.label}</span>
        </a>
      ))}
    </>
  );
}
