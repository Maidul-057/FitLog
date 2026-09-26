import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-black px-4 text-white">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#ccff00]">404</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base text-zinc-400">
          The workout, plan, or route you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:brightness-95"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
