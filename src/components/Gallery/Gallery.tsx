"use client";

import * as stylex from "@stylexjs/stylex";
import NextImage from "next/image";
import Link from "next/link";
import * as React from "react";
import { Group } from "@/components/Group";
import { Image as ImageComponent } from "@/components/Image";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface GallerySlide {
  type: "image" | "video" | "text" | "group";
  blobId?: string;
  caption?: string;
  textContent?: string;
  blob?: {
    name: string;
    asImage: {
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
      placeholder?: {
        url: string;
      };
    };
  };
  images?: Array<{
    id: string;
    caption?: string;
    span?: number[];
    aspectRatio?: number;
    blob?: {
      name: string;
      asImage: {
        url: string;
        dimensions: {
          width: number;
          height: number;
        };
        placeholder?: {
          url: string;
        };
      };
    };
  }>;
}

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  slides: GallerySlide[];
}

function Gallery(props: Props) {
  const { slides, ...rest } = props;
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

  return (
    <Root {...stylex.props(styles.root)} {...rest}>
      {/* Back to home button */}
      <Link href="/" {...stylex.props(styles.backButton)} aria-label="Back to home">
        ^
      </Link>

      <div {...stylex.props(styles.slideContainer)}>
        {currentSlide.type === "image" && currentSlide.blob && (
          <div {...stylex.props(styles.imageWrapper)}>
            <div {...stylex.props(styles.imageContainer)}>
              <NextImage
                src={currentSlide.blob.asImage.url}
                alt={currentSlide.caption || ""}
                width={currentSlide.blob.asImage.dimensions.width}
                height={currentSlide.blob.asImage.dimensions.height}
                placeholder={currentSlide.blob.asImage.placeholder ? "blur" : undefined}
                blurDataURL={currentSlide.blob.asImage.placeholder?.url}
                style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '85vh' }}
              />
            </div>
            {currentSlide.caption && (
              <div {...stylex.props(styles.caption)}>{currentSlide.caption}</div>
            )}
          </div>
        )}

        {currentSlide.type === "group" && currentSlide.images && (
          <div {...stylex.props(styles.groupSlide)}>
            <Group>
              {currentSlide.images.map((image) => {
                if (!image.blob) return null;
                return (
                  <ImageComponent
                    key={image.id}
                    blob={image.blob}
                    span={image.span}
                    aspectRatio={image.aspectRatio}
                  />
                );
              })}
            </Group>
          </div>
        )}

        {currentSlide.type === "text" && (
          <div {...stylex.props(styles.textSlide)}>
            <div {...stylex.props(styles.textContent)}>
              {currentSlide.textContent?.split("\n\n").map((paragraph, idx) => {
                // Check if it's a heading
                if (paragraph.startsWith("##")) {
                  const text = paragraph.replace(/^##\s*/, "");
                  return (
                    <h2 key={idx} {...stylex.props(styles.textHeading)}>
                      {text}
                    </h2>
                  );
                } else if (paragraph.startsWith("###")) {
                  const text = paragraph.replace(/^###\s*/, "");
                  return (
                    <h3 key={idx} {...stylex.props(styles.textSubheading)}>
                      {text}
                    </h3>
                  );
                }
                // Regular paragraph
                return (
                  <p key={idx} {...stylex.props(styles.textParagraph)}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
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

      {/* Progress indicator */}
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
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  slideContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    padding: "2rem",
  },

  imageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  caption: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#333",
    textAlign: "center",
    maxWidth: "600px",
    padding: "0 1rem",
  },

  groupSlide: {
    width: "90vw",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: "2rem",
    margin: "0 auto",
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

  textHeading: {
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: 1.3,
    color: "#111",
    marginTop: 0,
    marginBottom: "1.5rem",
  },

  textSubheading: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#222",
    marginTop: "2rem",
    marginBottom: "1rem",
  },

  textParagraph: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#333",
    marginTop: 0,
    marginBottom: "1.2rem",
  },

  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    fontSize: "60px",
    color: "#999",
    cursor: "pointer",
    padding: "2rem",
    transitionProperty: "color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    zIndex: 10,
    userSelect: "none",

    ":hover": {
      color: "#333",
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
    color: "#999",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
  },

  backButton: {
    position: "absolute",
    top: "1.5rem",
    left: "1.5rem",
    fontSize: "24px",
    color: "#ccc",
    textDecoration: "none",
    zIndex: 100,
    transitionProperty: "color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    padding: "0.5rem",

    ":hover": {
      color: "#666",
    },
  },
});
