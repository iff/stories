import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import { Clip } from "@/components/Clip";
import { Group } from "@/components/Group";
import { Image } from "@/components/Image";

import { vars } from "./variables.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  storyId: string;

  blobs: Array<{
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder?: {
        url: string;
      };
    };

    asVideo: {
      poster: {
        url: string;

        dimensions: {
          width: number;
          height: number;
        };

        placeholder: {
          url: string;
        };
      };

      renditions: Array<{ url: string; dimensions: { width: number; height: number } }>;
    };
  }>;

  Component: React.ComponentType<{
    components: Record<string, unknown>;
  }>;
}

function Body(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const { storyId, blobs, Component, ...rest } = props;

  return (
    <Root ref={ref} {...stylex.props(styles.root)} {...rest}>
      <Component
        components={{
          h1: (props: React.ComponentProps<"h1">) => <h2 {...stylex.props(styles.h2)} {...props} />,
          h2: (props: React.ComponentProps<"h2">) => <h3 {...stylex.props(styles.h3)} {...props} />,

          p: (props: React.ComponentProps<"p">) => <p {...stylex.props(styles.p)} {...props} />,

          blockquote: (props: React.ComponentProps<"blockquote">) => (
            <blockquote {...stylex.props(styles.blockquote)} {...props} />
          ),

          Clip: ({ blobId }: { blobId: string }) => {
            const blob = blobs.find((x) => x.name === blobId);
            if (!blob) {
              return <div>Clip {blobId} not found!</div>;
            }

            return <Clip id={blobId} video={blob.asVideo} href={`/${storyId}/${blobId}`} sx={styles.extendedWidth} />;
          },

          Group: (props: React.ComponentProps<"div">) => {
            const { children, ...rest } = props;

            return (
              <Group sx={styles.extendedWidth} {...rest}>
                {React.Children.map(children, (child) => {
                  if (!React.isValidElement(child)) {
                    return child;
                  }

                  const childProps = child.props as { blobId?: string; aspectRatio?: number };

                  /*
                   * If the child element is an Image, and is missing 'aspectRatio',
                   * compute it from the image dimensions.
                   */
                  if (childProps?.blobId) {
                    const props = { ...childProps };

                    const blob = blobs.find((x) => x.name === childProps.blobId);
                    if (!props.aspectRatio && blob?.asImage?.dimensions) {
                      const { width, height } = blob.asImage.dimensions;
                      props.aspectRatio = width / height;
                    }

                    return React.cloneElement(child, props);
                  }

                  return child;
                })}
              </Group>
            );
          },

          Image: (props: { blobId: string; size?: "narrow" | "wide" | "full" }) => {
            const { blobId, size, ...rest } = props;
            const blob = blobs.find((x) => x.name === blobId);
            if (!blob) {
              return <div>Image {blobId} not found!</div>;
            }

            return (
              <Image
                id={blobId}
                href={`/${storyId}/${blobId}`}
                blob={blob}
                sx={[styles.contentWidth, size && sizeVariants[size]]}
                {...rest}
              />
            );
          },
        }}
      />
    </Root>
  );
}

export default React.forwardRef(Body);

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
      gridTemplateColumns: `[le] 1fr max(1em, env(safe-area-inset-left)) [lex] minmax(0, ${vars.extendedColumn}) [lc] ${vars.centerColumn} [rc] minmax(0, ${vars.extendedColumn}) [rex] max(1em, env(safe-area-inset-right)) 1fr [re]`,
    },
  },

  contentWidth: {
    gridColumn: "lc / rc",
  },
  extendedWidth: {
    gridColumn: "lex / rex",
  },
  fullWidth: {
    gridColumn: "le / re",
  },

  h2: {
    gridColumn: "lex / rc",

    display: "inline-block",

    margin: "2em 0 1em",
    padding: "0.55em 0.7em 0.4em",

    backgroundColor: color.container,
    color: color.onContainer,

    fontSize: "clamp(32px, 3.5vw, 80px)",
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: "0.09em",
  },
  h3: {
    gridColumn: "lc / rc",
    margin: "3em 0 1em",
  },

  p: {
    gridColumn: "lc / rc",
    margin: 0,
  },

  blockquote: {
    gridColumn: "lc / rc",
    margin: "1em 0",
    paddingLeft: "1em",
    borderLeft: `2px solid ${color.accent}`,
  },
});

const sizeVariants = stylex.create({
  narrow: {
    margin: "0 auto !important",
    maxWidth: 400,
  },
  wide: {
    gridColumn: "lex / rex",
  },
  full: {
    gridColumn: "le / re",
  },
});
