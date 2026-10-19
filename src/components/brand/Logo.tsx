import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  priority?: boolean;
  className?: string;
  /** Compact mark for tight header spaces */
  compact?: boolean;
};

/**
 * Official Shindara logo — transparent PNG derived from the supplied asset
 * (black background removed; mark and typography unchanged).
 */
export function Logo({ priority = false, className = "", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center focus-visible:outline-offset-4 ${className}`}
      aria-label="Shindara Motors & Logistics Limited — Home"
    >
      <Image
        src="/brand/shindara-logo.png"
        alt="Shindara Motors & Logistics Limited"
        width={compact ? 280 : 320}
        height={compact ? 280 : 320}
        priority={priority}
        className={`h-auto w-[clamp(3.75rem,16vw,7rem)] object-contain ${
          compact
            ? "min-[360px]:w-[5rem] sm:w-[5.75rem] lg:w-[6.5rem]"
            : "sm:w-[6.5rem] lg:w-[7.25rem]"
        }`}
      />
    </Link>
  );
}
