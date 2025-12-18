import type { IPage } from "./pages.model";

/**
 * Generate unique route by checking existing routes
 * If route exists, append -2, -3, etc.
 * @param baseRoute - Base route to check
 * @param existingPages - Array of existing pages
 * @returns Unique route
 */
export const generateUniqueRoute = (
  baseRoute: string,
  existingPages: IPage[],
): string => {
  const existingRoutes = existingPages.map((p) => p.route);

  if (!existingRoutes.includes(baseRoute)) {
    return baseRoute;
  }

  let counter = 2;
  let uniqueRoute = `${baseRoute}-${counter}`;

  while (existingRoutes.includes(uniqueRoute)) {
    counter++;
    uniqueRoute = `${baseRoute}-${counter}`;
  }

  return uniqueRoute;
};
