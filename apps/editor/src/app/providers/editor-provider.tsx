import type { ReactNode } from "react";
import { Editor } from "@craftjs/core";
import {
  Breakpointer,
  Button,
  Card,
  CardBottom,
  CardTop,
  Container,
  Text,
} from "@/components";
interface EditorProviderProps {
  children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  return (
    <Editor
      resolver={{
        Card,
        Button,
        Text,
        Container,
        CardTop,
        CardBottom,
        Breakpointer,
      }}
    >
      {children}
    </Editor>
  );
}
