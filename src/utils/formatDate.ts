import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

type FormatDateProps = {
  date: string | Date;
};

// UTCで作成・更新された日時のフォーマットに変換する関数
// TZDateはnumber型のため、Stringで文字列型に変換
export const formatDate = ({ date }: FormatDateProps) => {
  const japanDate = new TZDate(String(date), "UTC");

  return format(japanDate, "yyyy/MM/dd");
};
