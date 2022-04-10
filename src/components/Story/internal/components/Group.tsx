import { Group } from "@/components/Group";
import { cx } from "@linaria/core";
import * as React from "react";
import { Context } from "../../context";
import Image from "./Image";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Group_(props: Props) {
  const { blobs } = React.useContext(Context);

  const { className, children } = props;

  return (
    <Group {...props} className={cx(className, "wp")}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        /*
         * If the child element is an Image, and is missing 'aspectRatio',
         * compute it from the image dimensions.
         */
        if (child.type === Image && child.props.blobId) {
          const props = { ...child.props };

          const blob = blobs.find((x) => x.name === child.props.blobId);
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
