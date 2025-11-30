import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";
import { DatabaseIcon, XIcon } from "lucide-react";

interface DatabaseTabProps {
  onClose: () => void;
}

export function DatabaseTab({ onClose }: DatabaseTabProps) {
  return (
    <div>
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <h1 className="text-base font-medium">Database connect</h1>
        <button
          className="cursor-pointer hover:text-primary text-muted-foreground"
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
      </div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <DatabaseIcon />
          </EmptyMedia>
          <EmptyTitle>Database connect</EmptyTitle>
          <EmptyDescription>
            Yaqin orada ushbu imkoniyat ham qo&apos;shiladi.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
