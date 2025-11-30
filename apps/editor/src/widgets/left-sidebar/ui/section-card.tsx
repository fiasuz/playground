import type { HTMLAttributes, Ref } from "react";

interface SectionCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  ref: Ref<any>;
}

export function SectionCard({ name, ref, ...props }: SectionCardProps) {
  return (
    <div
      ref={ref}
      {...props}
      className="w-full h-15 bg-primary-50 rounded-lg border border-primary-100 flex items-center justify-center cursor-move hover:border-dashed hover:border-primary transition-all"
    >
      <p className="text-sm">{name}</p>
    </div>
  );
}
