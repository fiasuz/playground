import { Plus } from "lucide-react";

export function PagesTab() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">Pages</span>
        <button
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
          title="Create new page"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
