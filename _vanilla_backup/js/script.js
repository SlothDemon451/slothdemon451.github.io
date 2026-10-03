document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      try {
        init();
        animate();
      } catch (e) {
        console.error("Three.js animation error:", e);
        // Fallback if Three.js fails to initialize
        const fallbackSymbol = document.createElement("div");
        fallbackSymbol.style.position = "fixed";
        fallbackSymbol.style.top = "50%";
        fallbackSymbol.style.left = "50%";
        fallbackSymbol.style.transform = "translate(-50%, -50%)";
        fallbackSymbol.style.fontSize = "100px";
        fallbackSymbol.style.color = "rgba(74, 144, 226, 0.2)";
        fallbackSymbol.style.zIndex = "-1";
        fallbackSymbol.textContent = "</>";

        document.getElementById("canvas-container").appendChild(fallbackSymbol);
      }
      // get necessary tags
      document.getElementById("name").textContent =
        data.personalInfo.name.toUpperCase();
      document.getElementById("title").textContent =
        data.personalInfo.title.toUpperCase();
      const socialLinksContainer = document.getElementById("social-links");
      const skillsMatrixContainer = document.getElementById("skills-matrix");
      const experienceList = document.getElementById("experience-list");
      const certificationsList = document.getElementById("certifications-list");
      const projectsList = document.getElementById("projects-list");
      const educationList = document.getElementById("education-list");

      // Social links
      const socialLinksData = data.personalInfo.socialLinks;
      for (const platform in socialLinksData) {
        const linkData = socialLinksData[platform];
        const a = document.createElement("a");
        a.href = linkData.url;
        a.target = "_blank";
        a.setAttribute("area-label", linkData.label);
        a.innerHTML = getSocialSvg(platform) + `<span>${linkData.label}</span>`;
        socialLinksContainer.appendChild(a);
      }
      document.getElementById("profile-summary").innerHTML =
        data.summary.profile;

      // EXPERIENCE
      data.experience.forEach((exp, index) => {
        const delay = 0.4 + index * 0.2;
        experienceList.innerHTML += `
          <div class="experience-item hud-panel animate-slide-in-up" style="--delay: ${delay}s">
            <div class="experience-title">
              <h4>${exp.title}</h4>
            </div>
            <p class="experience-institute">${exp.company}</p>
            <p class="experience-timeline">${exp.timeline}</p>
            <p class="experience-description">
              ${exp.description}
            </p>
          </div>
        `;
      });

      // Projects
      data.projects.forEach((project, index) => {
        const delay = 0.6 + index * 0.2;
        const techTags = project.techStack
          .map((tag) => `<div class="skill-tag">${tag}</div>`)
          .join("");

        const projectItem = document.createElement("div");
        projectItem.className = "hud-panel project-item animate-slide-in-up";
        projectItem.style.setProperty("--delay", `${delay}s`);

        projectItem.innerHTML = `
          <div class="project-content">
            ${
              project.images && project.images.length > 0
                ? `<img src="${project.images[0]}" alt="${project.name}" class="project-card-img">`
                : `<div class="project-img-placeholder"><img src="assets/media/no_image.png" alt="${project.name}"><span>No Image</span></div>`
            }
            <h4>${project.name}</h4>
            <p class="project-description-short">
              ${project.description}
            </p>
            <div class="project-tech">${techTags}</div>
          </div>
          <div class="project-links">
            <button class="project-link-btn read-more-btn" data-index="${index}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span>Details</span>
            </button>
            <a href="${project.liveLink || "#"}" class="project-link-btn ${!project.liveLink ? "disabled" : ""}" target="_blank">
              <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zm0 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
              </svg>
              <span>Live</span>
            </a>
            <a href="${project.githubLink || "#"}" class="project-link-btn ${!project.githubLink ? "disabled" : ""}" target="_blank">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.930 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        `;

        projectItem
          .querySelector(".read-more-btn")
          .addEventListener("click", () => {
            openModal(project);
          });

        projectsList.appendChild(projectItem);
      });

      // Modal Logic
      const modal = document.getElementById("project-modal");
      const modalClose = document.getElementById("modal-close");
      const modalBackdrop = modal.querySelector(".modal-backdrop");
      const carouselTrack = document.getElementById("carousel-track");
      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");
      const indicators = document.getElementById("carousel-indicators");

      let currentSlide = 0;
      let projectImages = [];

      function openModal(project) {
        document.getElementById("modal-title").textContent = project.name;
        document.getElementById("modal-description").innerHTML = project.details
          ? `
          <div class="modal-description">
          <p>${project.details.description}</p>
          <ul>
            ${project.details.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
          </div>
          `
          : `<p>${project.description}</p>`;
        document.getElementById("modal-tech").innerHTML = project.techStack
          .map((tag) => `<div class="skill-tag">${tag}</div>`)
          .join("");

        projectImages = project.images || [];
        currentSlide = 0;
        updateCarousel(project.name);

        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }

      function updateCarousel(projectName) {
        if (projectImages.length === 0) {
          carouselTrack.innerHTML = `
            <div class="carousel-slide project-img-placeholder">
              <img src="assets/media/no_image.png" alt="${projectName}">
              <span>No Image</span>
            </div>
          `;
        } else {
          carouselTrack.innerHTML = projectImages
            .map((img) => {
              // Extract filename without extension
              const filename = img.split("/").pop().split(".")[0];
              // Replace _ with spaces and capitalize
              const formattedName = filename
                .replace(/_/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return `
              <div class="carousel-slide">
                <img src="${img}" alt="${formattedName}">
                <div class="carousel-caption">${formattedName}</div>
              </div>
            `;
            })
            .join("");
        }

        if (projectImages.length === 0) {
          indicators.innerHTML = `<div class="indicator active" data-index="0"></div>`;
        } else {
          indicators.innerHTML = projectImages
            .map(
              (_, i) =>
                `<div class="indicator ${i === currentSlide ? "active" : ""}" data-index="${i}"></div>`,
            )
            .join("");
        }

        // Add click events to indicators
        indicators.querySelectorAll(".indicator").forEach((ind) => {
          ind.addEventListener("click", (e) => {
            currentSlide = parseInt(e.target.dataset.index);
            moveCarousel();
          });
        });

        if (projectImages.length <= 1) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }

        moveCarousel();
      }

      function moveCarousel() {
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        indicators.querySelectorAll(".indicator").forEach((ind, i) => {
          ind.classList.toggle("active", i === currentSlide);
        });
      }

      prevBtn.addEventListener("click", () => {
        currentSlide =
          (currentSlide - 1 + projectImages.length) % projectImages.length;
        moveCarousel();
      });

      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % projectImages.length;
        moveCarousel();
      });

      function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }

      modalClose.addEventListener("click", closeModal);
      modalBackdrop.addEventListener("click", closeModal);

      // SKILLS
      data.skills.forEach((skillCat, index) => {
        const skillsCatDiv = document.createElement("div");
        skillsCatDiv.className = "skills-cat";
        skillsCatDiv.innerHTML = `<h4>[${skillCat.category}]</h4>`;
        const skillsItemDiv = document.createElement("div");
        skillsItemDiv.className = "skill-item";
        skillCat.items.forEach((skill, skillIndex) => {
          const delay = 0.8 + index * 0.1 + skillIndex * 0.05;
          skillsItemDiv.innerHTML += `
            <div class="skill-tag animate-slide-in-up" style="--delay: ${delay}s">
              ${skill}
            </div>
          `;
        });
        skillsCatDiv.appendChild(skillsItemDiv);
        skillsMatrixContainer.appendChild(skillsCatDiv);
      });

      // EDUCATION
      data.education.forEach((edu, index) => {
        const educationItem = document.createElement("div");
        educationItem.className = "education-item";

        let marksHtml = "";
        if (edu.marks) {
          marksHtml = ` • ${
            edu.isGpa ? "CGPA" : "Marks"
          }: <span class="education-metric-highlight">${edu.marks}</span>`;
        }

        let awardHtml = "";
        if (edu.award) {
          awardHtml = `<div class="education-gold-badge">${edu.award}</div>`;
        }

        educationItem.innerHTML = `
          <h4 class="education-title">${edu.degree}</h4>
          <p class="education-institute">${edu.institute}</p>
          <p class="education-timeline">
            ${edu.timeline}${marksHtml}
          </p>
          ${awardHtml}
        `;
        educationList.appendChild(educationItem);
      });

      // Certifications
      data.certifications.forEach((cert, index) => {
        const delay = 1.2 + index * 0.1;
        certificationsList.innerHTML += `
          <div
            class="hud-panel certification-item animate-slide-in-up"
            style="--delay: ${delay}s"
          >
          <div>
          <h4>${cert.name}</h4>
          <p>${cert.institute}</p>
          </div>
            <a href="${cert.link}" target="_blank" rel="noopener noreferrer nofollow">See Credentials</a>
          </div>
        `;
      });
    })
    .catch((err) => console.log("error fetting data", err));
  function getSocialSvg(platform) {
    const svgs = {
      mail: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
      linkedin: `<svg class="h-6 w-6 text-[#4b6b8b]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      github: `<svg class="h-6 w-6 text-[#4b6b8b]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.930 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    };
    return svgs[platform] || "";
  }
});
