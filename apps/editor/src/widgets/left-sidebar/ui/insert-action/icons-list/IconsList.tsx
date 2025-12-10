import { StarIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function IconsList() {
  return (
    <Toggler
      title="Icons"
      icon={<TogglerIcon className="bg-blue-500" Icon={StarIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
