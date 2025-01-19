import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { vars } from "./variables.stylex";


/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Content(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref} {...stylex.props(styles.root)} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Content);

const styles = stylex.create({
  root: {
    display: "grid",
    rowGap: "2em",

    gridTemplateColumns:
      "[le] max(1em, env(safe-area-inset-left)) [lex lc] 1fr [rc rex] max(1em, env(safe-area-inset-right)) [re]",

    /*
     * Can't use var() nor env() in media queries :(
     *
     * > (min-width: calc(var(--center-column) + max(1em, env(safe-area-inset-left)) + max(1em, env(safe-area-inset-right))))
     */
    "@media (min-width: calc(36em + 2em))": {
      gridTemplateColumns:
        `[le] 1fr max(1em, env(safe-area-inset-left)) [lex] minmax(0, ${vars.extendedColumn}) [lc] ${vars.centerColumn} [rc] minmax(0, ${vars.extendedColumn}) [rex] max(1em, env(safe-area-inset-right)) 1fr [re]`
    },
  },
})
