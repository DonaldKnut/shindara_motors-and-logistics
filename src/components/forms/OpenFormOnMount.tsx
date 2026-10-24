"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormModal } from "@/components/forms/FormModalContext";

type OpenFormOnMountProps = {
  kind: "enquire" | "contact";
};

/** Opens the global form modal once when landing on /enquire or /contact. */
export function OpenFormOnMount({ kind }: OpenFormOnMountProps) {
  const searchParams = useSearchParams();
  const { openEnquire, openContact } = useFormModal();

  useEffect(() => {
    const type = searchParams.get("type") ?? undefined;
    const vehicleId = searchParams.get("vehicleId") ?? undefined;
    const vehicleLabel = searchParams.get("vehicle") ?? undefined;
    const hub = searchParams.get("hub");
    const route = searchParams.get("route");
    const mode = searchParams.get("mode");
    const extras = [
      hub ? `Hub: ${hub}` : null,
      route ? `Route: ${route}` : null,
      mode ? `Mode: ${mode}` : null,
    ].filter(Boolean);

    if (kind === "contact") {
      openContact({
        type,
        message: vehicleLabel
          ? `I would like to enquire about: ${vehicleLabel}\n\n`
          : undefined,
      });
      return;
    }

    openEnquire({
      type,
      vehicleId,
      vehicleLabel,
      message: extras.length ? `${extras.join(" · ")}\n\n` : undefined,
    });
    // Intentionally once on mount for this URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
