"use client";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <ClerkLoaded>
        <SignUp
          path="/sign-up"
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 size={32} className="animate-spin text-muted-foreground" />
      </ClerkLoading>
    </div>
  );
}
