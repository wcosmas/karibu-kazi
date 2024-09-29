"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompanyProfileProps {
  company: {
    name: string;
    description: string;
    website: string;
    logo: string;
  };
  onSave: () => void;
}

export function CompanyProfile({ company, onSave }: CompanyProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Manage your company's information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input id="company-name" defaultValue={company.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-description">Description</Label>
          <Textarea
            id="company-description"
            defaultValue={company.description}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-website">Website</Label>
          <Input
            id="company-website"
            type="url"
            defaultValue={company.website}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-logo">Logo</Label>
          <div className="flex items-center space-x-4">
            <img
              src={company.logo}
              alt="Company Logo"
              className="w-16 h-16 rounded"
            />
            <Input id="company-logo" type="file" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
