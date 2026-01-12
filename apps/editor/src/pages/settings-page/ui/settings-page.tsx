import { Button } from "@repo/ui";
import { ChevronLeftIcon } from "lucide-react";
import { SettingsContent, SettingsSidebar } from "@/widgets/settings-sidebar";
import { useNavigate } from "react-router-dom";
import { pages } from "@/shared/constants";

export function SettingsPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(pages.editor);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex flex-row items-center gap-4 px-6 py-4 bg-white border-b">
        <Button size="icon" variant="outline" onClick={handleGoBack}>
          <ChevronLeftIcon className="size-5" />
        </Button>
        <h1 className="text-xl font-semibold">Sozlamalar</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-row flex-1 overflow-hidden">
        <SettingsSidebar />
        <SettingsContent />
      </main>
    </div>
  );
}
