"use client";

import * as stylex from "@stylexjs/stylex";
import { CompiledStyles, InlineStyles, StyleXArray } from "@stylexjs/stylex/lib/StyleXTypes";
import * as React from "react";

import { color } from "@/tokens.stylex";

import Image from "next/image";
import Link, { LinkProps } from "next/link";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  video: {
    poster: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };
    };

    renditions: Array<{ url: string; dimensions: { width: number; height: number } }>;
  };

  caption?: React.ReactNode;

  /**
   * URL to open when the user clicks on the arrow in the top right of the clip.
   * Inside stories, this will open the clip in a Lightbox.
   */
  href?: LinkProps["href"];

  sx?: StyleXArray<(null | undefined | CompiledStyles) | boolean | Readonly<[CompiledStyles, InlineStyles]>>;
}

/*
 * - POSTER  : showing the poster in full resolution
 * - PLAYING : playing the video
 */

function Clip(props: Props) {
  const { video, caption, href, sx, ...rest } = props;

  const ref = React.useRef<null | HTMLDivElement>(null);
  const videoRef = React.useRef<null | HTMLVideoElement>(null);

  const [playing, setPlaying] = React.useState(false);

  const progressRef = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    let rafId: undefined | number = undefined;

    if (playing) {
      const update = () => {
        rafId = requestAnimationFrame(() => {
          if (videoRef.current && progressRef.current) {
            const video = videoRef.current;
            const progress = video.currentTime / video.duration;
            progressRef.current.style.width = `calc((100% - 10px) * ${progress})`;
          }

          update();
        });
      };

      update();
    }

    return () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }

      if (progressRef.current) {
        progressRef.current.style.width = "0px";
      }
    };
  }, [playing]);

  return (
    <Root ref={ref} {...stylex.props(styles.root, sx)} {...rest}>
      <div
        {...stylex.props(styles.wrapper)}
        style={{ aspectRatio: `${video.poster.dimensions.width} / ${video.poster.dimensions.height}` }}
      >
        <video
          ref={videoRef}
          {...stylex.props(styles.video)}
          playsInline
          onPause={() => {
            setPlaying(false);
          }}
          onPlaying={() => {
            setPlaying(true);
          }}
          onEnded={() => {
            setPlaying(false);
          }}
        >
          <source src={video.renditions[0]?.url} type="video/mp4" />
        </video>

        <Image
          {...stylex.props(styles.poster, playing ? false : styles.visible)}
          alt=""
          src={video.poster.url}
          fill
          sizes="100vw"
        />

        {href && (
          <Link {...stylex.props(styles.focus)} href={href}>
            <svg
              width={400}
              height={200}
              viewBox="-400 0 400 200"
              style={{ position: "absolute", top: -1, right: -1, cursor: "pointer" }}
            >
              <path d="M0 0 L-80 0 L0 100 Z" fill="black" />
              <g
                transform="scale(1.5) translate(-28, 4)"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </g>
            </svg>
          </Link>
        )}

        <div {...stylex.props(styles.actions)}>
          <svg
            width={400}
            height={200}
            viewBox="-400 -200 400 200"
            style={{ position: "absolute", bottom: -1, right: -1, cursor: "pointer" }}
            onClick={() => {
              const videoElement = ref.current?.querySelector("video");
              if (!videoElement) {
                return;
              }

              if (videoElement.paused) {
                videoElement.currentTime = 0;
                videoElement.play();
              } else {
                videoElement.pause();
              }
            }}
          >
            <path d="M0 0 L-250 0 L0 -80 Z" fill="black" />
            <g
              transform="translate(-90, -90) scale(3)"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {playing ? (
                <>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </>
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </g>
          </svg>
        </div>

        <div {...stylex.props(styles.progress, playing && styles.visible)} ref={progressRef} />
      </div>

      {caption && <figcaption {...stylex.props(styles.figcaption)}>{caption}</figcaption>}
    </Root>
  );
}

export default Clip;

const styles = stylex.create({
  root: {
    margin: 0,
    overflow: "hidden",
  },

  visible: {
    opacity: 1,
  },

  wrapper: {
    position: "relative",
    contain: "layout",
  },

  figcaption: {
    textAlign: "center",
    margin: "8px 0",
    fontSize: "0.75em",
    lineHeight: 1.3,
    fontStyle: "italic",
    color: color.secondaryText,
  },

  video: {
    display: "block",
    width: "100%",
    objectFit: "fill",
  },

  poster: {
    display: "block",
    opacity: 0,
    transition: "opacity 0.4s ease-out",
    objectFit: "cover",
    zIndex: 1,
  },

  focus: {
    display: "block",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
  },

  actions: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
  },

  progress: {
    position: "absolute",
    bottom: "6px",
    left: "5px",
    height: "3px",
    borderRadius: "2px",
    backgroundColor: "white",
    transition: "width 0.12s ease-out",
    opacity: 0,

    zIndex: 3,
  },
});
