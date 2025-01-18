"use client";

import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { cx } from "@linaria/core";
import NextImage from "next/image";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  video?: {
    poster: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder: {
        url: string;
      };
    };

    renditions: Array<{ url: string; dimensions: { width: number; height: number } }>;
  };

  caption?: React.ReactNode;

  /**
   * Invoked when the user clicks on the arrow in the top right of the clip.
   * Inside stories, this will open the clip in a Lightbox, on a separate URL.
   *
   * XXX: The name `onFocus` is misleading, and it overrides the default DOM
   * `onFocus` event handler. Rename to something else. Ideas: `onOpen`.
   */
  onFocus?: () => void;
}

/*
 * - SQIP    : showing the low quality placeholder
 * - POSTER  : showing the poster in full resolution
 * - PLAYING : playing the video
 */

function Clip(props: Props) {
  const { video, caption, onFocus, className, ...rest } = props;

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
            progressRef.current.style.width = `calc(${progress * 100}% - 10px)`;
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
    };
  }, [playing]);

  /*
   * Hack to allow className to be appended to. Should be removed once
   * we migrate fully to StyleX.
   */
  const s = stylex.props(styles.root);

  return (
    <Root ref={ref} {...s} className={cx(s.className, className)} {...rest}>
      <div style={{ position: "relative", contain: "layout" }}>
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
          <source src={video?.renditions?.[0]?.url} type="video/mp4" />
        </video>

        <div data-poster {...stylex.props(styles.poster)} style={{ opacity: playing ? 0 : 1 }}>
          {video?.poster?.url && (
            <NextImage
              alt=""
              src={video?.poster?.url}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          )}
          <div {...stylex.props(styles.sqip)} style={{ backgroundImage: `url(${video?.poster?.placeholder?.url})` }} />
        </div>

        {onFocus && (
          <div {...stylex.props(styles.focus)} onClick={onFocus}>
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
          </div>
        )}

        <div {...stylex.props(styles.actions)}>
          <svg
            width={400}
            height={200}
            viewBox="-400 -200 400 200"
            style={{ position: "absolute", bottom: -1, right: -1, cursor: "pointer" }}
            onClick={() => {
              const videoElement = ref.current?.querySelector("video");
              const posterElement = ref.current?.querySelector<HTMLElement>(`[data-poster]`);
              if (!videoElement || !posterElement) {
                return;
              }

              if (videoElement.paused) {
                videoElement.currentTime = 0;
                videoElement.play();
                posterElement.style.opacity = "0";
              } else {
                videoElement.pause();
                posterElement.style.opacity = "1";
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

        {playing && <div {...stylex.props(styles.progress)} ref={progressRef} />}
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

  figcaption: {
    textAlign: "center",
    margin: "8px 0",
    fontSize: "0.75em",
    lineHeight: 1.3,
    fontStyle: "italic",
    color: "var(--secondary-text-color)",
  },

  video: {
    display: "block",
    width: "100%",
    objectFit: "fill",
  },

  poster: {
    transition: "opacity 0.4s ease-out",
  },

  img: {
    zIndex: 2,
  },

  sqip: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",

    backgroundSize: "cover",
    backgroundPosition: "50% 50%",

    zIndex: 1,
  },

  focus: {
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
    background: "white",

    zIndex: 3,
  },
});
