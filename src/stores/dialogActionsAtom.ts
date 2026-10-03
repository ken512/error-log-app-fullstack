import { atom } from "jotai";

const baseDialogOpenAtom = atom(false);

// 読み取り用のatom
export const dialogOpenAtom = atom((get) => get(baseDialogOpenAtom));

// ダイアログのアクションごとのatom
export const dialogActionsAtom = atom(null, (_get, set, action: "open" | "close" | "toggle") => {
  if(action === "open") set(baseDialogOpenAtom, true);
  if(action === "close") set(baseDialogOpenAtom, false);
  if(action === "toggle") set(baseDialogOpenAtom,(prev) => !prev);
});

