import * as React from "react";

/**
 * Text component for MDX - marks content that should be a single text slide in the gallery
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
}

function Text(props: Props) {
  // This component is just a marker - it doesn't render anything
  // The extractContentBlocks function will find these and extract their content
  return null;
}

export default Text;
