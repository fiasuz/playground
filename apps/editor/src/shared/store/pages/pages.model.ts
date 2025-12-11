export type IPageType =
  | "default"
  | "index"
  | "detail"
  | "not_found"
  | "server_error";

export interface IPage {
  id: string;
  craftContent?: string;
  createdAt?: Date;
  type: IPageType;
  route: string;
  child: IPage | null;
}

export interface IPagesStore {
  pages: IPage[];
  activePage: string | null;

  addPage: ({ type, route }: { type: IPageType; route: string }) => void;
  deletePage: (id: string) => void;
  renamePage: (id: string, newName: string) => void;
  updatePageRoute: (id: string, newRoute: string) => void;
  setActivePage: (id: string) => void;
  duplicatePage: (id: string) => void;

  savePageContent: (pageId: string, content: string) => void;
  loadPageContent: (pageId: string) => string | undefined;

  addDetailPage: (parentId: string, route: string) => void;
  hasDetailPage: (pageId: string) => boolean;
  getDetailPage: (pageId: string) => IPage | null;
  removeDetailPage: (parentId: string) => void;
}
