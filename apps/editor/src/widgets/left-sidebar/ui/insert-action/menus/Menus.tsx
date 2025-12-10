import { MenuIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Menus() {
  return (
    <Toggler title="Menus" icon={<TogglerIcon Icon={MenuIcon} />}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
