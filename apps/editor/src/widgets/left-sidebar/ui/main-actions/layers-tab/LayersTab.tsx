import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@repo/ui";

export function LayersTab() {
  return (
    <div className="space-y-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Home" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="home">Home</SelectItem>
          <SelectItem value="about">About</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Search" />

      <Separator />
    </div>
  );
}
