"use client";

import { useForm } from "react-hook-form";
import { signUp } from "./actions/signup";
import { SignUpInput } from "./schemas/signUpSchema";
import { AuthFormModeProps } from "@/types/auth";
import { signUpFields } from "@/config/auth/authFields";
import { FormInput } from "@/hooks/input/formInput";

export const SignUpForm = ({ mode }: AuthFormModeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ mode: "onBlur" });

  const onSubmit = async (data: SignUpInput) => {
    const result = await signUp(data);

    if (!result.isSuccess) {
      return result.error.message;
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpFields.map((field) => (
        <FormInput
          key={field.name}
          label={field.label}
          type={field.type}
          registration={register(field.name)}
          error={errors[field.name]?.message}
        />
      ))}
      <button type="submit">
        {mode === "signup" ? "新規登録" : "ログイン"}
      </button>
    </form>
  );
};
