import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-primary transition-colors"
                >
                  About JobBoard
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/salaries"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Salary Information
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              For Employers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/post-job"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Employer Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              Stay Connected
            </h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest job postings and career
              tips.
            </p>
            <form className="flex space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
            </p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/accessibility"
                className="text-sm hover:text-primary transition-colors"
              >
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
