import { PlayIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Media() {
  return (
    <Toggler
      title="Media"
      icon={<TogglerIcon className="bg-cyan-500" Icon={PlayIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
