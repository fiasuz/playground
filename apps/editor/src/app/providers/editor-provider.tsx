import type { ReactNode } from "react";
import { Editor } from "@craftjs/core";
import { Breakpointer } from "@/components";
import {
  Button,
  Card,
  CardBottom,
  CardTop,
  Container,
  Text,
} from "@/widgets/left-sidebar/ui/insert-action";

interface EditorProviderProps {
  children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  return (
    <Editor
      resolver={{
        Breakpointer,
        Card,
        Button,
        Text,
        Container,
        CardTop,
        CardBottom,
      }}
    >
      {children}
    </Editor>
  );
}
