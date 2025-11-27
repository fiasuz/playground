/* eslint-disable */

import { useState, useEffect } from "react";
import { GitHubSectionsAPI, type SectionData } from "@/shared/api/github";
import { createSectionComponent } from "../lib/create-section-component";
import React from "react";

export interface LoadedSection {
  name: string;
  component: React.ComponentType<any>;
  data: SectionData;
}

/**
 * Hook to load sections from GitHub dynamically
 */
export function useGitHubSections() {
  const [sections, setSections] = useState<
    Record<string, React.ComponentType<any>>
  >({});
  const [sectionsData, setSectionsData] = useState<LoadedSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const api = new GitHubSectionsAPI();

      // Fetch all sections from GitHub
      const allSectionsData = await api.fetchAllSections();

      // Create components from section data
      const loadedSections: Record<string, React.ComponentType<any>> = {};
      const sectionsDataList: LoadedSection[] = [];

      for (const sectionData of allSectionsData) {
        try {
          const component = createSectionComponent(sectionData);

          // Use meta.name as the key for Craft.js resolver
          const componentName = sectionData.meta.name;
          loadedSections[componentName] = component;

          sectionsDataList.push({
            name: componentName,
            component,
            data: sectionData,
          });
        } catch (err) {
          console.error(
            `Failed to create component for ${sectionData.name}:`,
            err
          );
        }
      }

      setSections(loadedSections);
      setSectionsData(sectionsDataList);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load sections")
      );
    } finally {
      setLoading(false);
    }
  };

  return { sections, sectionsData, loading, error, reload: loadSections };
}
