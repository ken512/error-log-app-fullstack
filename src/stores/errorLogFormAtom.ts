import { atom } from "jotai";

export const tagInputAtom = atom<string>("");

export const errorLogTagsAtom = atom<string[]>([]);