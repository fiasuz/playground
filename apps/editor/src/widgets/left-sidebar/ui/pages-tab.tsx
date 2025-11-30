import { XIcon } from "lucide-react";

interface PagesTabProps {
  onClose: () => void;
}

export function PagesTab({ onClose }: PagesTabProps) {
  return (
    <div>
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <h1 className="text-base font-medium">Sahifalar</h1>
        <button
          className="cursor-pointer hover:text-primary text-muted-foreground"
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
      </div>
    </div>
  );
}
