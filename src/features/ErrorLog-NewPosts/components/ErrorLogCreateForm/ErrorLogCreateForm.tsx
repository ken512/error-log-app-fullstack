"use client";

import { usePost } from "@/hooks/useFetch";
import { ErrorLogFormValues } from "../../types/errorLogForm";
import { CreateErrorLogResponse } from "@/types/api-response";
import { BasicInformationSection } from "./BasicInformationSection";
import { EnvironmentSection } from "./EnvironmentSection";
import { Button } from "@/components/Button";
import { ErrorDetailsSection } from "./ErrorDetailsSection";
import { FormProvider, useForm } from "react-hook-form";


export const ErrorLogNewCreateForm = () => {
  const methods = useForm<ErrorLogFormValues>({
    defaultValues: {
      // defaultValuesで、フォームの初期を設定し、コンポーネントの初回レンダリング時を一度だけキャッシュ。
      title: "",
      status: "UNRESOLVED",
      tags: [],
      os: "",
      framework: "",
      framework_version: "",
      solution: "",
      cause: "",
      error_message: "",
      reference_url: "",
    },
  });

  const { mutate, error, isPending } = usePost<
    ErrorLogFormValues,
    CreateErrorLogResponse
  >("/admin/errorlog");

  const onSubmit = (formValues: ErrorLogFormValues) => {
    mutate(formValues, {
      onSuccess: (response) => {
        console.log(response.message);
        console.log(response.errorLogData);
        methods.reset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <BasicInformationSection />
        <EnvironmentSection />
        <ErrorDetailsSection />
        <Button type="submit" disabled={isPending} className="mt-10 border">
          {isPending ? "保留中..." : "投稿する"}
        </Button>

        {error && (
          <p className="text-red-500">投稿に失敗</p>
        )}
      </form>
    </FormProvider>
  );
};
