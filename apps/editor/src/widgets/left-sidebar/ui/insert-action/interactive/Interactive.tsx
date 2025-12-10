import { ZapIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Interactive() {
  return (
    <Toggler
      title="Interactive"
      icon={<TogglerIcon className="bg-yellow-500" Icon={ZapIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
