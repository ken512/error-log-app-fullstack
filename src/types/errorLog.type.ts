
export type TagData = {
  id: string;
  tag_name: string;
};

export type ErrorListItem = {
  id: string;
  title: string;
  status: "RESOLVED" | "UNRESOLVED";
  tags: TagData[];
};

export type ErrorLogDetail = {
  id: string;
  title: string;
  status: "RESOLVED" | "UNRESOLVED";
  os: string | null;
  framework: string | null;
  framework_version: string | null;
  solution: string;
  cause: string;
  error_message: string;
  tags: TagData[];
};