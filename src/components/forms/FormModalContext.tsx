"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getVehicleById, type Vehicle } from "@/data/vehicles";

export type FormModalKind = "enquire" | "contact";

export type OpenEnquireOptions = {
  vehicle?: Vehicle | null;
  vehicleId?: string;
  vehicleLabel?: string;
  /** Prefill enquiry type (must match company.enquiryTypes) */
  type?: string;
  /** Extra lines for the message field */
  message?: string;
};

export type OpenContactOptions = {
  type?: string;
  message?: string;
};

export type FormModalState =
  | { open: false }
  | {
      open: true;
      kind: "enquire";
      vehicle: Vehicle | null;
      vehicleLabel?: string;
      type?: string;
      message?: string;
    }
  | {
      open: true;
      kind: "contact";
      type?: string;
      message?: string;
    };

type FormModalContextValue = {
  state: FormModalState;
  openEnquire: (options?: OpenEnquireOptions) => void;
  openContact: (options?: OpenContactOptions) => void;
  /** Opens enquire or contact from a /enquire or /contact href */
  openFromHref: (href: string) => boolean;
  close: () => void;
};

const FormModalContext = createContext<FormModalContextValue | null>(null);

function parseHref(href: string): URL | null {
  try {
    return new URL(href, "https://shindaraautos.com");
  } catch {
    return null;
  }
}

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FormModalState>({ open: false });

  const close = useCallback(() => setState({ open: false }), []);

  const openEnquire = useCallback((options: OpenEnquireOptions = {}) => {
    const fromId = options.vehicleId
      ? getVehicleById(options.vehicleId)
      : undefined;
    const vehicle = options.vehicle ?? fromId ?? null;
    setState({
      open: true,
      kind: "enquire",
      vehicle,
      vehicleLabel: options.vehicleLabel,
      type: options.type,
      message: options.message,
    });
  }, []);

  const openContact = useCallback((options: OpenContactOptions = {}) => {
    setState({
      open: true,
      kind: "contact",
      type: options.type,
      message: options.message,
    });
  }, []);

  const openFromHref = useCallback(
    (href: string) => {
      const url = parseHref(href);
      if (!url) return false;
      const path = url.pathname.replace(/\/$/, "") || "/";

      if (path === "/enquire") {
        const type = url.searchParams.get("type") ?? undefined;
        const vehicleId = url.searchParams.get("vehicleId") ?? undefined;
        const vehicleLabel = url.searchParams.get("vehicle") ?? undefined;
        const hub = url.searchParams.get("hub");
        const route = url.searchParams.get("route");
        const mode = url.searchParams.get("mode");
        const extras = [
          hub ? `Hub: ${hub}` : null,
          route ? `Route: ${route}` : null,
          mode ? `Mode: ${mode}` : null,
        ].filter(Boolean);
        openEnquire({
          type,
          vehicleId,
          vehicleLabel,
          message: extras.length ? `${extras.join(" · ")}\n\n` : undefined,
        });
        return true;
      }

      if (path === "/contact") {
        openContact({
          type: url.searchParams.get("type") ?? undefined,
          message: url.searchParams.get("vehicle")
            ? `I would like to enquire about: ${url.searchParams.get("vehicle")}\n\n`
            : undefined,
        });
        return true;
      }

      return false;
    },
    [openContact, openEnquire],
  );

  const value = useMemo(
    () => ({ state, openEnquire, openContact, openFromHref, close }),
    [state, openEnquire, openContact, openFromHref, close],
  );

  return (
    <FormModalContext.Provider value={value}>{children}</FormModalContext.Provider>
  );
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) {
    throw new Error("useFormModal must be used within FormModalProvider");
  }
  return ctx;
}
