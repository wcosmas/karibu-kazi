"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateJobSeekerProfile } from "@/features/profile/api/use-create-job-seeker-profile";
import { JobSeekerProfileSchema } from "@/features/profile/types";
import { UploadDropzone } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface ProfileOverviewProps {
  bio: string;
  resumeUrl: string | null;
  location?: string;
  websiteUrl?: string;
}

export function ProfileOverview({
  bio,
  resumeUrl,
  location,
  websiteUrl,
}: ProfileOverviewProps) {
  const mutation = useCreateJobSeekerProfile();

  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<z.infer<typeof JobSeekerProfileSchema>>({
    resolver: zodResolver(JobSeekerProfileSchema),
    defaultValues: {
      bio,
      resumeUrl: resumeUrl ?? "",
      location: location ?? "",
      websiteUrl: websiteUrl ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof JobSeekerProfileSchema>) {
    mutation.mutate(
      { ...values },
      {
        onSuccess: () => {
          // onClose();
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Overview</CardTitle>
        <CardDescription>
          Manage your personal information and resume
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-8"
        >
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resumeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <UploadDropzone
                        endpoint="resume"
                        onClientUploadComplete={(res) => {
                          field.onChange(res?.[0]?.url);
                          setUploadProgress(0);
                        }}
                        onUploadProgress={(progress) => {
                          setUploadProgress(progress);
                        }}
                      />
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <Progress value={uploadProgress} className="w-full" />
                      )}
                      {field.value && (
                        <div className="flex items-center space-x-2">
                          <Input
                            value={field.value}
                            readOnly
                            className="flex-grow"
                          />
                          <Button variant="outline" asChild>
                            <a
                              href={field.value}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
