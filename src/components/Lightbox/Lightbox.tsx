"use client";

import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as ReactDOM from "react-dom";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: { href: string } | (() => void);

  caption?: React.ReactNode;

  prev?: { href: string } | (() => void);
  next?: { href: string } | (() => void);
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ComponentRef<typeof Root>>) {
  const router = useRouter();

  const { onClose, caption, prev, next, children, ...rest } = props;

  /*
   * Attach event handlers to 'document' to handle keyboard shortcuts.
   */
  React.useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        if (typeof onClose === "function") {
          onClose();
        } else if (onClose) {
          router.push(onClose.href);
        }
      } else if (ev.key === "ArrowLeft") {
        if (typeof prev === "function") {
          prev();
        } else if (prev) {
          router.push(prev.href);
        }
      } else if (ev.key === "ArrowRight") {
        if (typeof next === "function") {
          next();
        } else if (next) {
          router.push(next.href);
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [router, onClose, prev, next]);

  const el = (
    <Root ref={ref} {...stylex.props(styles.root)} {...rest}>
      <div {...stylex.props(styles.top)}>
        <Nav {...stylex.props(styles.close)} action={onClose}>
          <Icons.X style={{ display: "block" }} />
        </Nav>
      </div>

      <div {...stylex.props(styles.center)}>
        {children}

        <Nav action={prev} {...stylex.props(styles.prev)}>
          <Icons.ArrowLeft style={{ display: "block" }} />
        </Nav>

        <Nav action={next} {...stylex.props(styles.next)}>
          <Icons.ArrowRight style={{ display: "block" }} />
        </Nav>
      </div>

      <div {...stylex.props(styles.caption)}>{caption}</div>
    </Root>
  );

  if (typeof document === "undefined") {
    return el;
  } else {
    return ReactDOM.createPortal(el, document.body);
  }
}

export default React.forwardRef(Lightbox);

const styles = stylex.create({
  root: {
    position: "fixed",
    inset: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color.container,
    color: color.onContainer,
    display: "flex",
    flexDirection: "column",
  },

  top: {
    zIndex: 3,
    minHeight: 64,
    flex: "64px 0 1",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left)",
  },

  close: {
    padding: 12,
    cursor: "pointer",
    color: "inherit",
  },

  center: {
    flexGrow: 1,
    position: "relative",
  },

  prev: {
    zIndex: 2,
    position: "fixed",
    paddingRight: 32,
    left: 0,
    top: 0,
    bottom: 0,
    width: "calc(80px + env(safe-area-inset-left))",
    paddingLeft: "env(safe-area-inset-left)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.2s",
    textDecoration: "none",
    color: "inherit",
  },

  next: {
    zIndex: 2,
    position: "fixed",
    paddingLeft: 32,
    right: 0,
    top: 0,
    bottom: 0,
    width: "calc(80px + env(safe-area-inset-right))",
    paddingRight: "env(safe-area-inset-right)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.2s",
    textDecoration: "none",
    color: "inherit",
  },

  caption: {
    minHeight: 64,
    padding: "24px 0 max(24px, env(safe-area-inset-bottom))",
    textAlign: "center",
    width: "100%",
    fontSize: "0.9em",
    fontStyle: "italic",
  },
});

function Nav(props: { action?: LinkProps | (() => void); className?: string; children?: React.ReactNode }) {
  const { action, ...rest } = props;

  if (!action) {
    return null;
  } else if (typeof action === "function") {
    return <div onClick={action} {...rest} />;
  } else {
    return <Link prefetch {...action} {...rest} />;
  }
}
