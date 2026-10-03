import { useState, useEffect } from 'react';
import { getMonogram, formatImageName } from '../lib/projects';
import '../assets/styles/Carousel.css';

export default function Carousel({ images, projectName }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shownImages, setShownImages] = useState(images);
  const count = images ? images.length : 0;

  // Reset to the first slide when a different project's images arrive
  if (images !== shownImages) {
    setShownImages(images);
    setCurrentSlide(0);
  }

  // Arrow-key navigation while a multi-image carousel is on screen
  useEffect(() => {
    if (count < 2) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setCurrentSlide((p) => (p - 1 + count) % count);
      if (e.key === 'ArrowRight') setCurrentSlide((p) => (p + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  if (count === 0) {
    return (
      <div className="carousel-container carousel-empty" aria-label="No screenshots available">
        <span className="project-img-monogram">{getMonogram(projectName)}</span>
        <span className="carousel-empty-label">No screenshots yet</span>
      </div>
    );
  }

  const safeSlide = Math.min(currentSlide, count - 1);
  const goPrev = () => setCurrentSlide((p) => (p - 1 + count) % count);
  const goNext = () => setCurrentSlide((p) => (p + 1) % count);

  return (
    <div className="carousel-container" role="group" aria-roledescription="carousel" aria-label={`${projectName} screenshots`}>
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${safeSlide * 100}%)` }}
      >
        {images.map((img, index) => {
          const caption = formatImageName(img, projectName);
          return (
            <div
              key={img}
              className="carousel-slide"
              aria-hidden={index !== safeSlide}
            >
              <img src={img} alt={`${projectName}: ${caption}`} loading={index === 0 ? 'eager' : 'lazy'} />
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button className="carousel-btn prev" onClick={goPrev} aria-label="Previous screenshot">
            &#10094;
          </button>
          <button className="carousel-btn next" onClick={goNext} aria-label="Next screenshot">
            &#10095;
          </button>
          <div className="carousel-footer">
            <span className="carousel-caption">{formatImageName(images[safeSlide], projectName)}</span>
            <span className="carousel-counter">{safeSlide + 1} / {count}</span>
          </div>
          <div className="carousel-indicators" id="carousel-indicators">
            {images.map((img, index) => (
              <button
                key={img}
                type="button"
                className={`indicator ${index === safeSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
