import SkillChip from './SkillChip';
import '../assets/styles/Skills.css';

export default function Skills({ skills }) {
  if (!skills) return null;

  return (
    <section
      className="animate-slide-in-up"
      style={{ '--delay': '0.8s' }}
      id="skills-matrix-section"
    >
      <div className="hud-panel skills-matrix">
        <h3>&gt; usman/skills</h3>
        <div className="skills" id="skills-matrix">
          {skills.map((skillCat) => (
            <div key={skillCat.category} className="skills-row">
              <h4 className="skills-row-label">{skillCat.category}</h4>
              <div className="skills-row-items">
                {skillCat.items.map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
