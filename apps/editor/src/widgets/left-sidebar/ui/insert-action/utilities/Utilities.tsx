import { CogIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";
import { useEditor } from "@craftjs/core";
import { Button } from "@/components";

export function Utilities() {
  const { connectors } = useEditor();

  return (
    <Toggler
      title="Utility"
      icon={<TogglerIcon className="bg-red-500" Icon={CogIcon} />}
    >
      <div
        ref={(ref) =>
          connectors.create(ref as any, <Button text="Click me" size="sm" />)
        }
        data-cy="toolbox-button"
      >
        button
      </div>
    </Toggler>
  );
}
