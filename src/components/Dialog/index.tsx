import { useAtomValue, useSetAtom } from "jotai";
import { DialogActions } from "@/utils/dialogConfig";
import { DIALOG_CONFIG } from "@/utils/dialogConfig";
import { dialogActionsAtom } from "@/stores/dialogActionsAtom";
import { dialogOpenAtom } from "@/stores/dialogActionsAtom";
import { Button } from "../Button/Button";

type DialogProps = {
  actions: DialogActions;
  isPending?: boolean;
  onConfirm: () => void | Promise<void | undefined>;
};

export const Dialog = ({ actions, isPending, onConfirm }: DialogProps) => {
  // ダイアログを開く時の状態管理。
  const isOpen = useAtomValue(dialogOpenAtom);

  const config = DIALOG_CONFIG[actions];

  // ダイアログのアクションごとの状態管理
  const dispatch = useSetAtom(dialogActionsAtom);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80">
      <div className="min-h-[250px] max-h-[100vh] bg-amber-50 rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-black">{config.title}</span>

          <span className="font-bold text-black">{config.description}</span>
        </div>
        <div className="flex justify-center gap-4 w-full">
          <Button
            className="flex-1 border-none bg-red-500 text-white"
            onClick={() => dispatch("close")}
          >
            キャンセル
          </Button>
          <Button
            type="button"
            className="flex-1 border-none bg-blue-500 text-white"
            onClick={async () => {
              await onConfirm();
              dispatch("close")
            }}
            disabled={isPending}
          >
            {isPending ? "処理中..." : config.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
