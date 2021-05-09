import * as React from "react";
import NextImage from "next/image";
import { css, cx } from "@linaria/core";
import Link, { LinkProps } from "next/link";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  image?: {
    src: string;

    width: number;
    height: number;

    sqip: {
      src: string;
    };
  };

  layout?: "intrinsic" | "fill";

  caption?: React.ReactNode;
  captionPlacement?: "below" | "overlay";

  span?: number | number[];
  aspectRatio?: number;

  highlight?: boolean;

  href?: LinkProps["href"];
}

function Image(props: Props) {
  const {
    image,
    layout = "intrinsic",
    caption,
    captionPlacement = "below",
    highlight,
    style,
    href,
    className,
    ...rest
  } = props;

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

  React.useEffect(() => {
    if (highlight) {
      ref.current?.querySelector("a")?.focus();
    }
  }, [highlight]);

  return (
    <Root
      ref={ref}
      style={style}
      className={cx(classes.root, className, classes.captionPlacement[captionPlacement])}
      {...rest}
    >
      <figure>
        <Link passHref href={href}>
          <a>
            <NextImage
              src={image.src}
              width={layout === "fill" ? undefined : image.width}
              height={layout === "fill" ? undefined : image.height}
              layout={layout as any}
              objectFit={layout === "fill" ? "cover" : undefined}
            />
            <div className="sqip" style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${image.sqip.src})` }} />
          </a>
        </Link>
      </figure>

      {caption && <figcaption>{caption}</figcaption>}
    </Root>
  );
}

export default Image;

const classes = {
  root: css`
    position: relative;
    contain: layout;
    display: grid;

    & a {
      display: block;
      color: inherit;
      text-decoration: none;
      height: 100%;

      outline-offset: 2px;
    }

    & a > div {
      display: block !important;
    }

    & img {
      display: block;
    }

    & > figure {
      cursor: pointer;
      position: relative;
      margin: 0;
    }

    .sqip {
      position: absolute;
      inset: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;

      transition: opacity 0.8s ease-out 1.5s;

      background-size: cover;
      background-position: 50% 50%;

      z-index: -1;
    }

    & > figure > div {
      display: block !important;
      z-index: -2;
    }

    & > figcaption {
      text-align: center;
      margin: 8px 0;
      font-size: 0.75em;
      line-height: 1.3;
      font-style: italic;
      opacity: 0.7;
    }
  `,


  captionPlacement: {
    overlay: css`
      & > figcaption {
        position: absolute;
        margin: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: white;
        padding: 30px 20px 12px;
        text-align: left;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
      }

      &:hover > figcaption {
        opacity: 1;
      }
      &:focus-within > figcaption {
        opacity: 1;
      }
    `,
  },
};
