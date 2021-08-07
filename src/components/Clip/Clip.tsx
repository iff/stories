import { css, cx } from "@linaria/core";
import NextImage from "next/image";
import * as React from "react";
import { useImmer } from "use-immer";
import { Image } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  clip: {
    id: string;

    blob: {
      url: string;
    };

    poster: Image;

    renditions?: Array<{
      label: string;
      height: number;
      url: string;
    }>;
  };

  caption?: React.ReactNode;

  onFocus?: () => void;
}

/*
 * - SQIP    : showing the low quality placeholder
 * - POSTER  : showing the poster in full resolution
 * - PLAYING : playing the video
 */

function Clip(props: Props) {
  const { clip, caption, onFocus, className, ...rest } = props;

  const ref = React.useRef<null | HTMLDivElement>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]') as HTMLImageElement;
    if (img) {
      const onLoad = () => {
        if (!img.src.match(/data:image\/gif/)) {
          setLoaded(true);
          img.removeEventListener("load", onLoad);
        }
      };

      img.addEventListener("load", onLoad);
    }
  }, []);

  const [playing, setPlaying] = React.useState(false);

  const videoRef = React.useRef<null | HTMLVideoElement>(null);

  const progressRef = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    // console.log("useEffect", playing);
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
          <source src={clip.blob.url} type="video/mp4" />
        </video>

        <div className={classes.poster} style={{ opacity: playing ? 0 : 1 }}>
          <NextImage src={clip.poster.src} layout="fill" objectFit="cover" />
          <div className={classes.sqip} style={{ backgroundImage: `url(${clip.poster.sqip.src})` }} />
        </div>

        <div className={classes.focus} onClick={onFocus}>
          <svg
            width={400}
            height={200}
            viewBox="-400 0 400 200"
            style={{ position: "absolute", top: 0, right: 0, zIndex: -1, cursor: "pointer" }}
          >
            <path d="M0 0 L-80 0 L0 100 Z" fill="black" />
            <g
              transform="translate(-37, 15) scale(1.1)"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </g>
          </svg>
        </div>

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
