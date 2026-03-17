import { z } from "zod";

export const paymentRequestSchema = z.object({
  plan: z.enum(["BASIC", "PRO", "ULTIMATE"]),
});

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

export const waitlistRequestSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().max(100).optional(),
});

export const subscriptionManageRequestSchema = z.object({
  action: z.enum(["cancel", "resume"]),
});

export const adminRoleUpdateRequestSchema = z.object({
  role: z.enum(["member", "admin"]),
  user_id: z.string().trim().uuid(),
});

export const profileUpdateRequestSchema = z.object({
  avatar_path: z.string().trim().max(255).or(z.literal("")).optional(),
  avatar_url: z
    .string()
    .trim()
    .url()
    .or(z.literal(""))
    .optional(),
  full_name: z.string().trim().max(100).optional(),
});

export const aiGenerateRequestSchema = z.object({
  prompt: z.string().trim().min(1),
  system: z.string().trim().min(1).optional(),
  provider: z.enum(["openai", "anthropic"]).optional(),
});

export const aiChatRequestSchema = z.object({
  messages: z.array(z.object({}).passthrough()),
  provider: z.enum(["openai", "anthropic"]).optional(),
});

export const midtransNotificationSchema = z.object({
  order_id: z.string().trim().min(1),
  status_code: z.string().trim().min(1),
  gross_amount: z.string().trim().min(1),
  signature_key: z.string().trim().min(1),
  transaction_status: z.string().trim().min(1),
  fraud_status: z.string().trim().optional(),
  payment_type: z.string().trim().min(1).optional(),
});

export const dokuNotificationSchema = z.object({
  order: z.object({
    invoice_number: z.string().trim().min(1),
    amount: z.number().positive(),
  }),
  transaction: z.object({
    status: z.string().trim().min(1),
    date: z.string().trim().min(1),
    original_request_id: z.string().trim().min(1),
  }),
  channel: z.object({
    id: z.string().trim().min(1),
  }),
  security: z.object({
    check_word: z.string().trim().min(1),
  }),
});
