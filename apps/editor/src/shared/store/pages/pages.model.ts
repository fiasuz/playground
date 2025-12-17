import type { BreakpointsKey } from "@/shared/constants";

export type IPageType =
  | "default"
  | "index"
  | "detail"
  | "not_found"
  | "server_error";

export interface IPage {
  id: string;
  craftContent?:
    | {
        [key in BreakpointsKey]?: string;
      }
    | undefined;
  createdAt?: Date;
  type: IPageType;
  route: string;
  child: IPage | null;
}

export interface IPagesStoreState {
  pages: IPage[];
  activePage: string | null;
  activeBreakpoint: BreakpointsKey;
}

export interface IPagesStoreActions {
  addPage: ({ type, route }: { type: IPageType; route: string }) => void;
  deletePage: (id: string) => void;
  renamePage: (id: string, newName: string) => void;
  updatePageRoute: (id: string, newRoute: string) => void;
  setActivePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  addBreakpointToPage: (pageId: string, breakpoint: BreakpointsKey) => void;

  savePageContent: (pageId: string, content: string) => void;
  loadPageContent: (pageId: string) => IPage["craftContent"] | undefined;

  addDetailPage: (parentId: string, route: string) => void;
  hasDetailPage: (pageId: string) => boolean;
  getDetailPage: (pageId: string) => IPage | null;
  removeDetailPage: (parentId: string) => void;

  setActiveBreakpoint: (breakpoint: BreakpointsKey) => void;
}
