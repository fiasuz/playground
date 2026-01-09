import type { ReactNode } from "react";
import { Editor } from "@craftjs/core";
import { Breakpointer } from "@/components";
import {
  Button,
  Container,
  Input,
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
        Button,
        Container,
        Input,
        Text,
      }}
    >
      {children}
    </Editor>
  );
}
