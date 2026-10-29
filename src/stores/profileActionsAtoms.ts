import { atom } from "jotai";

export type ProfileMode = "View" | "Edit";
export const profileModeAtom = atom<ProfileMode>("View");