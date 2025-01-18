import { Brandmark } from "@/components/Brandmark";
import { css, cx } from "@linaria/core";
import Image from "next/image";
import * as React from "react";

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

  title: string;
}

function Header(props: Props) {
  const { blob, title, className, ...rest } = props;

  return (
    <Root className={cx(className, classes.root)} {...rest}>
      <div className={classes.brandmark}>
        <Brandmark />
      </div>

      <div className={classes.image}>
        <span>
          <Image
            alt=""
            src={blob.asImage.url}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </span>
        <div
          className="sqip"
          style={{
            backgroundImage: `url(${blob.asImage.placeholder.url})`,
          }}
        />
      </div>

      <h1 className={classes.title}>{title}</h1>
    </Root>
  );
}

export default Header;

const classes = {
  root: css`
    height: 100vh;
    height: 100svh;
    max-height: 1200px;
    position: relative;
  `,

  brandmark: css`
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 3;
  `,

  image: css`
    position: relative;
    height: 100%;

    & > span:first-child {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

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
      & > span:first-child {
        margin: 56px 0 56px 88px !important;

        box-sizing: border-box;
        display: block;
        overflow: hidden;
        width: initial;
        height: initial;
        background: none;
        opacity: 1;
        border: 0;
        padding: 0;
      }

      .sqip {
        top: 56px;
        right: 0;
        bottom: 56px;
        left: 88px;
      }
    }
  `,

  title: css`
    position: absolute;
    z-index: 3;

    bottom: 24px;
    left: 24px;

    margin: 0;
    padding: 0.55em 0.7em 0.4em;

    background: #18191b;
    color: white;

    font-size: clamp(32px, 3.5vw, 80px);
    line-height: 1.2;
    font-weight: 900;
    letter-spacing: 0.09em;

    @media (min-width: 720px) {
      bottom: 112px;
      left: 148px;

      min-width: 530px;
    }
  `,
};
