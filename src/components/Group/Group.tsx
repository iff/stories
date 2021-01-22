import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Group(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref} {...rest} className="fw">
      {children}
    </Root>
  );
}

export default React.forwardRef(Group)
