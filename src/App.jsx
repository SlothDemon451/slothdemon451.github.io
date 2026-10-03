import { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Header from './components/Header';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import ProjectModal from './components/ProjectModal';
import AllProjectsModal from './components/AllProjectsModal';
import CaseStudyModal from './components/CaseStudyModal';
import PageNav from './components/PageNav';
import MobileNav from './components/MobileNav';
import portfolioData from './data/data.json';
import projects from './data/projects.json';
import caseStudies from './data/case-studies.json';

const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [isStudyOpen, setIsStudyOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAllProjects = () => {
    setIsAllProjectsOpen(true);
  };

  const handleCloseAllProjects = () => {
    setIsAllProjectsOpen(false);
  };

  const handleOpenStudy = (study) => {
    setSelectedStudy(study);
    setIsStudyOpen(true);
  };

  const handleCloseStudy = () => {
    setIsStudyOpen(false);
  };

  return (
    <>
      {/* 3D background */}
      <BackgroundCanvas />

      {/* Fixed section navigator */}
      <PageNav />

      {/* Mobile bottom navigation bar */}
      <MobileNav />

      {/* Main Dashboard Layout */}
      <main className="main-container">
        <div className="sub-container">
          <Header personalInfo={portfolioData.personalInfo} />

          <div className="container">
            <Profile summary={portfolioData.summary} />
            <Experience experience={portfolioData.experience} />
            <Projects
              projects={featuredProjects}
              totalCount={projects.length}
              onOpenModal={handleOpenModal}
              onViewAll={handleOpenAllProjects}
            />
            <CaseStudies studies={caseStudies} onOpen={handleOpenStudy} />
            <Skills skills={portfolioData.skills} />
            <Education education={portfolioData.education} />
            <Certifications certifications={portfolioData.certifications} />
          </div>
        </div>
      </main>

      {/* Detail View Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />

      {/* All Projects Modal with Category Tabs */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        projects={projects}
        onClose={handleCloseAllProjects}
        onOpenProject={handleOpenModal}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isStudyOpen}
        study={selectedStudy}
        onClose={handleCloseStudy}
      />
    </>
  );
}
