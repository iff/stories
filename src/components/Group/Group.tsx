import * as stylex from "@stylexjs/stylex";
import { CompiledStyles, InlineStyles, StyleXArray } from "@stylexjs/stylex/lib/StyleXTypes";
import * as React from "react";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  sx?: StyleXArray<(null | undefined | CompiledStyles) | boolean | Readonly<[CompiledStyles, InlineStyles]>>;
}

function Group(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { children, sx, ...rest } = props;

  return (
    <Root ref={ref} {...stylex.props(styles.root, sx)} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const { span = [], aspectRatio = 1, ...props } = child.props as { span?: Array<number>; aspectRatio?: number };

        return (
          <div
            {...stylex.props(
              styles.item,
              spanVariants[`${span[0] ?? 12}` as keyof typeof spanVariants],
              typeof span[1] === "number" ? spanVariants[`md:${span[1]}` as keyof typeof spanVariants] : undefined,
            )}
          >
            <div {...stylex.props(styles.itemChild)} style={{ aspectRatio: `${aspectRatio}` }} />
            {React.createElement(child.type, {
              ...props,

              sx: styles.itemChild,

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

const styles = stylex.create({
  root: {
    display: "grid",

    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: "1rem",

    justifyItems: "stretch",
    alignItems: "stretch",
  },

  item: {
    display: "grid",
    position: "relative",
  },

  itemChild: {
    gridArea: "1 / 1 / 1 / 1",
    placeSelf: "stretch",
    minWidth: 0,
  },
});

const spanVariants = stylex.create({
  "1": {
    gridColumnEnd: "span 1",
  },
  "2": {
    gridColumnEnd: "span 2",
  },
  "3": {
    gridColumnEnd: "span 3",
  },
  "4": {
    gridColumnEnd: "span 4",
  },
  "5": {
    gridColumnEnd: "span 5",
  },
  "6": {
    gridColumnEnd: "span 6",
  },
  "7": {
    gridColumnEnd: "span 7",
  },
  "8": {
    gridColumnEnd: "span 8",
  },
  "9": {
    gridColumnEnd: "span 9",
  },
  "10": {
    gridColumnEnd: "span 10",
  },
  "11": {
    gridColumnEnd: "span 11",
  },
  "12": {
    gridColumnEnd: "span 12",
  },

  "md:1": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 1",
    },
  },
  "md:2": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 2",
    },
  },
  "md:3": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 3",
    },
  },
  "md:4": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 4",
    },
  },
  "md:5": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 5",
    },
  },
  "md:6": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 6",
    },
  },
  "md:7": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 7",
    },
  },
  "md:8": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 8",
    },
  },
  "md:9": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 9",
    },
  },
  "md:10": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 10",
    },
  },
  "md:11": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 11",
    },
  },
  "md:12": {
    "@media (min-width: 720px)": {
      gridColumnEnd: "span 12",
    },
  },
});
