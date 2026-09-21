import { ErrorLogListItem, ErrorLogDetail } from "./errorLog.type"
import { PaginationData } from "@/utils/calculatePagination";

export type ErrorLogListResponse = {
  status: "OK",
  errorlog: ErrorLogListItem[];
  pagination: PaginationData;
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