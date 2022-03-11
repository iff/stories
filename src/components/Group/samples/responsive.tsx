import { Image } from "@/components/Image";
import * as React from "react";
import { Group } from "..";
import { importBlob } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Group>>;

export default function Sample(props: Props) {
  return (
    <Group {...props}>
      <Image
        span={[6, 4]}
        aspectRatio={16 / 9}
        blob={importBlob("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC")}
      />
      <Image
        span={[6, 3]}
        aspectRatio={1}
        blob={importBlob("9QtiTEJcXCmxdBaQXy8ycRFYZSz5RSycsiW7Edeg5cZP")}
      />
      <Image
        span={[12, 5]}
        aspectRatio={16 / 7}
        blob={importBlob("EtmcDFTSrxMrwpfC26f6aFWRng9ftRQtvewX4FsiYJ31")}
      />
    </Group>
  );
}
