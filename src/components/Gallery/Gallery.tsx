"use client";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import * as React from "react";

import { color } from "@/tokens.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  children: React.ReactNode;
}

function Gallery(props: Props) {
  const { children, ...rest } = props;

  // Extract slides from children - each top-level child is a slide
  const slides = React.useMemo(() => {
    const slideArray: React.ReactElement[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        slideArray.push(child);
      }
    });
    return slideArray;
  }, [children]);
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

  const currentSlide = slides[currentIndex];

  if (slides.length === 0) {
    return (
      <Root {...stylex.props(styles.root)} {...rest}>
        <Link
          href="/"
          {...stylex.props(styles.backButton)}
          aria-label="Back to home"
        >
          ^
        </Link>
        <div {...stylex.props(styles.slideContainer)}>
          <p>No slides found</p>
        </div>
      </Root>
    );
  }

  return (
    <Root {...stylex.props(styles.root)} {...rest}>
      <Link
        href="/"
        {...stylex.props(styles.backButton)}
        aria-label="Back to home"
      >
        ^
      </Link>

      <div {...stylex.props(styles.slideContainer)}>
        {currentSlide}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={goToPrev}
          {...stylex.props(styles.navButton, styles.navButtonPrev)}
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}
      {currentIndex < slides.length - 1 && (
        <button
          onClick={goToNext}
          {...stylex.props(styles.navButton, styles.navButtonNext)}
          aria-label="Next slide"
        >
          ›
        </button>
      )}

      <div {...stylex.props(styles.progress)}>
        {currentIndex + 1} / {slides.length}
      </div>
    </Root>
  );
}

export default Gallery;

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: color.background,
    overflow: "hidden",
    fontFamily:
      "iAWriterQuattroS, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  slideContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90vw",
    maxHeight: "85vh",
  },

  groupContainer: {
    maxWidth: "90vw",
    maxHeight: "85vh",
  },

  textSlide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },

  textContent: {
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "2rem",
  },

  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    fontSize: "60px",
    color: color.secondaryText,
    cursor: "pointer",
    padding: "2rem",
    transitionProperty: "color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    zIndex: 10,
    userSelect: "none",

    ":hover": {
      color: color.text,
    },
  },

  navButtonPrev: {
    left: "1rem",
  },

  navButtonNext: {
    right: "1rem",
  },

  progress: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    color: color.secondaryText,
    backgroundColor: color.background,
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    opacity: 0.9,
  },

  backButton: {
    position: "absolute",
    top: "1.5rem",
    left: "1.5rem",
    fontSize: "24px",
    color: color.secondaryText,
    textDecoration: "none",
    zIndex: 100,
    transitionProperty: "color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    padding: "0.5rem",

    ":hover": {
      color: color.text,
    },
  },
});
