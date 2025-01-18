import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { Group } from "@/components/Group";

interface Props {
  blobs: Array<any>;
  children?: React.ReactNode;
}

export default function Group_(props: Props) {
  const { blobs, children, ...rest } = props;

  return (
    <Group {...stylex.props(styles.root)} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        /*
         * If the child element is an Image, and is missing 'aspectRatio',
         * compute it from the image dimensions.
         */
        if ((child.props as any).blobId) {
          const props = { ...(child.props as any) };

          const blob = blobs.find((x) => x.name === (child.props as any).blobId);
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
}

const styles = stylex.create({
  root: {
    gridColumn: "lex / rex",
  },
});
