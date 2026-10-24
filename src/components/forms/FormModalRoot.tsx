"use client";

import type { ReactNode } from "react";
import { FormModal } from "@/components/forms/FormModal";
import { FormModalProvider } from "@/components/forms/FormModalContext";

/** Client boundary: global form modal state + host. */
export function FormModalRoot({ children }: { children: ReactNode }) {
  return (
    <FormModalProvider>
      {children}
      <FormModal />
    </FormModalProvider>
  );
}
