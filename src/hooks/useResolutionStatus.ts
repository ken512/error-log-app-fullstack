import { ResolutionStatus } from "@/generated/prisma";

const STATUS_JA_MAP: Record<ResolutionStatus, string> = {
  [ResolutionStatus.RESOLVED]: "解決済み",
  [ResolutionStatus.UNRESOLVED]: "未解決",
} as const;

export const useResolutionStatus = () => {
  const formatJa = (status: ResolutionStatus): string => {
    return STATUS_JA_MAP[status] ?? "不明";
  };

  return { formatJa };
};
