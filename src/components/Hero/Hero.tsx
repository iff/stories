import { Brandmark } from "@/components/Brandmark";
import { css, cx } from "@linaria/core";
import Image from "next/image";
import * as React from "react";
import { importBlob } from "../../../image.macro";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

const blob = importBlob("DtmNcLbCUqzbXVfgQSowJeJZTTs9UztyYkupTzAQzbCf");

function Hero(props: Props) {
  const { className, ...rest } = props;

  const ref = React.useRef<null | HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector('img[decoding="async"]');
    if (img) {
      {
        img.addEventListener(
          "load",
          () => {
            setLoaded(true);
          },
          { once: true }
        );
      }
    }
  }, []);

  return (
    <Root className={cx(classes.root, className)} {...rest}>
      <div ref={ref} className={classes.image}>
        <Image
          alt=""
          src={blob.asImage.url}
          loader={({ src, width }) => `${src}?w=${width}`}
          layout="fill"
          objectFit="cover"
        />
        <div
          className="sqip"
          style={{
            opacity: loaded ? 0 : 1,
            backgroundImage: `url(${blob.asImage.placeholder.url})`,
          }}
        />
      </div>

      <div className={classes.box}>
        <Brandmark className={classes.brandmark} />
        <div className={classes.lead}>…for nothing remains of us but the vibrations we leave behind.</div>
      </div>
    </Root>
  );
}

export default Hero;

const classes = {
  root: css`
    height: 100vh;
    height: 100svh;
    display: grid;
    place-items: center;
    justify-items: center;
    isolation: isolate;
  `,

  box: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  `,

  brandmark: css`
    font-size: clamp(44px, 4vw, 80px);
  `,

  lead: css`
    background: #18191b;
    color: white;
    text-align: center;

    padding: 0.7em 1em;

    font-size: clamp(20px, 1.5vw, 36px);
    line-height: 1.3;

    max-width: min(30ch, 80vw);
    margin-top: 2em;
  `,

  image: css`
    position: relative;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    height: 100svh;

    grid-column: 1 / span 1;
    grid-row: 1 / span 1;

    &:after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: radial-gradient(circle, transparent 70%, black 200%);
      z-index: 2;
    }

    .sqip {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      transition: opacity 0.8s ease-out 0.2s;
      background-size: cover;
      background-position: 50% 50%;

      z-index: 1;
    }

    @media (min-width: 720px) {
      width: calc(100vw - 176px);
      height: calc(100vh - 140px);
      height: calc(100svh - 140px);
    }
  `,
};
