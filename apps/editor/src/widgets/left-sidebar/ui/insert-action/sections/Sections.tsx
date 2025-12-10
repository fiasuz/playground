import { LayoutPanelTopIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Sections() {
  return (
    <Toggler title="Sections" icon={<TogglerIcon Icon={LayoutPanelTopIcon} />}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
