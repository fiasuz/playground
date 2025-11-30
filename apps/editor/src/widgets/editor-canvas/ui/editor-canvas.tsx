import { Button, Card, Container, Text } from "@/components";
import { Element, Frame } from "@craftjs/core";
import type { ElementType } from "react";

export function EditorCanvas() {
  return (
    <div className="w-full p-4">
      <Frame>
        <Element
          canvas
          is={Container as ElementType}
          padding={5}
          background="#eeeeee"
          data-cy="root-container"
        >
          <Card data-cy="frame-card" />
          <Button text="Click me" size="default" data-cy="frame-button" />
          <Text fontSize={20} text="Hi world!" data-cy="frame-text" />
          <Element
            canvas
            is={Container as ElementType}
            padding={6}
            background="#999999"
            data-cy="frame-container"
          >
            <Text
              fontSize={20}
              text="It's me again!"
              data-cy="frame-container-text"
            />
          </Element>
        </Element>
      </Frame>
    </div>
  );
}
