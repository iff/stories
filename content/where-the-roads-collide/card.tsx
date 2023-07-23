import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "where-the-roads-collide",
      }}
      blob={importBlob("FvWPgxfsmWHtaUmzuNSte99GMM5Rtiu2CiKMJnZgXbfR")}
      blocks={[importBlob("7yWSUn7qFfaaRoiPk9UrtTeXDLFULHVpd7RYTLc1t1Vo"), importBlob("2uDPdSfjM7rcAm5gN12YUFzvs4qPChL9rukXrgsPKwyS")]}
      title="Where the Roads Collide"
      teaser="Checking another country in the Western Balkans off my bucket list."
      date={[new Date(Date.parse("2023-06-05")), new Date(Date.parse("2023-06-26"))]}
    />
  );
}
