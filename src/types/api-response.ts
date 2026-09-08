import { ErrorListItem, ErrorLogDetail } from "./errorLog.type"

export type ErrorLogListResponse = {
  status: "OK",
  errorlog: ErrorListItem[];
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