import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { nanoid } from "nanoid";
import type {
  IPage,
  IPagesStoreActions,
  IPagesStoreState,
} from "./pages.model";
import { toast } from "sonner";

const homePageId = nanoid(9);
export const indexPage = "/";
export const initialPageContent =
  "eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkJyZWFrcG9pbnRlciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPEOGJhY2tncm91bmQiOiIjZmZmIiwiZGF0YS1jeSI6InJvb3QtY29udGFpbsZJZGlzcGxhedRnLCJjdXN0b20iOnt9LCJoaWRkZW4iOmZhbHNlLCJub2RlcyI6W10sImxpbmtlZE7GEXt9fX0=";

const initials: IPage[] = [
  {
    id: homePageId,
    createdAt: new Date(),
    type: "index",
    route: indexPage,
    child: null,
    craftContent: {
      desktop: initialPageContent,
    },
  },
];

/**
 * Generate unique route by checking existing routes
 * If route exists, append -2, -3, etc.
 * @param baseRoute - Base route to check
 * @param existingPages - Array of existing pages
 * @returns Unique route
 */
const generateUniqueRoute = (
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

/**
 * Pages store
 */
export const pagesStore = create<IPagesStoreState & IPagesStoreActions>()(
  devtools((set, get) => ({
    pages: initials,
    activePage: homePageId,
    activeBreakpoint: "desktop",

    /**
     * Add Page
     * @param payload - Page payload with route and type
     */
    addPage: (payload) => {
      const pages = get().pages;
      const newId = nanoid(9);

      const baseRoute = payload.route.toLowerCase().replace(/\s+/g, "-");
      const uniqueRoute = generateUniqueRoute(baseRoute, pages);

      const newPage: IPage = {
        id: newId,
        createdAt: new Date(),
        type: payload.type,
        route: uniqueRoute,
        craftContent: {
          desktop: initialPageContent,
        },
        child: null,
      };

      set({
        pages: [...pages, newPage],
        activePage: newId,
        activeBreakpoint: "desktop",
      });
    },

    /**
     * Delete page by id
     * @param id {String}
     */
    deletePage: (id) => {
      const pages = get().pages;

      const filteredPages = pages.filter((p) => p.id !== id);

      set({
        pages: filteredPages,
        activePage: homePageId,
      });
    },

    /**
     * Rename Page
     * @param id {String}
     * @param newName {String}
     */
    renamePage: (id, newName) => {
      const pages = get().pages;

      const updatedPages = pages.map((p) =>
        p.id === id ? { ...p, name: newName } : p,
      );

      set({ pages: updatedPages });
    },

    /**
     * Update page route
     * @param id - Page ID
     * @param newRoute - New route
     */
    updatePageRoute: (id, newRoute) => {
      const pages = get().pages;
      const currentPage = pages.find((p) => p.id === id);

      if (!currentPage) {
        toast.warning("Page not found");
        return;
      }

      // Validate and format route
      let formattedRoute = newRoute.trim();
      if (!formattedRoute.startsWith("/")) {
        formattedRoute = `/${formattedRoute}`;
      }

      // Check if route already exists (excluding current page)
      const routeExists = pages.some(
        (p) => p.id !== id && p.route === formattedRoute,
      );

      if (routeExists) {
        toast.warning("Route already exists");
        return;
      }

      const updatedPages = pages.map((p) => {
        if (p.id === id) {
          // Update parent page route
          const updatedPage = { ...p, route: formattedRoute };

          // If page has child (detail page), update child route as well
          if (updatedPage.child && updatedPage.child.type === "detail") {
            // Extract dynamic part from child route (e.g., /:id, /:slug)
            const dynamicPart =
              updatedPage.child.route.match(/(\/:[^/]+)$/)?.[1] || "/:id";

            // Generate new child route based on parent's new route
            const newChildRoute = `${formattedRoute}${dynamicPart}`;

            updatedPage.child = {
              ...updatedPage.child,
              route: newChildRoute,
            };
          }

          return updatedPage;
        }
        return p;
      });

      set({ pages: updatedPages });
    },

    /**
     * Change active page
     * @param id {String}
     */
    setActivePage: (id) => {
      set({ activePage: id, activeBreakpoint: "desktop" });
    },

    /**
     * Add breakpoint to page
     * @param pageId - Page ID
     * @param breakpoint - Breakpoint key to add
     */
    addBreakpointToPage: (pageId, breakpoint) => {
      const pages = get().pages;

      // First check parent pages
      let page = pages.find((p) => p.id === pageId);
      let isChild = false;
      let parentPageId: string | null = null;

      // If not found in parents, search in children
      if (!page) {
        for (const parentPage of pages) {
          if (parentPage.child && parentPage.child.id === pageId) {
            page = parentPage.child;
            isChild = true;
            parentPageId = parentPage.id;
            break;
          }
        }
      }

      if (!page) {
        toast.warning("Page not found");
        return;
      }

      const updatedPages = pages.map((p) => {
        if (isChild && p.id === parentPageId) {
          // Update child page
          const newChildContent = { ...p.child!.craftContent };
          newChildContent[breakpoint] = p.child!.craftContent?.desktop;

          return {
            ...p,
            child: {
              ...p.child!,
              craftContent: newChildContent,
            },
          };
        } else if (!isChild && p.id === pageId) {
          // Update parent page
          const newContent = { ...p.craftContent };
          newContent[breakpoint] = p.craftContent?.desktop;

          return {
            ...p,
            craftContent: newContent,
          };
        }
        return p;
      });

      set({
        pages: updatedPages,
        activeBreakpoint: breakpoint,
      });
    },

    /**
     * Duplicate page
     * @param id - Page ID to duplicate
     */
    duplicatePage: (id) => {
      const pages = get().pages;
      const pageToDuplicate = pages.find((p) => p.id === id);

      if (!pageToDuplicate) {
        toast.warning(`Page with id ${id} not found`);
        return;
      }

      const newId = nanoid(9);

      // Generate base route for duplicated page
      let baseRoute: string;

      if (pageToDuplicate.type === "detail") {
        // For detail pages, append -copy to the base route
        // Example: /product/:id -> /product-copy/:id
        baseRoute = pageToDuplicate.route.replace(
          /^(\/[^/:]+)(\/:.+)?$/,
          "$1-copy$2",
        );
      } else if (pageToDuplicate.type === "index") {
        // Index pages cannot be duplicated with same route
        baseRoute = "/home";
      } else {
        // For regular pages, append -copy
        // Example: /about -> /about-copy
        baseRoute = `${pageToDuplicate.route}-copy`;
      }

      // Ensure unique route
      const uniqueRoute = generateUniqueRoute(baseRoute, pages);

      const duplicatedPage: IPage = {
        ...pageToDuplicate,
        id: newId,
        route: uniqueRoute,
        createdAt: new Date(),
      };

      set({
        pages: [...pages, duplicatedPage],
        activePage: newId,
      });
    },

    /**
     * Save page content
     * @param pageId {String}
     * @param content {Craftjs json content}
     */
    savePageContent: (pageId, content) => {
      const pages = get().pages;
      const activeBreakpoint = get().activeBreakpoint;

      const updatedPages = pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              craftContent: {
                ...p.craftContent,
                [activeBreakpoint]: content,
              },
            }
          : p,
      );

      set({ pages: updatedPages });
    },

    /**
     * Load page content
     * @param pageId {String}
     */
    loadPageContent: (pageId) => {
      const page = get().pages.find((p) => p.id === pageId);

      return page?.craftContent;
    },

    /**
     * Add detail page to parent page
     * @param parentId - Parent page ID
     * @param route - Detail page route
     */
    addDetailPage: (parentId, route) => {
      const pages = get().pages;
      const parentPage = pages.find((p) => p.id === parentId);

      if (!parentPage) {
        toast.warning(`Parent page with id ${parentId} not found`);
        return;
      }

      if (parentPage.child !== null) {
        toast.warning(`Parent page already has a detail page`);
        return;
      }

      const newId = nanoid(9);

      // Generate detail route based on parent route
      let baseRoute = route.toLowerCase().replace(/\s+/g, "-");
      if (!baseRoute.startsWith("/")) {
        baseRoute = `/${baseRoute}`;
      }

      // Ensure it's a detail route with :id
      if (!baseRoute.includes(":id")) {
        baseRoute = `${baseRoute}/:id`;
      }

      // Generate unique route
      const uniqueRoute = generateUniqueRoute(baseRoute, pages);

      const detailPage: IPage = {
        id: newId,
        createdAt: new Date(),
        type: "detail",
        route: uniqueRoute,
        child: null,
      };

      // Update parent page with child
      const updatedPages = pages.map((p) =>
        p.id === parentId ? { ...p, child: detailPage } : p,
      );

      set({
        pages: updatedPages,
        activePage: newId,
      });
    },

    /**
     * Check if page has detail page
     * @param pageId - Page ID
     * @returns boolean
     */
    hasDetailPage: (pageId) => {
      const page = get().pages.find((p) => p.id === pageId);
      return page?.child !== null && page?.child !== undefined;
    },

    /**
     * Get detail page of parent page
     * @param pageId - Parent page ID
     * @returns Detail page or null
     */
    getDetailPage: (pageId) => {
      const page = get().pages.find((p) => p.id === pageId);
      return page?.child || null;
    },

    /**
     * Remove detail page from parent
     * @param parentId - Parent page ID
     */
    removeDetailPage: (parentId) => {
      const pages = get().pages;

      const updatedPages = pages.map((p) =>
        p.id === parentId ? { ...p, child: null } : p,
      );

      set({ pages: updatedPages });
    },

    /**
     * Change active breakpoint
     * @param breakpoint {BreakpointsKey}
     */
    setActiveBreakpoint: (breakpoint) => {
      set({
        activeBreakpoint: breakpoint,
      });
    },
  })),
);
