import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ── Desktop: paired rows merged into one nav point ──────────────────────── */
export const DESKTOP_NAV_ITEMS = [
  {
    id:         'info',
    label:      'Header',
    scrollTo:   'info',
    observeIds: ['info'],
  },
  {
    id:         'profile',
    label:      'Profile',
    scrollTo:   'profile',
    observeIds: ['profile'],
  },
  {
    id:         'experience',
    label:      'Exp & Projects',
    scrollTo:   'experience',
    observeIds: ['experience', 'projects'],
  },
  {
    id:         'case-studies',
    label:      'Case studies',
    scrollTo:   'case-studies',
    observeIds: ['case-studies'],
  },
  {
    id:         'skills-matrix-section',
    label:      'Skills',
    scrollTo:   'skills-matrix-section',
    observeIds: ['skills-matrix-section'],
  },
  {
    id:         'education',
    label:      'Education & Certifications',
    scrollTo:   'education',
    observeIds: ['education', 'certificate'],
  },
];

/* ── Mobile: every section gets its own nav point ────────────────────────── */
export const MOBILE_NAV_ITEMS = [
  {
    id:         'info',
    label:      'Header',
    scrollTo:   'info',
    observeIds: ['info'],
  },
  {
    id:         'profile',
    label:      'Profile',
    scrollTo:   'profile',
    observeIds: ['profile'],
  },
  {
    id:         'experience',
    label:      'Experience',
    scrollTo:   'experience',
    observeIds: ['experience'],
  },
  {
    id:         'projects',
    label:      'Projects',
    scrollTo:   'projects',
    observeIds: ['projects'],
  },
  {
    id:         'case-studies',
    label:      'Case studies',
    scrollTo:   'case-studies',
    observeIds: ['case-studies'],
  },
  {
    id:         'skills-matrix-section',
    label:      'Skills',
    scrollTo:   'skills-matrix-section',
    observeIds: ['skills-matrix-section'],
  },
  {
    id:         'education',
    label:      'Education',
    scrollTo:   'education',
    observeIds: ['education'],
  },
  {
    id:         'certificate',
    label:      'Certifications',
    scrollTo:   'certificate',
    observeIds: ['certificate'],
  },
];

/* ── Hook factory — accepts the item list the component wants to use ─────── */
export function usePageNav(navItems) {
  const navigate      = useNavigate();
  const location      = useLocation();
  const findItem      = (hash) => navItems.find((n) => n.observeIds.includes(hash));
  const [active, setActive] = useState(() => findItem(location.hash.replace('#', ''))?.id ?? navItems[0].id);
  const isClickNav    = useRef(false);
  const didInitScroll = useRef(false);

  /* Initial load: scroll to the section named in the hash */
  useEffect(() => {
    if (didInitScroll.current) return;
    didInitScroll.current = true;
    const hash = location.hash.replace('#', '');
    if (findItem(hash)) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  /* IntersectionObserver — passive active-dot sync while user scrolls */
  useEffect(() => {
    const observers = [];

    // Flat map: elementId → nav item id
    const elementToNavId = {};
    navItems.forEach((item) => {
      item.observeIds.forEach((elId) => {
        elementToNavId[elId] = item.id;
      });
    });

    Object.entries(elementToNavId).forEach(([elId, navId]) => {
      const el = document.getElementById(elId);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (isClickNav.current) return;
          if (entry.isIntersecting) {
            setActive(navId);
            navigate(`/#${elId}`, { replace: true });
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (item) => {
    isClickNav.current = true;
    setActive(item.id);
    navigate(`/#${item.scrollTo}`, { replace: true });
    document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { isClickNav.current = false; }, 900);
  };

  return { active, handleClick };
}
