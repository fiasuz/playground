import type { LoadedSection } from "@/entities/section";
import { useEditor } from "@craftjs/core";
import React from "react";

interface SectionCardProps {
  section: LoadedSection;
}

export function SectionCard({ section }: SectionCardProps) {
  const { connectors } = useEditor();
  const { data, component } = section;

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.create(ref, React.createElement(component));
      }}
      className="border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow bg-white"
    >
      {/* Thumbnail (agar bo'lsa) */}
      {/* {data.meta.thumbnail && (
        <img
          src={data.meta.thumbnail}
          alt={data.meta.displayName}
          className="w-full h-24 object-cover rounded mb-2"
        />
      )} */}

      {/* Title */}
      <h3 className="font-medium text-sm">{data.meta.displayName}</h3>

      {/* Description */}
      {data.meta.description && (
        <p className="text-xs text-gray-500 mt-1">{data.meta.description}</p>
      )}

      {/* Category badge */}
      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
        {data.meta.category}
      </span>
    </div>
  );
}
