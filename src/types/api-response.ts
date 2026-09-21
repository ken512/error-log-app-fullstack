import { ErrorLogListItem, ErrorLogDetail } from "./errorLog.type"
import { PaginationData } from "@/utils/calculatePagination";
import { ErrorLogSummary } from "./errorLog.type";

export type ErrorLogListResponse = {
  status: "OK",
  errorlog: ErrorLogListItem[];
  pagination: PaginationData;
  summary: ErrorLogSummary;
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