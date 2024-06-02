import * as React from "react";
import { css, cx } from "@linaria/core";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {}

function Group(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const { children, className, ...rest } = props;

  return (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const { span = [], aspectRatio = 1, ...props } = child.props;

        return (
          <div className={cx(classes.item, classes.span[span[0] ?? 12], span[1] && classes.span[`md:${span[1]}`])}>
            <div style={{ aspectRatio: `${aspectRatio}` }} />
            {React.createElement<any>(child.type, {
              ...props,
              captionPlacement: "overlay",
              fill: true,
              sizes: (() => {
                if (span.length === 0) {
                  return ["100vw"];
                } else {
                  const toValue = (s: number): string => `${Math.round((100 * s) / 12)}vw`;
                  return [`(min-width: 720px) ${toValue(span[1] ?? span[0] ?? 12)}`, `${toValue(span[0] ?? 12)}`];
                }
              })().join(", "),
            })}
          </div>
        );
      })}
    </Root>
  );
}

export default React.forwardRef(Group);

const classes = {
  root: css`
    display: grid;

    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;

    justify-items: stretch;
    align-items: stretch;
  `,

  item: css`
    display: grid;
    position: relative;

    & > * {
      grid-area: 1 / 1 / 1 / 1;
      place-self: stretch;
      min-width: 0;
    }
  `,

  span: {
    [`1`]: css`
      grid-column-end: span 1;
    `,
    [`2`]: css`
      grid-column-end: span 2;
    `,
    [`3`]: css`
      grid-column-end: span 3;
    `,
    [`4`]: css`
      grid-column-end: span 4;
    `,
    [`5`]: css`
      grid-column-end: span 5;
    `,
    [`6`]: css`
      grid-column-end: span 6;
    `,
    [`7`]: css`
      grid-column-end: span 7;
    `,
    [`8`]: css`
      grid-column-end: span 8;
    `,
    [`9`]: css`
      grid-column-end: span 9;
    `,
    [`10`]: css`
      grid-column-end: span 10;
    `,
    [`11`]: css`
      grid-column-end: span 11;
    `,
    [`12`]: css`
      grid-column-end: span 12;
    `,

    [`md:1`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 1;
      }
    `,
    [`md:2`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 2;
      }
    `,
    [`md:3`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 3;
      }
    `,
    [`md:4`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 4;
      }
    `,
    [`md:5`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 5;
      }
    `,
    [`md:6`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 6;
      }
    `,
    [`md:7`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 7;
      }
    `,
    [`md:8`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 8;
      }
    `,
    [`md:9`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 9;
      }
    `,
    [`md:10`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 10;
      }
    `,
    [`md:11`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 11;
      }
    `,
    [`md:12`]: css`
      @media (min-width: 720px) {
        grid-column-end: span 12;
      }
    `,
  },
};
