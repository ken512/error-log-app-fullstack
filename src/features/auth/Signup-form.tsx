"use client";

import { useForm } from "react-hook-form";
import { signUp } from "./actions/signup";
import { SignUpInput } from "./schemas/signUpSchema";
import { signUpSchema } from "./schemas/signUpSchema";
import { AuthFormModeProps } from "@/types/auth";
import { signUpFields } from "@/config/auth/authFields";
import { FormInput } from "@/components/input/formInput";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignUpForm = ({ mode }: AuthFormModeProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({resolver: zodResolver(signUpSchema)});

  const onSubmit = async (data: SignUpInput) => {
    const result = await signUp(data);

    if (!result.isSuccess) {
      return result.error.message;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-[#333333] p-[30px] rounded-xl"
    >
      {signUpFields.map((field) => (
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
        {mode === "signup" ? "新規登録" : "ログイン"}
      </button>
    </form>
  );
};
