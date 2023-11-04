"use client";

import { css, cx } from "@linaria/core";
import Image from "next/legacy/image";
import Link from "next/link";
import * as React from "react";
import * as Icons from "react-feather";
import { FormattedDate, FormattedMessage } from "react-intl";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

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

  story: {
    id: string;
  };

  blocks?: Array<Props["blob"]>;

  date?: Date | [Date, Date];

  title: string;

  teaser?: React.ReactNode;

  layout?: "regular" | "inverted";
}

function StoryCard(props: Props) {
  const { story, blocks = [], blob, date, title, teaser, layout = "regular", ...rest } = props;

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
    <div ref={ref as any} {...rest} className={cx(classes.root, tweaks[layout])}>
      <h2 className={classes.title}>{title}</h2>

      <div className={cx(classes.image)}>
        <Image
          alt=""
          loader={({ src, width }) => `${src}?w=${width}`}
          src={blob.asImage.url}
          layout="fill"
          objectFit="cover"
        />
        <div
          className="sqip"
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${blob.asImage.placeholder.url})` }}
        />
      </div>

      <div className={classes.teaser}>
        <div>
          {date && (
            <div className={classes.date}>
              {(() => {
                if (Array.isArray(date)) {
                  const [from, to] = date;

                  if (from.getUTCFullYear() === to.getUTCFullYear()) {
                    if (from.getUTCMonth() === to.getUTCMonth()) {
                      return (
                        <FormattedMessage
                          id="hQR6Zk3"
                          defaultMessage="{month} {from} – {to}, {year}"
                          values={{
                            month: <FormattedDate value={from} month="long" />,
                            from: <FormattedDate value={from} day="numeric" />,
                            to: <FormattedDate value={to} day="numeric" />,
                            year: <FormattedDate value={to} year="numeric" />,
                          }}
                        />
                      );
                    } else {
                      return (
                        <FormattedMessage
                          id="xo4t6Jj"
                          defaultMessage="{from} – {to}"
                          values={{
                            from: <FormattedDate value={from} month="long" day="numeric" />,
                            to: <FormattedDate value={to} month="long" day="numeric" year="numeric" />,
                          }}
                        />
                      );
                    }
                  } else {
                    return (
                      <FormattedMessage
                        id="pakxPSK"
                        defaultMessage="{from} – {to}"
                        values={{
                          from: <FormattedDate value={from} month="long" day="numeric" year="numeric" />,
                          to: <FormattedDate value={to} month="long" day="numeric" year="numeric" />,
                        }}
                      />
                    );
                  }
                } else {
                  return <FormattedDate value={date} />;
                }
              })()}
            </div>
          )}

          {teaser}

          <Link href={`/${story.id}`} passHref legacyBehavior>
            <a className={classes.read}>
              <Icons.ArrowRight size={"1.1em"} /> read this story
            </a>
          </Link>
        </div>
      </div>

      <div className={cx(classes.image2)}>
        <Image
          alt=""
          loader={({ src, width }) => `${src}?w=${width}`}
          src={(blocks[0] ?? blob).asImage.url}
          {...(blocks[0] ?? blob).asImage.dimensions}
          objectFit="cover"
        />
        <div
          className="sqip"
          style={{ opacity: loaded ? 0 : 1, backgroundImage: `url(${(blocks[0] ?? blob).asImage.placeholder.url})` }}
        />
      </div>
    </div>
  );
}

export default StoryCard;

const tweaks = {
  regular: css``,
  inverted: css`
    @media (min-width: 720px) {
      grid-template-areas:
        ". . . title title title title title title"
        "teaser teaser teaser image image image image . ."
        "si si si image image image image . ." !important;
    }
  `,
};

const classes = {
  root: css`
    display: grid;

    text-decoration: none;

    --gap: 16px;

    --nc-w: 384px;
    --mc-w: 160px;
    --xc-w: 192px;

    grid-template-columns:
      [vs]
      max(16px, env(safe-area-inset-left))
      [xs]
      0
      [ms]
      0
      [ns]
      1fr
      [ne]
      0
      [me]
      0
      [xe]
      max(16px, env(safe-area-inset-right))
      [ve];

    grid-template-areas:
      ". title title title title title title"
      "image image image image image image image"
      ". teaser teaser teaser teaser teaser .";

    @media (min-width: 720px) {
      --gap: 32px;

      grid-template-columns:
        [vs]
        1fr
        max(16px, env(safe-area-inset-left))
        [xs]
        minmax(0, var(--xc-w))
        [ms]
        var(--mc-w)
        [ns]
        var(--nc-w)
        [ne]
        var(--mc-w)
        [me]
        minmax(0, var(--xc-w))
        [xe]
        max(16px, env(safe-area-inset-right))
        1fr
        [ve];

      grid-template-rows: min-content minmax(0, min-content) 1fr;

      grid-template-areas:
        ". . . . title title title title title"
        ". . image image image image teaser teaser teaser"
        ". . image image image image si si si";
    }

    .sqip {
      position: absolute;
      inset: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      transition: opacity 0.8s ease-out 0.5s;
      background-size: cover;
      background-position: 50% 50%;

      z-index: 1;
    }
  `,

  image: css`
    position: relative;
    height: 0;
    padding-bottom: 100%;

    grid-area: image;

    @media (min-width: 720px) {
      padding-bottom: calc((11 / 16) * 100%);
    }
  `,

  image2: css`
    position: relative;

    margin: 32px;

    grid-area: si;

    display: none;
    @media (min-width: 720px) {
      display: block;
    }
  `,

  title: css`
    font-size: clamp(32px, 3vw, 60px);
    line-height: 1.2;
    font-weight: 900;
    letter-spacing: 0.09em;

    margin: 0 0 var(--gap) 0;
    padding: 0.5em 0.7em 0.4em;

    background: #18191b;
    color: rgba(255 255 255 / 0.96);

    grid-area: title;

    :global(:root[data-theme="dark"]) & {
      background: transparent;
      border-bottom: 5px solid currentColor;
      padding-bottom: 0.2em;
    }
  `,

  teaser: css`
    font-size: clamp(20px, 1.5vw, 24px);
    line-height: 1.4;

    margin: var(--gap) 0 0 0;

    grid-area: teaser;

    @media (min-width: 720px) {
      margin: 0 32px;
      ${tweaks.inverted} & {
        display: flex;
        justify-content: flex-end;
      }

      & > div {
        max-width: 530px;
      }
    }
  `,

  date: css`
    margin-bottom: 16px;
    opacity: 0.6;
    font-size: clamp(16px, 1.5vw, 20px);
  `,

  read: css`
    font-size: clamp(16px, 1.5vw, 20px);
    display: block;
    margin-top: 56px;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 6px;

    color: inherit;
    text-decoration: none;

    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    & > svg {
      margin: 0 8px 0 0;
    }
  `,
};
