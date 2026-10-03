/* Shared helpers for project data and presentation (kept out of component
   files so Vite fast-refresh only sees component exports there). */

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'desktop', label: 'Desktop & Systems' },
  { id: 'cms', label: 'CMS & Landing' },
];

export function filterByCategory(projects, categoryId) {
  if (categoryId === 'all') return projects;
  return projects.filter((p) => p.categories.includes(categoryId));
}

/** External links for a project, in display order. Only links that exist are returned. */
export function getProjectLinks(project) {
  const links = [];
  if (project.liveLink) links.push({ kind: 'live', label: 'Live site', href: project.liveLink });
  if (project.appStoreLink) links.push({ kind: 'ios', label: 'App Store', href: project.appStoreLink });
  if (project.playStoreLink) links.push({ kind: 'android', label: 'Google Play', href: project.playStoreLink });
  return links;
}

/** Two-letter monogram used when a project has no screenshot. */
export function getMonogram(name) {
  const words = name
    .split(/[\s—–-]+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w));
  const first = words[0]?.[0] ?? '';
  const second = words[1]?.[0] ?? words[0]?.[1] ?? '';
  return (first + second).toUpperCase();
}

/** "assets/media/x/02-kitchen_view.png" -> "Kitchen View" (order prefix dropped) */
export function formatImageName(imgUrl, fallback) {
  try {
    const filename = imgUrl.split('/').pop().split('.')[0];
    return filename
      .replace(/^\d+[-_\s]*/, '')
      .replace(/[_-]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch {
    return fallback;
  }
}
