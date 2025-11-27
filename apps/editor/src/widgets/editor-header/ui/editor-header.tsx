import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export function EditorHeader() {
  return (
    <header className="h-16 bg-gray-100 border-b flex items-center px-4">
      <Button variant={"destructive"}>Yuklab olish</Button>
      <Card title="title" href="https://example.com">
        <p>children</p>
      </Card>
    </header>
  );
}
