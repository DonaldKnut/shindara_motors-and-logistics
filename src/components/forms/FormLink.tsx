"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { useFormModal } from "@/components/forms/FormModalContext";

type FormLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
  /** If href is not a form route, falls back to normal navigation */
  forceModal?: boolean;
};

/**
 * Link that opens enquire/contact as a modal when the href targets those routes.
 */
export function FormLink({
  href,
  children,
  forceModal = true,
  onClick,
  ...rest
}: FormLinkProps) {
  const { openFromHref } = useFormModal();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!forceModal) return;
    if (openFromHref(href)) {
      event.preventDefault();
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
