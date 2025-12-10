import { CogIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Utilities() {
  return (
    <Toggler
      title="Utility"
      icon={<TogglerIcon className="bg-red-500" Icon={CogIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
