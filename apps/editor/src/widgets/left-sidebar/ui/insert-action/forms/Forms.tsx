import { FormInputIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";

export function Forms() {
  return (
    <Toggler
      title="Forms"
      icon={<TogglerIcon className="bg-green-500" Icon={FormInputIcon} />}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, quae!
    </Toggler>
  );
}
