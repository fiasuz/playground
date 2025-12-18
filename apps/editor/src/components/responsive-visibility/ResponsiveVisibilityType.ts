import type { BreakpointsKey } from "@/shared/constants";

/**
 * Responsive visibility configuration for components
 * If a breakpoint is set to false, the component will be hidden on that breakpoint
 * If not specified, defaults to true (visible)
 */
export interface ResponsiveVisibility {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

/**
 * Get whether component should be visible on current breakpoint (editor mode)
 */
export function isVisibleOnBreakpoint(
  visibility: ResponsiveVisibility | undefined,
  breakpoint: BreakpointsKey,
): boolean {
  if (!visibility) return true;
  return visibility[breakpoint] !== false;
}

/**
 * Generate Tailwind CSS classes for responsive visibility
 * Used in both editor and preview/production modes
 *
 * Breakpoint mappings:
 * - mobile: 0-639px (max-sm:hidden)
 * - tablet: 640-1023px (sm:max-lg:hidden)
 * - desktop: 1024px+ (lg:hidden)
 */
export function getResponsiveVisibilityClasses(
  visibility: ResponsiveVisibility | undefined,
): string {
  if (!visibility) return "";

  const classes: string[] = [];

  // Mobile: hide on screens smaller than 640px
  if (visibility.mobile === false) {
    classes.push("max-sm:hidden");
  }

  // Tablet: hide on screens between 640px-1023px
  if (visibility.tablet === false) {
    classes.push("sm:max-lg:hidden");
  }

  // Desktop: hide on screens 1024px and above
  if (visibility.desktop === false) {
    classes.push("lg:hidden");
  }

  return classes.join(" ");
}
