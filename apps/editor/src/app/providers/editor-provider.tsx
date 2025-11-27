import { Editor } from "@craftjs/core";
import { type ReactNode, useMemo } from "react";
import { useGitHubSections } from "@/entities/section/model/use-github-sections";

interface EditorProviderProps {
  children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  const { sections, sectionsData, loading, error } = useGitHubSections();

  // Create resolver object for Craft.js
  const resolver = useMemo(() => {
    return {
      ...sections,
      // Add default/built-in components here if needed
    };
  }, [sections]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sections from GitHub...</p>
          <p className="text-sm text-gray-500 mt-2">fiasuz/ui/artworks</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">Failed to load sections</h2>
          <p>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Log loaded sections
  console.log(
    "Loaded sections:",
    sectionsData.map((s) => s.data.meta)
  );

  return (
    <Editor resolver={resolver} enabled={true}>
      {children}
    </Editor>
  );
}
