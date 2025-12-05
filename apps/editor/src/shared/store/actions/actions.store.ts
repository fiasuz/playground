import { create } from "zustand";
import type { ActionsStore } from "./actions.model";

export const actionsStore = create<ActionsStore>((set) => ({
  active: "default",
  change: (action) =>
    set({
      active: action,
    }),
}));
