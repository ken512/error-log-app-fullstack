"use client";

import { Navigation } from "../Navi";
import { ToggleButton } from "../ToggleButton";
import { atom, useAtom } from "jotai";

type MenuBarProps = {
  isLoggedIn: boolean;
};

const menuOpenAtom = atom(false);

export const MenuBar = ({ isLoggedIn }: MenuBarProps) => {
  // メニューバーの開閉の状態管理
  const [isOpen, setIsOpen] = useAtom(menuOpenAtom);

  return (
    <div className="md:hidden">
      <ToggleButton
        isOpen={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        controls="navigation-menu"
        label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      />
      {isOpen && <Navigation open={isOpen} isLoggedIn={isLoggedIn} />}
    </div>
  );
};
