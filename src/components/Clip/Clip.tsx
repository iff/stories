import * as React from "react";
import { css, cx } from "@linaria/core";
import { importImage } from "../../../image.macro";
import NextImage from "next/image";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  caption?: React.ReactNode;
}

/*
 * - SQIP    : showing the low quality placeholder
 * - POSTER  : showing the poster in full resolution
 * - PLAYING : playing the video
 */

function Clip(props: Props) {
  const { caption, className, ...rest } = props;

  const posterImage = importImage("https://storage.googleapis.com/stories.caurea.org/video-2.jpg");

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

  return (
    <Root ref={ref} className={cx(classes.root, className)} {...rest}>
      <video
        className={classes.video}
        playsInline
        muted
        // loop
        // autoPlay
        // poster={posterImage.sqip.src}
        style={{
          aspectRatio: `${posterImage.width / posterImage.height}`,
        }}
        onPause={() => {
          setPlaying(false);
          ref.current.querySelector<HTMLElement>(`.${classes.poster}`).style.opacity = "1";
        }}
        onPlaying={() => {
          setPlaying(true);
        }}
        onEnded={() => {
          setPlaying(false);
        }}
      >
        <source src="https://storage.googleapis.com/stories.caurea.org/docs/video@720p.mp4" type="video/mp4" />
      </video>

      <div className={classes.poster}>
        <NextImage src={posterImage.src} layout="fill" objectFit="cover" />
        <div
          className={classes.sqip}
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${posterImage.sqip.src})` }}
        />
      </div>

      <div className={classes.actions}>
        <button
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
          {playing ? <Icons.PauseCircle /> : <Icons.PlayCircle />}
        </button>
      </div>

      {caption && <figcaption className={classes.figcaption}>{caption}</figcaption>}
    </Root>
  );
}

export default Clip;

const classes = {
  root: css`
    margin: 0;
    contain: layout;
    position: relative;
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
  `,

  poster: css`
    transition: opacity 0.4s ease-out;
  `,

  sqip: css`
    position: absolute;
    inset: 0;
    pointer-events: none;

    transition: opacity 0.8s ease-out 1.5s;

    background-size: cover;
    background-position: 50% 50%;

    z-index: 1;
  `,

  actions: css`
    position: absolute;
    bottom: 8px;
    right: 8px;
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

    svg {
      display: block;
      width: 36px;
      height: 36px;
      stroke: white;
      stroke-width: 1;
    }
  `,
};
