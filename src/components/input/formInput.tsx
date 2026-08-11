"use client";

// 汎用性のフォームInputコンポーネント

import type { UseFormRegisterReturn } from "react-hook-form";


export type FormInputProps = {
  label: string;
  type: "text" | "email" | "password";
  registration?: UseFormRegisterReturn; // とりうる全ての属性の型
  error?: string;
  shoPasswordToggle?: boolean;
};

export const FormInput = ({label, type, registration, error, shoPasswordToggle}:FormInputProps) => {

const baseLabel = "text-md mt-[50px]"
const baseInput = "w-[100%] p-[10px] border-none rounded-xl text-sm bg-white text-black focus:outline-blue-500";

  return (
    <>
      <label className={baseLabel}>{label}</label>
      <input type={type } {...registration} className={baseInput}/>
      { Boolean(error) && <p>{error}</p>}
    </>
  )
}