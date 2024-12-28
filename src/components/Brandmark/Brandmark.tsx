import { css, cx } from "@linaria/core";
import Link from "next/link";
import * as React from "react";

interface Props extends React.ComponentPropsWithoutRef<"a"> {}

function Brandmark(props: Props, ref: React.ForwardedRef<React.ComponentRef<"a">>) {
  const { className, ...rest } = props;

  return (
    <Link ref={ref} href="/" className={cx(classes.root, className)} {...rest}>
      <div>Stories</div>
      <div>by Tomáš Čarnecký</div>
    </Link>
  );
}

export default React.forwardRef(Brandmark);

const classes = {
  root: css`
    display: block;
    text-decoration: none;
    text-align: center;

    font-size: clamp(32px, 3.5vw, 80px);
    line-height: 1;

    padding: 0.5em 0.7em;

    background: #18191b;
    color: white;

    & > *:first-child {
      font-weight: 900;
      letter-spacing: 0.11em;
    }
    & > *:last-child {
      font-size: 0.45em;

      padding-top: 0.2em;
      opacity: 0.75;
    }
  `,
};
