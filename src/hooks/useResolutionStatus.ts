import { ResolutionStatus } from "@/generated/prisma";

const STATUS_JA_MAP: Record<ResolutionStatus, string> = {
  [ResolutionStatus.RESOLVED]: "解決済み",
  [ResolutionStatus.UNRESOLVED]: "未解決",
} as const;

export const useResolutionStatus = () => {
  const formatStatusJa = (status: ResolutionStatus): string => {
    // 結果がundefinedまたはnullの場合、不明を返す
    //  STATUS_JA_MAPのオブジェクトのvalue(値)を取り出すのにブラケット記法で、日本語を取り出している。
    return STATUS_JA_MAP[status] ?? "不明";
  };

  return { formatStatusJa };
};
