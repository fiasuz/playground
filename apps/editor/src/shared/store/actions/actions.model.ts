export type ActionsType = "default" | "insert" | "cms";

export interface ActionsStore {
  active: ActionsType;
  change: (action: ActionsType) => void;
}
