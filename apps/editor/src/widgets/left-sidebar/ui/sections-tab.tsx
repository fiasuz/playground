import { Button, Text } from "@/components";
import { useEditor } from "@craftjs/core";
import { Button as Shadcnbutton } from "@repo/ui";

export function SectionsTab() {
  const { connectors } = useEditor();

  return (
    <div>
      <Shadcnbutton
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <Button text="Click me" />);
          }
        }}
        variant="default"
        data-cy="toolbox-button"
      >
        Button
      </Shadcnbutton>
      <Shadcnbutton
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <Text fontSize={16} text="Hi world" />);
          }
        }}
      >
        Text
      </Shadcnbutton>
    </div>
  );
}
