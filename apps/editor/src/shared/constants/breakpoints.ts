export type BreakpointsKey = "mobile" | "tablet" | "desktop";

export const breakpoints: {
  [key in BreakpointsKey]: {
    width: number;
    key: BreakpointsKey;
    defaultHeight: number;
  };
} = {
  mobile: {
    width: 640,
    key: "mobile",
    defaultHeight: 1000,
  },
  tablet: {
    width: 768,
    key: "tablet",
    defaultHeight: 1000,
  },
  desktop: {
    width: 1024,
    key: "desktop",
    defaultHeight: 1000,
  },
};
