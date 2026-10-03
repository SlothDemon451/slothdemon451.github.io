import '../assets/styles/Profile.css';

export default function Profile({ summary }) {
  if (!summary || !summary.profile) return null;

  return (
    <section className="animate-slide-in-up" id="profile" style={{ '--delay': '0.2s' }}>
      <div className="hud-panel summary">
        <h3>&gt; usman/profile</h3>
        <p dangerouslySetInnerHTML={{ __html: summary.profile }} />
      </div>
    </section>
  );
}
