import { css, cx } from "@linaria/core";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Icons from "react-feather";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  onClose?: () => void;

  caption?: React.ReactNode;

  prev?: LinkProps | (() => void);
  next?: LinkProps | (() => void);
}

function Lightbox(props: Props, ref: React.ForwardedRef<React.ElementRef<typeof Root>>) {
  const router = useRouter();

  const { onClose, caption, prev, next, className, children, ...rest } = props;

  /*
   * Attach event handlers to 'document' to handle keyboard shortcuts.
   */
  React.useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose?.();
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
  }, [onClose, prev, next]);

  const el = (
    <Root ref={ref} className={cx(className, classes.root)} {...rest}>
      <div className={classes.top}>
        <div className={classes.close} onClick={onClose}>
          <Icons.X />
        </div>
      </div>

      <div className={classes.center}>
        {children}

        <Nav action={prev} className={classes.prev}>
          <Icons.ArrowLeft />
        </Nav>

        <Nav action={next} className={classes.next}>
          <Icons.ArrowRight />
        </Nav>
      </div>

      <div className={classes.caption}>{caption}</div>
    </Root>
  );

  if (typeof document === "undefined") {
    return el;
  } else {
    return ReactDOM.createPortal(el, document.body);
  }
}

export default React.forwardRef(Lightbox);

const classes = {
  root: css`
    position: fixed;
    inset: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #18191b;
    color: white;
    display: flex;
    flex-direction: column;
  `,

  top: css`
    z-index: 3;
    min-height: 64px;
    flex: 64px 0 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left);
  `,

  close: css`
    padding: 12px;
    cursor: pointer;

    svg {
      display: block;
    }
  `,

  center: css`
    flex-grow: 1;
    position: relative;
    user-select: none;
  `,

  prev: css`
    z-index: 2;
    position: fixed;
    padding-right: 32px;
    left: 0;
    top: 0;
    bottom: 0;
    width: calc(80px + env(safe-area-inset-left));
    padding-left: env(safe-area-inset-left);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
    text-decoration: none;
    color: inherit;
  `,
  next: css`
    z-index: 2;
    position: fixed;
    padding-left: 32px;
    right: 0;
    top: 0;
    bottom: 0;
    width: calc(80px + env(safe-area-inset-right));
    padding-right: env(safe-area-inset-right);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
    text-decoration: none;
    color: inherit;
  `,

  caption: css`
    min-height: 64px;
    padding: 24px 0 max(24px, env(safe-area-inset-bottom));
    text-align: center;
    width: 100%;
    color: var(--secondary-text-color);
    font-size: 0.9em;
    font-style: italic;
  `,
};

function Nav(props: { action?: LinkProps | (() => void); className?: string; children?: React.ReactNode }) {
  const { action, ...rest } = props;

  if (!action) {
    return null;
  } else if (typeof action === "function") {
    return <div onClick={action} {...rest} />;
  } else {
    return (
      <Link {...action}>
        <a {...rest} />
      </Link>
    );
  }
}
