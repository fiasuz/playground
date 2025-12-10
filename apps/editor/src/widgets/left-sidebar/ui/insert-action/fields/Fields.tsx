import { TypeIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Fields() {
  return (
    <Toggler
      title="Fields"
      icon={<TogglerIcon className="bg-blue-500" Icon={TypeIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
