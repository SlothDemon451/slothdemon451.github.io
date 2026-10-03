import { getSkillIcon } from '../lib/skillIcons';

/**
 * A technology chip with its brand icon. Shared by the skills section, the
 * project cards and the project detail modal. Styles live in src/index.css.
 *
 * Props:
 *   label   – technology name
 *   compact – smaller variant for project cards
 */
export default function SkillChip({ label, compact = false }) {
  const icon = getSkillIcon(label);
  const base = compact ? 'skill-chip skill-chip--sm' : 'skill-chip';

  // Full wordmark logo: the image stands in for the text
  if (icon?.kind === 'image' && icon.wordmark) {
    return (
      <span className={`${base} skill-chip--wordmark`} title={label}>
        <img className="skill-chip-wordmark" src={icon.src} alt={label} />
      </span>
    );
  }

  return (
    <span className={base}>
      {icon?.kind === 'path' && (
        <svg
          className="skill-chip-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ color: icon.color }}
        >
          <path d={icon.path} fill="currentColor" />
        </svg>
      )}
      {icon?.kind === 'image' && (
        <img className="skill-chip-icon skill-chip-icon--image" src={icon.src} alt="" />
      )}
      <span>{label}</span>
    </span>
  );
}
