"use client";

// 汎用性のフォームInputコンポーネント

import type { UseFormRegisterReturn } from "react-hook-form";


export type FormInputProps = {
  label: string;
  type: "text" | "email" | "password";
  registration?: UseFormRegisterReturn; // とりうる全ての属性の型
  error?: string;
};

export const FormInput = ({label, type, registration, error}:FormInputProps) => {



  return (
    <>
      <label>{label}</label>
      <input type={type} {...registration}/>
      { Boolean(error) && <p>{error}</p>}
    </>
  )
}