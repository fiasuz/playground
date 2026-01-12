export type SettingBlocks = "general" | "theme" | "history" | "plans";

export interface ISettingsStoreState {
  show: boolean;
  activeBlock: SettingBlocks | undefined;
}

export interface ISettingsStoreActions {
  onToggle: () => void;
  onChangeActiveBlock: (active: SettingBlocks | undefined) => void;
}
