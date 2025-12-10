import { DatabaseIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Collections() {
  return (
    <Toggler
      title="Collections"
      icon={<TogglerIcon className="bg-blue-500" Icon={DatabaseIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
