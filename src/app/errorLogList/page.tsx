"use client";

import { ErrorLogList } from "@/features/ErrorLogList";
import { SearchInput } from "@/components/SearchInput";
const ErrorLogListPage = () => {

  return (
    <>
    <SearchInput />
    <ErrorLogList />
    </>
  )
};

export default ErrorLogListPage;