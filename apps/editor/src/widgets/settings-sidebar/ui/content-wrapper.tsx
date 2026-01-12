import type { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div className="w-full max-h-full overflow-y-auto bg-white rounded-xl p-6 space-y-6">
      {children}
    </div>
  );
}
