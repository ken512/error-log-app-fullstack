"use client";

import { useForm } from "react-hook-form";
import { SigninInput } from "../schemas/signInSchema";
import { signIn } from "../actions/signin";
import { signInSchema } from "../schemas/signInSchema";
import { loginFields } from "@/config/auth/authFields";
import { AuthFormModeProps } from "@/types/auth";
import { FormInput } from "@/components/input/formInput";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignInForm = ({mode}: AuthFormModeProps ) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SigninInput>({resolver: zodResolver(signInSchema)});

  const onSubmit = async (data: SigninInput) => {
    const result = await signIn(data);

    if(!result.isSuccess) {
        return result.error.message;
    };
  };

  return (
    <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-[#333333] p-[30px] rounded-xl"
        >
          {loginFields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              type={field.type}
              registration={register(field.name)}
              error={errors[field.name]?.message}
            />
          ))}
          <button
            type="submit"
            className="border-none rounded-md text-black bg-white p-3 mt-[50px] mx-[120px] hover:bg-gray-300"
          >
            {mode === "login" ? "ログイン" : "新規登録"}
          </button>
        </form>
  )
};