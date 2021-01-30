import { Card } from "@/components/Card"
import { importImage } from "../../image.macro"

export default function card() {
  return (
    <Card
      image={importImage("https://storage.googleapis.com/plog-imgix/ticino/DSCF0171.jpg")}
      title="Bavona"
    />
  );
}