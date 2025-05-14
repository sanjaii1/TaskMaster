"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="container mx-auto p-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <Button variant="ghost" size="sm" className="absolute top-6 left-6 text-muted-foreground hover:text-primary" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </Link>
          </Button>
          <CardTitle className="text-3xl font-bold text-primary text-center pt-12">About TaskMaster</CardTitle>
          <CardDescription className="text-center text-muted-foreground pt-2">
            Your friendly neighborhood task management app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>
            TaskMaster is designed to help you keep track of your to-dos with ease and efficiency. 
            Whether it's for personal projects, daily chores, or work-related assignments, 
            TaskMaster aims to provide a straightforward and pleasant experience.
          </p>
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-primary">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Add, manage, and complete tasks.</li>
              <li>Set priorities (High, Medium, Low) for better organization.</li>
              <li>Assign due dates to keep track of deadlines.</li>
              <li>Include detailed notes for each task.</li>
              <li>Filter tasks by status (All, Active, Completed).</li>
              <li>Your data is saved locally in your browser for privacy and speed.</li>
            </ul>
          </div>
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-primary">Tech Stack:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Next.js (App Router)</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>ShadCN UI Components</li>
              <li>Tailwind CSS</li>
              <li>Lucide React Icons</li>
            </ul>
          </div>
          <p className="pt-4 text-sm text-center text-muted-foreground">
            Happy tasking!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
