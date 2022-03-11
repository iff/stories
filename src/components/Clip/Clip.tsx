import { css, cx } from "@linaria/core";
import NextImage from "next/image";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blobId?: string;

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
  const { blobId, video, caption, onFocus, className, ...rest } = props;

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
      cancelAnimationFrame(rafId);
    };
  }, [playing]);

  return (
    <Root ref={ref} className={cx(classes.root, className)} {...rest}>
      <div style={{ position: "relative", contain: "layout" }}>
        <video
          ref={videoRef}
          className={classes.video}
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

        <div className={classes.poster} style={{ opacity: playing ? 0 : 1 }}>
          <NextImage src={video?.poster?.url} layout="fill" objectFit="cover" />
          <div
            className={classes.sqip}
            style={{ backgroundImage: `url(${video?.poster?.placeholder?.url})` }}
          />
        </div>

        {onFocus && (
          <div className={classes.focus} onClick={onFocus}>
            <svg
              width={400}
              height={200}
              viewBox="-400 0 400 200"
              style={{ position: "absolute", top: 0, right: 0, zIndex: -1, cursor: "pointer" }}
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

        <div className={classes.actions}>
          <svg
            width={400}
            height={200}
            viewBox="-400 -200 400 200"
            style={{ position: "absolute", bottom: 0, right: 0, zIndex: -1, cursor: "pointer" }}
            onClick={() => {
              const videoElement = ref.current.querySelector("video");
              if (videoElement.paused) {
                videoElement.currentTime = 0;
                videoElement.play();
                ref.current.querySelector<HTMLElement>(`.${classes.poster}`).style.opacity = "0";
              } else {
                videoElement.pause();
                ref.current.querySelector<HTMLElement>(`.${classes.poster}`).style.opacity = "1";
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

        {playing && <div className={classes.progress} ref={progressRef} />}
      </div>

      {caption && <figcaption className={classes.figcaption}>{caption}</figcaption>}
    </Root>
  );
}

export default Clip;

const classes = {
  root: css`
    margin: 0;
  `,

  figcaption: css`
    text-align: center;
    margin: 8px 0;
    font-size: 0.75em;
    line-height: 1.3;
    font-style: italic;
    opacity: 0.7;
  `,

  video: css`
    display: block;
    width: 100%;
    object-fit: fill;
  `,

  poster: css`
    transition: opacity 0.4s ease-out;

    img {
      z-index: 2;
    }
  `,

  sqip: css`
    position: absolute;
    inset: 0;
    pointer-events: none;

    background-size: cover;
    background-position: 50% 50%;

    z-index: 1;
  `,

  focus: css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  `,

  actions: css`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;

    & > button {
      display: block;
      background: none;
      outline: none;
      border: none;

      padding: 3px;
      background: black;
      border-radius: 100%;

      cursor: pointer;
    }

    button svg {
      display: block;
      width: 36px;
      height: 36px;
      stroke: white;
      stroke-width: 1;
    }
  `,

  progress: css`
    position: absolute;
    bottom: 6px;
    left: 5px;
    height: 3px;
    border-radius: 2px;
    background: white;

    z-index: 3;
  `,
};
