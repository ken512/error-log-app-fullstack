import { atom } from "jotai";

const baseDialogOpenAtom = atom(false);

// ダイアログを開くための状態管理
export const dialogOpenAtom = atom((get) => get(baseDialogOpenAtom));

// ダイアログのアクションごとの状態管理
export const dialogActionsAtom = atom(null, (_get, set, action: "open" | "close" | "toggle") => {
  if(action === "open") set(baseDialogOpenAtom, true);
  if(action === "close") set(baseDialogOpenAtom, false);
  if(action === "toggle") set(baseDialogOpenAtom,(prev) => !prev);
});

