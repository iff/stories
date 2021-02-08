import { Card } from "@/components/Card"
import { importImage } from "../../image.macro"

export default function card() {
  return (
    <Card
      image={importImage("https://storage.googleapis.com/plog-imgix/bergell/DSCF0237.jpg")}
      caption="Bergell"
    />
  );
}