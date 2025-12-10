import { ChevronDownIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Navigations() {
  return (
    <Toggler title="Navigations" icon={<TogglerIcon Icon={ChevronDownIcon} />}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
