import { Content } from "@/components/Content";
import { Group } from "@/components/Group";
import { Header } from "@/components/Header";
import { Image } from "@/components/Image";
import { Lightbox } from "@/components/Lightbox";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useImmer } from "use-immer";

interface Value {
  mutate: any;
}

const Context = React.createContext<Value>({
  mutate: () => {},
});

const components = {
  wrapper: ({ children }) => {
    const images: any[] = [];
    React.Children.forEach(children, function go(child: any) {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          images.push(child);
        }

        React.Children.forEach((child.props as any).children, go);
      }
    });

    const { mutate } = React.useContext(Context);
    React.useEffect(() => {
      setTimeout(() => {
        mutate((draft) => {
          draft.images = images.map((x) => ({
            ...x.props.image,
            caption: x.props.caption,
          }));
        });
      });
    }, []);

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if ((child.props as any).mdxType === "Image") {
          const index = images.indexOf(child);

          return React.cloneElement(child as any, {
            id: `${(child.props as any).image.hash}`,
            images: images.map((x) => ({
              ...x.props.image,
              caption: x.props.caption,
            })),
            index,
            style: { margin: "2rem auto", ...(child.props as any).style },
          });
        }

        if ((child.props as any).mdxType === "Group") {
          return React.cloneElement(child as any, {
            style: {
              marginTop: "4rem",
              marginBottom: "4rem",
              ...(child.props as any).style,
            },
            children: React.Children.map(
              (child.props as any).children,
              (child) => {
                if (React.isValidElement(child)) {
                  const index = images.indexOf(child);

                  return React.cloneElement(child as any, {
                    id: `${(child.props as any).image.hash}`,
                    images: images.map((x) => ({
                      ...x.props.image,
                      caption: x.props.caption,
                    })),
                    index,
                  });
                } else {
                  return child;
                }
              }
            ),
          });
        }
      }

      return child;
    });
  },
  h1: (props: any) => <h2 {...props} />,
  Header,
  Image: (props: any) => {
    const router = useRouter();

    return (
      <Image
        {...props}
        onOpen={() => {
          router.replace(
            {
              pathname: "[...parts]",
              query: { parts: [router.query.parts[0], (props as any).id] },
            },
            undefined,
            { scroll: false }
          );
        }}
      />
    );
  },
  Group,
};

const stories = {
  "where-i-was-meant-to-be": {
    Header: dynamic(
      () => import(`../../content/where-i-was-meant-to-be/header`)
    ),
    Body: dynamic(
      () => import(`../../content/where-i-was-meant-to-be/index.mdx`)
    ),
  },
} as const;

interface State {
  images: any[];
}

export default function Page() {
  const router = useRouter();
  const [story, focus] = (router.query.parts as string[]) ?? [];
  // console.log(story, focus);

  const { Header, Body } = stories[story] ?? {};

  /*
   * The local state maintained by this page.
   */
  const [state, mutate] = useImmer<State>({
    images: [],
  });

  const value = React.useMemo<Value>(() => ({ mutate }), [mutate]);

  const lightbox = (() => {
    const img = state.images.find((x) => x.hash === focus);
    if (img) {
      return {
        index: state.images.indexOf(img),
        image: img,
        caption: img.caption,
      };
    }
  })();

  const content = React.useMemo(
    () => (
      <MDXProvider components={components}>
        <div style={{ marginBottom: "10vh" }}>
          <Header />
        </div>

        <Content>
          <Body />
        </Content>

        <div style={{ marginBottom: "10vh" }} />
      </MDXProvider>
    ),
    [Header, Body]
  );

  if (!story) {
    return null;
  }

  return (
    <Context.Provider value={value}>
      {content}

      {lightbox && (
        <Lightbox
          onClose={() => {
            router.replace(
              {
                pathname: "[...parts]",
                query: { parts: [story] },
              },
              undefined,
              { scroll: false }
            );
          }}
          caption={lightbox.caption}
          prev={() => {
            const index = Math.max(0, lightbox.index - 1);
            const image = state.images[index];
            if (image) {
              router.replace(
                {
                  pathname: "[...parts]",
                  query: { parts: [story, image.hash] },
                },
                undefined,
                { scroll: false }
              );
            }
          }}
          next={() => {
            mutate((draft) => {
              const index = Math.min(
                state.images.length - 1,
                lightbox.index + 1
              );
              const image = state.images[index];
              if (image) {
                router.replace(
                  {
                    pathname: "[...parts]",
                    query: { parts: [story, image.hash] },
                  },
                  undefined,
                  { scroll: false }
                );
              }
            });
          }}
        >
          <Inner key={lightbox.image.src} image={lightbox.image} />
        </Lightbox>
      )}
    </Context.Provider>
  );
}

function Inner({ image }: any) {
  const ref = React.useRef<null | HTMLDivElement>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current?.querySelector(
      'img[decoding="async"]'
    ) as HTMLImageElement;
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
      <NextImage src={image.src} objectFit="contain" layout="fill" />
      <div
        style={{
          backgroundRepeat: "no-repeat",
          position: "absolute",
          backgroundSize: "contain",
          backgroundPosition: "50% 50%",
          transition: "opacity .5s ease-out",
          inset: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: loaded ? 0 : 1,
          zIndex: 1,
          backgroundImage: `url(${image.sqip.src})`,
        }}
      />
    </div>
  );
}
