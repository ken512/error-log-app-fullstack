"use client";

import { Button } from "@/components/Button/Button";
import { dialogActionsAtom } from "@/stores/dialogActionsAtom";
import { useSetAtom } from "jotai";

type ErrorLogActionsProps = {
  isEditing: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onCancel: () => void;
};

export const ErrorLogActionsSection = ({
  isEditing,
  isUpdating,
  isDeleting,
  onEdit,
  onCancel,
}: ErrorLogActionsProps) => {

  const dispatch = useSetAtom(dialogActionsAtom);
  
  return (
    <section className="mt-10 w-full my-10 rounded-xl bg-[#333333] px-5 py-5">
      {isEditing ? (
        <div className="flex gap-16 justify-center">
          <Button
            type="button"
            disabled={isUpdating}
            onClick={() => dispatch("open")}
            className="border border-[#1e90ff] text-[#1e90ff] font-bold px-3 py-3"
          >
            {isUpdating ? "保存中" : "保存"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="border border-[#ff6666] text-[#ff6666] font-bold px-3 py-3"
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <div key="normal-actions" className="flex gap-16">
          <Button
            type="button"
            onClick={onEdit}
            className="border border-[#1e90ff] text-[#1e90ff] font-bold px-3 py-3"
          >
            編集する
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={() => dispatch("open")}
            className="border border-[#ff6666] text-[#ff6666] font-bold px-3 py-3"
          >
            {isDeleting ? "削除中..." : "削除する"}
          </Button>
        </div>
      )}
    </section>
  );
};
