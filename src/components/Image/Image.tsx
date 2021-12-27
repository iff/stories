import { css, cx } from "@linaria/core";
import NextImage from "next/image";
import Link, { LinkProps } from "next/link";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blobId?: string;

  image?: {
    url?: string;

    dimensions?: {
      width: number;
      height: number;
    };

    placeholder?: {
      url: string;
    };

    src: string;
    width: number;
    height: number;

    sqip: {
      src: string;
    };
  };

  /**
   * @def "responsive"
   */
  layout?: "responsive" | "fill";

  caption?: React.ReactNode;

  /**
   * @def "below"
   */
  captionPlacement?: "below" | "overlay";

  span?: number | number[];
  aspectRatio?: number;

  highlight?: boolean;

  href?: LinkProps["href"];
}

function Image(props: Props) {
  const {
    blobId,
    image,
    layout = "responsive",
    caption,
    captionPlacement = "below",
    highlight,
    href,
    className,
    ...rest
  } = props;

  const ref = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const img = ref.current?.querySelector<null | HTMLImageElement>('img[decoding="async"]');
    if (img) {
      const onLoad = () => {
        if (!img.src.match(/data:image\/gif/)) {
          img.removeEventListener("load", onLoad);
        }
      };

      img.addEventListener("load", onLoad);

      return () => {
        img.removeEventListener("load", onLoad);
      };
    }
  }, []);

  React.useEffect(() => {
    if (highlight) {
      ref.current?.querySelector("a")?.focus();
    }
  }, [highlight]);

  return (
    <Root ref={ref} className={cx(classes.root, className, classes.captionPlacement[captionPlacement])} {...rest}>
      <Link passHref href={href}>
        <a>
          <NextImage
            loader={blobId ? ({ src, width }) => `${src}?w=${width}` : undefined}
            src={image.url ?? image.src}
            width={layout === "fill" ? undefined : image.dimensions?.width ?? image.width}
            height={layout === "fill" ? undefined : image.dimensions?.height ?? image.height}
            layout={layout as any}
            objectFit={layout === "fill" ? "cover" : undefined}
          />
          <div
            className={classes.placeholder}
            style={{ backgroundImage: `url(${image.placeholder?.url ?? image.sqip.src})` }}
          />
        </a>
      </Link>

      {caption && <figcaption className={classes.figcaption}>{caption}</figcaption>}
    </Root>
  );
}

export default Image;

const classes = {
  root: css`
    contain: layout;
    display: grid;
    width: 100%;

    margin: 0;

    & > span {
      display: block !important;
      z-index: -2;
    }

    & a {
      position: relative;
      display: block;
      color: inherit;
      text-decoration: none;

      outline-offset: 2px;
    }

    & a > span {
      display: block !important;
    }

    & img {
      display: block;
    }
  `,

  placeholder: css`
    position: absolute;
    inset: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;

    background-size: cover;
    background-position: 50% 50%;

    z-index: -1;
  `,

  figcaption: css`
    text-align: center;
    margin: 8px 0;
    font-size: 0.75em;
    line-height: 1.3;
    font-style: italic;
    opacity: 0.7;
  `,

  captionPlacement: {
    overlay: css`
      & figcaption {
        position: absolute;
        margin: 0;
        left: 6px;
        right: 6px;
        bottom: 6px;
        background: rgba(0, 0, 0, 0.85);
        color: #fefefe;
        padding: 8px 10px;
        text-align: left;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 6px black;
      }

      &:hover figcaption {
        opacity: 1;
      }
      &:focus-within figcaption {
        opacity: 1;
      }
    `,
  },
};
