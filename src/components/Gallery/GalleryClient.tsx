"use client";

import * as React from "react";

interface Props {
  slides: React.ReactNode[];
  onIndexChange?: (index: number) => void;
}

export function GalleryClient(props: Props) {
  const { slides } = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <>
      {slides[currentIndex]}

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
        {currentIndex + 1} / {slides.length}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={goToPrev}
          style={{ position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}
        >
          ‹
        </button>
      )}

      {currentIndex < slides.length - 1 && (
        <button
          onClick={goToNext}
          style={{ position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}
        >
          ›
        </button>
      )}
    </>
  );
}
