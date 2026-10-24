"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import {
  useFormModal,
  type OpenContactOptions,
  type OpenEnquireOptions,
} from "@/components/forms/FormModalContext";

type ButtonLooks = Pick<
  ComponentPropsWithoutRef<typeof Button>,
  "variant" | "size" | "showArrow" | "className" | "icon" | "iconPosition"
>;

type EnquireProps = ButtonLooks & {
  kind?: "enquire";
  children: ReactNode;
  options?: OpenEnquireOptions;
  onOpen?: () => void;
};

type ContactProps = ButtonLooks & {
  kind: "contact";
  children: ReactNode;
  options?: OpenContactOptions;
  onOpen?: () => void;
};

/** Button that opens the global enquire/contact modal instead of navigating. */
export function OpenFormButton(props: EnquireProps | ContactProps) {
  const { openEnquire, openContact } = useFormModal();
  const {
    children,
    kind = "enquire",
    onOpen,
    variant,
    size,
    showArrow,
    className,
    icon,
    iconPosition,
  } = props;

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      showArrow={showArrow}
      className={className}
      icon={icon}
      iconPosition={iconPosition}
      onClick={() => {
        onOpen?.();
        if (kind === "contact") {
          openContact("options" in props ? props.options : undefined);
        } else {
          openEnquire("options" in props ? props.options : undefined);
        }
      }}
    >
      {children}
    </Button>
  );
}
