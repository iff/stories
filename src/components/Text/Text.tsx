'use client'

import * as React from "react";
import * as stylex from "@stylexjs/stylex";

import { color } from "@/tokens.stylex";

/**
 * Text component for MDX - renders a text slide in the gallery
 * The markdown content inside is automatically processed by MDX into React elements
 *
 * Usage in MDX:
 * <Text>
 * ## Heading
 *
 * Your text content here with **bold** and *italic* and [links](url).
 * </Text>
 */
interface Props {
  children: React.ReactNode;
  slideType?: string; // Added for Gallery to identify slide type
}

function Text({ children }: Props) {
  return (
    <div data-slide-type="text" {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.content)}>
        {children}
      </div>
    </div>
  );
}

// Add slideType as a static property for Gallery to identify
Text.slideType = 'text' as const;

export default Text;

const styles = stylex.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },

  content: {
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "2rem",

    // Heading styles
    ":where(h2)": {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1.3,
      color: color.text,
      marginTop: 0,
      marginBottom: "1.5rem",
    },
    ":where(h3)": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.4,
      color: color.text,
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    // Paragraph styles
    ":where(p)": {
      fontSize: "16px",
      lineHeight: 1.7,
      color: color.text,
      marginTop: 0,
      marginBottom: "1.2rem",
    },
    // Link styles
    ":where(a)": {
      color: color.secondaryText,
      textDecoration: "underline",
    },
  },
});
