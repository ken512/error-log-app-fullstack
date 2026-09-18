"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/*
layout.tsxのServer Componentを維持しながら、クライアントコンポートであるQueryClientProviderを使うために、
Providerの部分の部分だけを別コンポーネントにしている。
*/ 

export const AppProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
