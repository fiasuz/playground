import type { ReactNode } from "react";

interface EditorProviderProps {
  children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  return <div>{children}</div>;
}
