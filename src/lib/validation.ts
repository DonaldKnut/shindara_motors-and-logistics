import { z } from "zod";
import { enquiryTypes } from "@/data/company";

export const honeypotSchema = z.object({
  website: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  enquiryType: z.string().trim().min(2).max(80),
  message: z.string().trim().min(12).max(4000),
  website: z.string().optional(),
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  country: z.string().trim().min(2).max(80),
  enquiryType: z.enum(enquiryTypes),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  preferredContact: z.enum(["Email", "Phone", "WhatsApp"]),
  vehicleInterest: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(5000),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Consent is required to process your enquiry.",
    }),
  website: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(160),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  source: z.string().trim().max(80).optional(),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export function isHoneypotTriggered(website?: string) {
  return Boolean(website && website.trim().length > 0);
}
