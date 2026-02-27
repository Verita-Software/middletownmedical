import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6">
        Welcome to Middletown Medical
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Find the right healthcare professional for your needs from our
        comprehensive staff directory.
      </p>
      <div className="flex gap-4">
        <Link href="/providers">
          <Button size="lg" className="rounded-full px-8">
            Find a Provider
          </Button>
        </Link>
      </div>
    </div>
  );
}
