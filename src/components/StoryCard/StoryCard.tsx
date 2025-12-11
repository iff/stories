import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { color } from "@/tokens.stylex";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blob: {
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder: {
        url: string;
      };
    };
  };

  story: {
    id: string;
  };

  title: string;
}

async function StoryCard(props: Props) {
  const { story, blob, title, ...rest } = props;

  return (
    <Root {...rest} {...stylex.props(styles.root)}>
      <Link href={`/${story.id}`} {...stylex.props(styles.link)}>
        <div {...stylex.props(styles.imageContainer)}>
          <Image
            alt={title}
            src={blob.asImage.url}
            fill
            {...stylex.props(styles.image)}
          />
        </div>
        <h4 {...stylex.props(styles.title)}>{title}</h4>
      </Link>
    </Root>
  );
}

export default StoryCard;

const styles = stylex.create({
  root: {
    overflow: "hidden",
  },

  link: {
    display: "block",
    textDecoration: "none",
    transition: "opacity 0.2s ease",

    ":hover": {
      opacity: 0.8,
    },
  },

  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "400 / 313",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  title: {
    fontSize: "16px",
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: "0.02em",
    margin: "1rem 0 0 0",
    padding: 0,
    color: color.text,
  },
});
