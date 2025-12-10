import { cn } from "@repo/ui/lib/utils";
import { ChevronRightIcon, XIcon, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { create } from "zustand";

interface TogglerStore {
  activeTogglerId: string | null;
  setActiveTogglerId: (id: string | null) => void;
}

const useTogglerStore = create<TogglerStore>((set) => ({
  activeTogglerId: null,
  setActiveTogglerId: (id) => set({ activeTogglerId: id }),
}));

interface TogglerProps {
  content?: boolean;
  children?: ReactNode;
  title: string;
  icon: ReactNode;
}

function Toggler({ content = true, children, icon, title }: TogglerProps) {
  const { activeTogglerId, setActiveTogglerId } = useTogglerStore();

  const isOpen = activeTogglerId === title;

  const handleMouseEnter = () => {
    setActiveTogglerId(title);
  };

  const handleClose = () => {
    setActiveTogglerId(null);
  };

  return (
    <>
      <div
        className="flex flex-row justify-between items-center hover:bg-muted p-2 rounded-lg cursor-default"
        onMouseEnter={handleMouseEnter}
      >
        <div className="flex flex-row gap-2 items-center">
          {icon}
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>
        {content && <ChevronRightIcon className="size-5 opacity-50" />}
      </div>

      {isOpen && content && (
        <div className="absolute top-0 right-0 translate-x-full w-[300px] h-full bg-white border-l p-4">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm">{title}</p>
            <button onClick={handleClose} className="cursor-pointer">
              <XIcon className="size-5" />
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
}

// -----------------------------------------------------------------

interface TogglerGroupProps {
  title: string;
  children: ReactNode;
}

function TogglerGroup({ title, children }: TogglerGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium px-2 text-muted-foreground">{title}</p>
      <div>{children}</div>
    </div>
  );
}

// -----------------------------------------------------------------

interface TogglerIconProps {
  Icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

function TogglerIcon({ Icon, className, iconClassName }: TogglerIconProps) {
  return (
    <div
      className={cn(
        "size-6 bg-gray-600/80 flex items-center justify-center rounded-sm",
        className
      )}
    >
      <Icon className={cn("size-4 text-white", iconClassName)} />
    </div>
  );
}

export { Toggler, TogglerIcon, TogglerGroup };
