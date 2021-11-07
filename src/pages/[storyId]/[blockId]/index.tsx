import { Clip } from "@/components/Clip";
import { Lightbox } from "@/components/Lightbox";
import { css } from "@linaria/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

export interface Query extends ParsedUrlQuery {
  storyId: string;
  blockId: string;
}

interface Props {
  storyId: string;
  blockId: string;

  block: Block;
  next: null | string;
  prev: null | string;

  title?: string;

  blob?: any;
}

type Block =
  | { __typename: "Image"; id: string; image: { src: string; sqip: { src: string } }; caption: null | string }
  | { __typename: "Clip"; id: string; clip: any; caption: null | string };

export default function Page(props: Props) {
  const router = useRouter();

  const { storyId, blockId, block, next, prev, title, blob } = props;

  const image = block.__typename === "Image" ? block.image : block.clip.poster;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        {block.caption && <meta property="og:description" content={block.caption} />}
        <meta property="og:image" content={image.src} />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Lightbox
        onClose={async () => {
          await router.replace(`/${storyId}`);
          document.getElementById(blockId)?.scrollIntoView({ block: "center", inline: "center" });
        }}
        caption={block.caption}
        prev={prev && { href: `/${storyId}/${prev}` }}
        next={next && { href: `/${storyId}/${next}` }}
      >
        {(() => {
          switch (block.__typename) {
            case "Image":
              return <Inner.Image key={block.id} blobId={blob?.name} image={image} />;
            case "Clip":
              return <Inner.Clip key={block.id} clip={block.clip} />;
          }
        })()}
      </Lightbox>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const Body = require(`../../../../content/${params.storyId}/body.mdx`).default;
  const { children } = Body({}).props;

  const blocks: Array<Block> = [];
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      const props = child.props as any;

      if (props.mdxType === "Image") {
        blocks.push({
          __typename: "Image",
          id: props.blobId ?? props.image?.hash ?? null,
          image: props.image ?? null,
          caption: props.caption,
        });
      } else if (props.mdxType === "Clip") {
        blocks.push({
          __typename: "Clip",
          id: props.clip.poster.hash,
          clip: props.clip,
          caption: props.caption,
        });
      }

      React.Children.forEach(props.children, go);
    }
  });

  let blobP: Promise<any> = Promise.resolve({});
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      const props = child.props as any;

      if (props.mdxType === "Image" && props.blobId && props.blobId === params.blockId) {
        blobP = (async () => {
          const res = await fetch("https://web-4n62l3bdha-lz.a.run.app/api", {
            method: "POST",
            headers: { ["Content-Type"]: "application/json" },
            body: JSON.stringify({
              query: `query { blob(id: "${props.blobId}") { name asImage { url dimensions { width height } placeholder { url } } } }`,
            }),
          });
          return (await res.json()).data.blob;
        })();
      }

      React.Children.forEach(props.children, go);
    }
  });

  const block = blocks.find((x) => x.id === params.blockId);
  const index = blocks.indexOf(block);

  const { title } = require(`../../../../content/${params.storyId}/meta`).default;

  const blob = await blobP;

  return {
    props: {
      ...params,
      block: {
        ...block,
        caption: block.caption ?? null,
        ...(() => {
          if (!("asImage" in blob)) {
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
        })(),
      },
      prev: blocks[index - 1]?.id ?? null,
      next: blocks[index + 1]?.id ?? null,

      title: `${params.blockId} - ${title}`,

      blob,
    },
  };
};

const Inner = {
  Image: function ({ blobId, image }: { blobId?: string; image: { src: string; sqip: { src: string } } }) {
    const ref = React.useRef<null | HTMLDivElement>(null);

    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      const img = ref.current?.querySelector('img[decoding="async"]') as HTMLImageElement;
      if (img) {
        const onLoad = () => {
          if (!img.src.match(/data:image\/gif/)) {
            setLoaded(true);
            img.removeEventListener("load", onLoad);
          }
        };

        img.addEventListener("load", onLoad);
      }
    }, []);

    return (
      <div ref={ref}>
        <NextImage
          loader={blobId ? ({ src, width }) => `${src}?w=${width}` : undefined}
          src={image.src}
          objectFit="contain"
          layout="fill"
          onError={(ev) => {
            ev.currentTarget.style.visibility = "hidden";
          }}
          onLoad={(ev) => {
            ev.currentTarget.style.visibility = "inherit";
          }}
        />
        <div
          className={css`
            position: absolute;
            z-index: 1;

            background-repeat: no-repeat;
            background-size: contain;
            background-position: 50% 50%;

            transition: opacity 0.5s ease-out;
            opacity: 1;

            inset: 0;
            right: 0;
            bottom: 0;
            left: 0;
          `}
          style={{
            opacity: loaded ? 0 : 1,
            backgroundImage: `url(${image.sqip.src})`,
          }}
        />
      </div>
    );
  },
  Clip: function ({ clip }: { clip: any }) {
    return (
      <div
        className={css`
          height: 100%;
          display: grid;
          place-items: center;
        `}
      >
        <Clip clip={clip} />
      </div>
    );
  },
} as const;
