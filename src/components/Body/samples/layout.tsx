import * as React from "react";
import { Body } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Body>>;

export default function Sample(props: Props) {
  return (
    <Body
      storyId="storyId"
      blobs={[]}
      Component={() => (
        <>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              padding: "8px",
              gridColumn: "lc / rc",
              background: "teal",
              margin: "2px 0",
            }}
          >
            center
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              padding: "8px",
              gridColumn: "lex / rex",
              background: "teal",
              margin: "2px 0",
            }}
          >
            extended
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              padding: "8px",
              gridColumn: "le / re",
              background: "teal",
              margin: "2px 0",
            }}
          >
            full
          </div>
        </>
      )}
      {...props}
    />
  );
}
