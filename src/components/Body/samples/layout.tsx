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
              backgroundColor: "teal",
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
              backgroundColor: "teal",
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
              backgroundColor: "teal",
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
