import { usePageNav, DESKTOP_NAV_ITEMS } from '../hooks/usePageNav';
import '../assets/styles/PageNav.css';

export default function PageNav() {
  const { active, handleClick } = usePageNav(DESKTOP_NAV_ITEMS);

  return (
    <nav className="page-nav" aria-label="Page sections">
      {DESKTOP_NAV_ITEMS.map((item) => (
        <div key={item.id} className="page-nav__group">
          <button
            className={`page-nav__dot ${active === item.id ? 'page-nav__dot--active' : ''}`}
            onClick={() => handleClick(item)}
            aria-label={`Go to ${item.label}`}
            title={item.label}
          >
            <span className="page-nav__dot-pip" />
            <span className="page-nav__label">{item.label}</span>
          </button>
        </div>
      ))}
    </nav>
  );
}
