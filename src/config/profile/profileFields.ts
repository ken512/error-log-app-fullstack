export type ProfileFieldName = 
| "userName"
| "xUrl"
| "instagramUrl"
| "threadsUrl"
| "githubUrl";

export type ProfileField = {
  name: ProfileFieldName;
  label: string;
  type: "text" | "url";
  placeholder: string;
};


export const PROFILE_FIELDS = [
  {
    name: "userName",
    label: "ユーザー名",
    type: "text",
    placeholder: "https://x.com/username"
  },
  {
    name: "xUrl",
    label: "X",
    type: "url",
    placeholder: "https://x.com/username",
  },
  {
    name: "instagramUrl",
    label: "Instagram",
    type: "url",
    placeholder: "https://instagram.com/username",
  },
  {
    name: "threadsUrl",
    label: "Threads",
    type: "url",
    placeholder: "https://threads.net/@username",
  },
  {
    name: "githubUrl",
    label: "GitHub",
    type: "url",
    placeholder: "https://github.com/username",
  },
] as const satisfies readonly ProfileField[]; // PROFILE_FIELDSの各要素が型通りの構造や値になっているかを厳格にチェック。