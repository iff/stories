import { css, cx } from "@linaria/core";
import NextImage from "next/image";
import Link, { LinkProps } from "next/link";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "figure";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blob: {
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder: {
        url: string;
      };
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

  href?: LinkProps["href"];

  /*
   * The 'span' and 'aspectRatio' props are not actually used by this component.
   * But they are sometimes passed to the component when it's rendered inside a
   * <Group>, and without adding them to the props here TypeScript would
   * complain.
   *
   * XXX: There has to be a better way to support this.
   */
  span?: number | number[];
  aspectRatio?: number;
}

function Image(props: Props) {
  const {
    blob,
    layout = "responsive",
    caption,
    captionPlacement = "below",
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

  return (
    <Root ref={ref} className={cx(classes.root, className, classes.captionPlacement[captionPlacement])} {...rest}>
      {(() => {
        if (href) {
          return (
            <Link passHref href={href}>
              <a className={classes.image}>
                <NextImage
                  loader={({ src, width }) => `${src}?w=${width}`}
                  src={blob.asImage.url}
                  width={layout === "fill" ? undefined : blob.asImage.dimensions.width}
                  height={layout === "fill" ? undefined : blob.asImage.dimensions.height}
                  layout={layout as any}
                  objectFit={layout === "fill" ? "cover" : undefined}
                />
                <div
                  className={classes.placeholder}
                  style={{ backgroundImage: `url(${blob.asImage.placeholder.url})` }}
                />
              </a>
            </Link>
          );
        } else {
          return (
            <div className={classes.image}>
              <NextImage
                loader={({ src, width }) => `${src}?w=${width}`}
                src={blob.asImage.url}
                width={layout === "fill" ? undefined : blob.asImage.dimensions.width}
                height={layout === "fill" ? undefined : blob.asImage.dimensions.height}
                layout={layout as any}
                objectFit={layout === "fill" ? "cover" : undefined}
              />
              <div
                className={classes.placeholder}
                style={{ backgroundImage: `url(${blob.asImage.placeholder.url})` }}
              />
            </div>
          );
        }
      })()}

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
    isolation: isolate;

    margin: 0;

    & > span {
      display: block !important;
      z-index: -2;
    }

    & img {
      display: block;
    }
  `,

  image: css`
    position: relative;
    display: block;
    color: inherit;
    text-decoration: none;

    outline-offset: 2px;

    & > span {
      display: block !important;
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
    color: var(--secondary-text-color);
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
