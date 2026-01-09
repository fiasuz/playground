import { ComponentIcon } from "lucide-react";
import { Toggler, TogglerIcon } from "../togglers";
import { useEditor } from "@craftjs/core";
import { Button } from "./Button";
import { Text } from "./Text";
import { Input } from "./Input";

export function ComponentsList() {
  const { connectors } = useEditor();

  return (
    <Toggler title="Components" icon={<TogglerIcon Icon={ComponentIcon} />}>
      <ul className="grid grid-cols-2 gap-2 mt-4 [&>li]:w-full [&>li]:bg-gray-100 [&>li]:p-2 [&>li]:rounded-md [&>li]:h-15 [&>li]:text-sm [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:border [&>li]:cursor-grab">
        <li
          ref={(ref: HTMLLIElement) => {
            connectors.create(ref, <Button text="Click me" size="sm" />);
          }}
        >
          Button
        </li>

        <li
          ref={(ref: HTMLLIElement) => {
            connectors.create(ref, <Text fontSize={16} text="Text" />);
          }}
        >
          Text
        </li>

        <li
          ref={(ref: HTMLLIElement) => {
            connectors.create(ref, <Input />);
          }}
        >
          Input
        </li>
      </ul>
    </Toggler>
  );
}
