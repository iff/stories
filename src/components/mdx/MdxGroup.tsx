'use client'

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import Group from '@/components/Group/Group';

interface MdxGroupProps {
  children: React.ReactNode;
}

/**
 * MDX wrapper for Group component - used in body.mdx files
 */
function MdxGroup({ children }: MdxGroupProps) {
  return (
    <div data-slide-type="group" {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.group)}>
        <Group>{children}</Group>
      </div>
    </div>
  );
}

// Add slideType as a static property for Gallery to identify
MdxGroup.slideType = 'group' as const;

export default MdxGroup;

const styles = stylex.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "2rem",
  },

  group: {
    maxWidth: "90vw",
    maxHeight: "85vh",
  },
});
