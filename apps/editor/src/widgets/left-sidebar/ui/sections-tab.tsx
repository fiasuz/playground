/* eslint-disable */

import { useGitHubSections } from "@/entities/section";
import { useState, useMemo } from "react";
import { SectionCard } from "./section-card";

export function SectionsTab() {
  const { sectionsData } = useGitHubSections();
  const [search] = useState("");
  const [category] = useState("all");

  // Filter sections
  const filteredSections = useMemo(() => {
    return sectionsData.filter((section) => {
      const matchSearch = section.data.meta.displayName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        category === "all" || section.data.meta.category === category;
      return matchSearch && matchCategory;
    });
  }, [sectionsData, search, category]);

  // Get unique categories
  // const categories = useMemo(() => {
  //   const cats = sectionsData.map((s) => s.data.meta.category);
  //   return ["all", ...new Set(cats)];
  // }, [sectionsData]);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b">
        {/* <SearchSections value={search} onChange={setSearch} /> */}
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b">
        {/* <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        /> */}
      </div>

      {/* Section Cards */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {filteredSections.map((section) => (
          <SectionCard key={section.name} section={section} />
        ))}
      </div>
    </div>
  );
}
