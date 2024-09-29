"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Take the Next Step in Your Career?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of job seekers who have found their dream jobs through
          our platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/jobs">Find Jobs</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
