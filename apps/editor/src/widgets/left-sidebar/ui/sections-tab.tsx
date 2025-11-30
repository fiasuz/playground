import { Button } from "@/components";
import { useEditor } from "@craftjs/core";
import { SectionCard } from "./section-card";
import { InfoIcon, XIcon } from "lucide-react";

interface SectionsTabProps {
  onClose: () => void;
}

export function SectionsTab({ onClose }: SectionsTabProps) {
  const { connectors } = useEditor();

  return (
    <div>
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <div className="flex flex-row items-center gap-1">
          <button className="cursor-pointer">
            <InfoIcon className="size-3" />
          </button>
          <h1 className="text-base font-medium">Artworks</h1>
        </div>
        <button
          className="cursor-pointer hover:text-primary text-muted-foreground"
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <SectionCard
              key={index}
              name="title"
              ref={(ref) => {
                if (ref) {
                  connectors.create(
                    ref,
                    <Button variant="default" text="Click me" />
                  );
                }
              }}
            />
          ))}
      </div>
    </div>
  );
}
