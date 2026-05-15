import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-16 md:py-24">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <Image
            src="/assets/404-illustration.svg"
            alt="404 illustration"
            width={700}
            height={471}
            priority
            className="h-auto w-full max-w-md md:max-w-lg"
          />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Oops! Page not found
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            The page you are looking for doesn&apos;t exist.
            <br />
            Try again later.
          </p>

          <Button
            asChild
            className="mt-6 rounded-lg bg-primary-900 px-6 py-5 text-sm font-semibold text-white hover:bg-[#1B2935] md:mt-8"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Return to homepage
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
