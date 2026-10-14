
// 処理の種類を型で定義
export type DialogActions = "create" | "update" | "delete";

// ダイアログの処理を共通化

type DialogConfig = {
  title: string;
  description: string;
  confirmLabel: string;
};

// 処理ごとの表示設定
export const DIALOG_CONFIG: Record<DialogActions, DialogConfig> = {
  create: {
    title: "エラーログを投稿しますか？",
    description: "入力した内容で新しく登録します。",
    confirmLabel: "投稿する",
  },

  update: {
    title: "変更内容を保存しますか？",
    description: "エラーログが編集内容で更新されます。",
    confirmLabel: "保存する",
  },

  delete: {
    title: "エラーログを削除しますか？",
    description: "削除したデータは元に戻せません。",
    confirmLabel: "削除する",
  }, 
}