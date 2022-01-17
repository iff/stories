import { css, cx } from "@linaria/core";
import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function Heading_(props: Props) {
  return (
    <div
      className={cx(
        "noLayout",
        css`
          grid-column: lex / rc;
        `
      )}
    >
      <h2
        className={css`
          display: inline-block;

          margin: 2em 0 1em;
          padding: 0.55em 0.7em 0.4em;

          background: black;
          color: white;

          font-size: clamp(32px, 3.5vw, 80px);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: 0.09em;
        `}
        {...props}
      />
    </div>
  );
}
