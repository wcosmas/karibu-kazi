"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Find Your Dream Job Today
        </h1>
        <p className="text-xl text-center mb-8">
          Discover opportunities that match your skills and aspirations
        </p>
        <form className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            className="flex-grow bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="City, state, or zip code"
            className="flex-grow bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" size="lg" className="w-full md:w-auto">
            <SearchIcon className="mr-2 h-4 w-4" /> Search Jobs
          </Button>
        </form>
      </div>
    </section>
  );
};
