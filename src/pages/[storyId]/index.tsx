import { Clip } from "@/components/Clip";
import { Content } from "@/components/Content";
import { Group } from "@/components/Group";
import { Header } from "@/components/Header";
import { Image } from "@/components/Image";
import { css, cx } from "@linaria/core";
import { MDXProvider } from "@mdx-js/react";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  storyId: string;
  blobs: Array<any>;
}

const Context = React.createContext<{ blobs: Array<any> }>({ blobs: [] });

const components = {
  wrapper: ({ children }) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          const props = child.props as any;

          return React.cloneElement(child as any, {
            id: `${props.blobId ?? props.image?.hash}`,
            className: cx(
              props.className,
              {
                full: "fw",
                wide: "wp",
              }[props.size],
              css`
                margin: 2em auto;
              `,
              props.size === "narrow" &&
                css`
                  max-width: 400px;
                `
            ),
          });
        }

        if ((child.props as any).mdxType === "Group") {
          const props = child.props as any;

          return React.cloneElement(child as any, {
            className: cx(
              props.className,
              css`
                margin: 2em 0;
              `
            ),
            children: React.Children.map(props.children, (child) => {
              if (React.isValidElement(child)) {
                const props = child.props as any;
                return React.cloneElement(child as any, {
                  id: `${props.blobId ?? props.image?.hash}`,
                });
              } else {
                return child;
              }
            }),
          });
        }
      }

      return child;
    });
  },
  h1: (props: any) => {
    return (
      <div
        className={cx(
          "noLayout",
          css`
            grid-column: lex / rc;
          `
        )}
      >
        <h2
          className={css`
            display: inline-block;

            margin: 2em 0 1em;
            padding: 0.55em 0.7em 0.4em;

            background: black;
            color: white;

            font-size: clamp(32px, 3.5vw, 80px);
            line-height: 1.2;
            font-weight: 900;
            letter-spacing: 0.09em;
          `}
          {...props}
        />
      </div>
    );
  },
  Header,
  Image: (props: any) => {
    const router = useRouter();
    const { blobs } = React.useContext(Context);
    const blob = blobs.find((x) => x.name === props.blobId);

    return (
      <Image
        {...props}
        href={`/${router.query.storyId}/${props.id}`}
        {...(() => {
          if (!blob) {
            return {};
          } else {
            return {
              image: {
                src: blob.asImage.url,
                ...blob.asImage.dimensions,
                sqip: {
                  src: blob.asImage.placeholder.url,
                },
              },
            };
          }
        })()}
      />
    );
  },
  Group: (props: any) => {
    return <Group {...props} className={cx(props.className, "wp")} />;
  },
  Clip: (props: any) => {
    const router = useRouter();

    return (
      <Clip
        {...props}
        id={props.clip.poster.hash}
        className={cx(
          props.className,
          "wp",
          css`
            margin: 2em 0;
          `
        )}
        onFocus={() => {
          router.push(`/${router.query.storyId}/${props.clip.poster.hash}`);
        }}
      />
    );
  },
  blockquote: (props: any) => {
    return (
      <blockquote
        className={css`
          padding-left: 1em;
          border-left: 2px solid #fe762a;

          & > p {
            margin: 0;
          }
        `}
        {...props}
      />
    );
  },
};

const stories = {
  "where-i-was-meant-to-be": {
    meta: require("../../../content/where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`../../../content/where-i-was-meant-to-be/body.mdx`)),
  },
  "one-more-rush": {
    meta: require("../../../content/one-more-rush/meta").default,
    Header: dynamic(() => import(`../../../content/one-more-rush/header`)),
    Body: dynamic(() => import(`../../../content/one-more-rush/body.mdx`)),
  },
  "dreamers-wake": {
    meta: require("../../../content/dreamers-wake/meta").default,
    Header: dynamic(() => import(`../../../content/dreamers-wake/header`)),
    Body: dynamic(() => import(`../../../content/dreamers-wake/body.mdx`)),
  },
  "blouson-noir": {
    meta: require("../../../content/blouson-noir/meta").default,
    Header: dynamic(() => import(`../../../content/blouson-noir/header`)),
    Body: dynamic(() => import(`../../../content/blouson-noir/body.mdx`)),
  },
} as const;

export default function Page(props: Props) {
  const { storyId, blobs } = props;
  const { meta, Header, Body } = stories[storyId];

  return (
    <Context.Provider value={{ blobs }}>
      <MDXProvider components={components}>
        <Head>
          <title>{meta.title}</title>

          <meta property="og:title" content={meta.title} />
          <meta
            property="og:image"
            content={`https://app-gcsszncmzq-lz.a.run.app/og/stories.caurea.org/${storyId}/og:image`}
          />

          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <div style={{ marginBottom: "10vh" }}>
          <Header />
        </div>

        <Content>
          <Body />
        </Content>

        <div style={{ marginBottom: "10vh" }} />
      </MDXProvider>
    </Context.Provider>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const Body = require(`../../../content/${params.storyId}/body.mdx`).default;
  const { children } = Body({}).props;

  const blobIds: Array<string> = [];
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      const props = child.props as any;

      if (props.mdxType === "Image" && props.blobId) {
        blobIds.push(props.blobId);
      }

      React.Children.forEach(props.children, go);
    }
  });

  const blobs = await (async () => {
    const res = await fetch("https://web-4n62l3bdha-lz.a.run.app/api", {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query { ${blobIds.map(
          (blobId) =>
            `b${blobId}: blob(id: "${blobId}") { name asImage { url dimensions { width height } placeholder { url } } } `
        )} }`,
      }),
    });
    const json = await res.json();

    return Object.values(json.data);
  })();

  return {
    props: {
      ...params,
      blobs,
    },
  };
};
