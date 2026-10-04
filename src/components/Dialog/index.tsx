import { useAtomValue, useSetAtom } from "jotai";
import { dialogActionsAtom, dialogOpenAtom } from "@/stores/dialogActionsAtom";
import { Button } from "../Button/Button";

type DialogProps = {
  onConfirm: () => void | Promise<void | undefined>;
};

export const Dialog = ({ onConfirm }: DialogProps) => {
  // ダイアログを開く時の状態管理。
  const isOpen = useAtomValue(dialogOpenAtom);
  // ダイアログのアクションごとの状態管理
  const dispatch = useSetAtom(dialogActionsAtom);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80">
      <div className="min-h-[250px] max-h-[100vh] bg-amber-50 rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col justify-between">
        <p className="text-black font-bold text-xl">投稿しますか？</p>

        <div className="flex justify-center gap-4 w-full">
          <Button
            className="flex-1 border-none bg-red-500 text-white"
            onClick={() => dispatch("close")}
          >
            キャンセル
          </Button>
          <Button
            className="flex-1 border-none bg-blue-500 text-white"
            onClick={async () => {
              await onConfirm();
              dispatch("close");
            }}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
};
