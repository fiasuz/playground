import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui";
import { GitBranchIcon, XIcon } from "lucide-react";

interface GitTabProps {
  onClose: () => void;
}

export function GitTab({ onClose }: GitTabProps) {
  return (
    <div>
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <h1 className="text-base font-medium">Github connect</h1>
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
            <GitBranchIcon />
          </EmptyMedia>
          <EmptyTitle>Github connect</EmptyTitle>
          <EmptyDescription>
            Yaqin orada ushbu imkoniyat ham qo&apos;shiladi.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
