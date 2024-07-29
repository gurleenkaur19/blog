import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested post.</p>
      <Link href="/" className="mt-4 text-sm text-foreground hover:underline">
        ⇦ Go Back
      </Link>
    </main>
  );
}
