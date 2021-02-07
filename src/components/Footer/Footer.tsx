import * as React from "react";
import { css, cx } from "@linaria/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

const classes = {
  root: css`
  height: 40px;
  padding: 0rem;

  margin-top: 3rem;
  border-top: 1px solid #eaeaea;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8rem;
  `,
};

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Footer(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <div ref={ref as any} {...rest} className={cx(classes.root)}>
      {children}
    </div>
  );
}

export default React.forwardRef(Footer)