export type BreakpointsKey = "mobile" | "tablet" | "desktop";

export const breakpoints: {
  [key: string]: { size: number; key: BreakpointsKey };
} = {
  mobile: {
    size: 640,
    key: "mobile",
  },
  tablet: {
    size: 768,
    key: "tablet",
  },
  desktop: {
    size: 1024,
    key: "desktop",
  },
};
