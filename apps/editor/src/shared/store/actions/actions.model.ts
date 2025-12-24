export type ActionsType = "default" | "insert" | "cms" | "text";

export interface ActionsStore {
  active: ActionsType;
  change: (action: ActionsType) => void;
}
