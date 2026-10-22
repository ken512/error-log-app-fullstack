import { ErrorLogListItem, ErrorLogDetail } from "./errorLog.type"
import { PaginationData } from "@/utils/errorLogList/calculatePagination";
import { Profile } from "../features/Profile/types/profile.type";
import { ErrorLogSummary } from "./errorLog.type";

export type ErrorLogListResponse = {
  status: "OK",
  errorlog: ErrorLogListItem[];
  pagination: PaginationData;
  summary: ErrorLogSummary;
};

export type ErrorLogDetailResponse = {
  status: "OK";
  detailErrorLog: ErrorLogDetail;
};

export type CreateErrorLogResponse = {
  status: "OK",
  message: string;
  errorLogData: ErrorLogDetail[];
};

export type UpdateErrorLogResponse = {
  status: "OK",
  message: string;
  errorLog: ErrorLogDetail;
};

export type DeleteErrorLogResponse = {
  status: "OK",
  message: string;
};

export type UserProfileResponse = {
  status: "OK";
  user: Profile;
};

export type UpdateUserProfile = {
  status: "OK",
  message: string;
  user: Profile;
};