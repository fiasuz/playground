import { settingsStore } from "@/shared/store";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui";

export function SettingsPage() {
  const { onToggle, show } = settingsStore((state) => state);
  console.log("show", show);

  return (
    <Drawer open={show} onOpenChange={onToggle} direction="right">
      <DrawerContent className="z-1000">
        <DrawerHeader>
          <DrawerTitle>Sozlamalar</DrawerTitle>
          <DrawerDescription>
            Ushbu bo'limda loyihaning sozlamalarini amalga oshirishingiz mumkin
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
