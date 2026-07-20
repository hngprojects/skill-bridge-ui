"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ExternalSignupStepProps {
  onContinue: (email: string) => void;
}

export function ExternalSignupStep({ onContinue }: ExternalSignupStepProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onContinue(email);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Welcome to the Assessment
        </CardTitle>
        <CardDescription>
          Please enter your email to get started.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full rounded-lg">
            Continue
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
