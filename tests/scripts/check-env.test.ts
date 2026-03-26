import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("scripts/check-env.mjs", () => {
  it("loads Next.js env files from the current working directory", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "kilatkoding-check-env-"));
    const scriptPath = join(process.cwd(), "scripts/check-env.mjs");

    try {
      writeFileSync(
        join(tempDir, ".env"),
        [
          "NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co",
          "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=publishable-key",
          "NEXT_PUBLIC_ENABLE_CONTACT=false",
          "NEXT_PUBLIC_ENABLE_PAYMENTS=false",
          "NEXT_PUBLIC_ENABLE_ADMIN=false",
        ].join("\n"),
      );

      const output = execFileSync(process.execPath, [scriptPath], {
        cwd: tempDir,
        encoding: "utf8",
        env: {
          HOME: process.env.HOME ?? "",
          NODE_ENV: "development",
        },
      });

      expect(output).toContain("- auth: ready");
      expect(output).toContain("- waitlist: ready");
      expect(output).toContain("- contact: disabled by NEXT_PUBLIC_ENABLE_CONTACT=false");
      expect(output).not.toContain("missing: NEXT_PUBLIC_SUPABASE_URL");
    } finally {
      rmSync(tempDir, { force: true, recursive: true });
    }
  });
});
