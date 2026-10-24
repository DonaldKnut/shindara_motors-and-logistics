import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO } from "@/data/media";

type LogoProps = {
  priority?: boolean;
  className?: string;
  /** Compact mark for tight header spaces */
  compact?: boolean;
};

/**
 * Official Shindara Automotive & Logistics lockup (Cloudinary).
 */
export function Logo({ priority = false, className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center focus-visible:outline-offset-4 ${className}`}
      aria-label="Shindara Automotive & Logistics Limited — Home"
    >
      <Image
        src={BRAND_LOGO}
        alt="Shindara Automotive & Logistics Limited"
        width={compact ? 200 : 240}
        height={compact ? 200 : 240}
        priority={priority}
        className={`h-auto w-[clamp(4.25rem,18vw,7.5rem)] object-contain ${
          compact
            ? "min-[360px]:w-[5.25rem] sm:w-[6rem] lg:w-[6.75rem]"
            : "sm:w-[6.75rem] lg:w-[7.75rem]"
        }`}
      />
    </Link>
  );
}
