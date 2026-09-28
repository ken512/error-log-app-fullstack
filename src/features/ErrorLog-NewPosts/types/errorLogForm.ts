

export type ErrorLogFormValues = {
  title: string;
  status: "RESOLVED" | "UNRESOLVED";
  os: string | null;
  framework: string | null;
  framework_version: string | null;
  solution: string;
  cause: string;
  error_message: string;
  reference_url: string;
  tags: string[];
};