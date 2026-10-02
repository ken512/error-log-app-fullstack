"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from 'tailwind-merge';
// 汎用性のフォームコンポーネント

type Props = {
  children?: ReactNode,
  className?: string
} & ComponentPropsWithoutRef<'button'>; // type disabled, onClickなどが自動で含まれる。

export const Button = ({children, className = "", ...props}: Props) => {

  const baseStyle = `px-4 py-2 rounded-md font-bold`

  return (
    <button
      className={twMerge(baseStyle, className)}
      {...props}    
    >
    {children}
    </button>
  )
};