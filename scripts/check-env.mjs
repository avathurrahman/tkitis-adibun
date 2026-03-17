const requiredKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

const optionalKeys = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_APP_URL",
  "PAYMENT_PROVIDER",
  "MIDTRANS_SERVER_KEY",
  "NEXT_PUBLIC_MIDTRANS_CLIENT_KEY",
  "DOKU_CLIENT_ID",
  "DOKU_SECRET_KEY",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "ADMIN_EMAILS",
  "AI_DEFAULT_PROVIDER",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
];

function isMissing(key) {
  const value = process.env[key];
  return !value || value.trim().length === 0;
}

const missingRequired = requiredKeys.filter(isMissing);
const missingOptional = optionalKeys.filter(isMissing);

if (missingRequired.length > 0) {
  console.error("Missing required environment variables:");
  for (const key of missingRequired) {
    console.error(`- ${key}`);
  }
  process.exitCode = 1;
} else {
  console.log("Required environment variables are set.");
}

if (missingOptional.length > 0) {
  console.log("\nOptional variables not set yet:");
  for (const key of missingOptional) {
    console.log(`- ${key}`);
  }
}
