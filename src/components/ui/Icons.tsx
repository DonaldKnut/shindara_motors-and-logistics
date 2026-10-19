import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Car,
  ClipboardList,
  FileText,
  Package,
  Phone,
  Route,
  Search,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

export function NavIcon({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) {
  const map: Record<string, LucideIcon> = {
    services: Package,
    vehicles: Car,
    process: Route,
    about: Users,
    contact: Phone,
    enquire: FileText,
    home: Sparkles,
  };
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}

export function ServiceIcon({
  id,
  className = "h-5 w-5",
}: {
  id: string;
  className?: string;
}) {
  const map: Record<string, LucideIcon> = {
    "automobile-sales": Car,
    "vehicle-sourcing": Search,
    "automotive-support": BookOpen,
    "logistics-solutions": Truck,
    "business-transport": Users,
  };
  const Icon = map[id] ?? Package;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}

export { ClipboardList };
