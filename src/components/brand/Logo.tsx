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
        width={compact ? 200 : 240}
        height={compact ? 200 : 240}
        priority={priority}
        className={`h-auto w-[clamp(2.55rem,14vw,5.25rem)] object-contain ${
          compact ? "min-[360px]:w-[3.6rem] sm:w-[4.1rem] lg:w-[4.6rem]" : "sm:w-[5rem] lg:w-[5.5rem]"
        }`}
      />
    </Link>
  );
}
