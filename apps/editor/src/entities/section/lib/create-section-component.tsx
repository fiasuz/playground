/* eslint-disable */

import Mustache from "mustache";
import { useNode } from "@craftjs/core";
import type { SectionData } from "@/shared/api/github";

/**
 * Creates a React component from section data
 */
export function createSectionComponent(sectionData: SectionData) {
  const { meta, example, template } = sectionData;

  // Create the main component
  const SectionComponent = (props: any) => {
    const {
      connectors: { connect, drag },
    } = useNode();

    // Merge props with example data
    const data = { ...example, ...props };

    // Render template with data
    const html = Mustache.render(template, data);

    return (
      <div
        ref={(ref) => ref && connect(drag(ref as any))}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  // Add displayName for debugging
  SectionComponent.displayName = meta.displayName || meta.name;

  // Craft.js configuration
  (SectionComponent as any).craft = {
    displayName: meta.displayName,
    props: example,
    related: {
      settings: createSettingsComponent(sectionData),
    },
    rules: {
      canDrag: () => true,
      canDrop: () => true,
      canMoveIn: () => false,
      canMoveOut: () => true,
    },
  };

  return SectionComponent;
}

/**
 * Creates settings panel component for a section
 */
function createSettingsComponent(sectionData: SectionData) {
  const { schema } = sectionData;

  return function SectionSettings() {
    const {
      actions: { setProp },
      props,
    } = useNode((node) => ({
      props: node.data.props,
    }));

    return (
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">
          {sectionData.meta.displayName}
        </h3>
        <p className="text-sm text-gray-600">{sectionData.meta.description}</p>

        {Object.entries(schema).map(([key, field]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">
              {field.label || key}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {renderField(key, field, props[key], (value) => {
              setProp((props: any) => {
                props[key] = value;
              });
            })}
          </div>
        ))}
      </div>
    );
  };
}

/**
 * Render appropriate input field based on schema type
 */

function renderField(
  key: string,
  field: any,
  value: any,
  onChange: (value: any) => void
) {
  console.log("Rendering field:", key, field, value);

  switch (field.type) {
    case "string":
    case "text":
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case "textarea":
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    case "boolean":
      return (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Enable</span>
        </label>
      );

    case "select":
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {field.options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
      );

    case "color":
      return (
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
        />
      );

    case "image":
    case "url":
      return (
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );

    default:
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      );
  }
}
