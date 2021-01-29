import * as React from "react";
import styled from "styled-components";
/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = styled.div`
  height: 40px;
  padding: 0rem;

  margin-top: 3rem;
  border-top: 1px solid #eaeaea;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.8rem;
`;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Footer(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, ...rest } = props;

  return (
    <Root ref={ref as any} {...rest}>
      {children}
    </Root>
  );
}

export default React.forwardRef(Footer)