import { create } from "zustand";
import type {
  ISettingsStoreActions,
  ISettingsStoreState,
} from "./settings.model";

export const settingsStore = create<
  ISettingsStoreState & ISettingsStoreActions
>((set, get) => ({
  show: false,
  activeBlock: "general",
  onToggle: () => {
    const currState = get().show;
    set({
      show: !currState,
    });
  },
  onChangeActiveBlock: (active) => {
    set({
      activeBlock: active,
    });
  },
}));
