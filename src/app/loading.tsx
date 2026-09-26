export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded bg-zinc-800" />
          <div className="h-12 w-full max-w-xl rounded bg-zinc-800" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
                <div className="h-52 bg-zinc-800" />
                <div className="space-y-4 p-5">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-zinc-800" />
                    <div className="h-6 w-20 rounded-full bg-zinc-800" />
                  </div>
                  <div className="h-7 w-3/4 rounded bg-zinc-800" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 rounded bg-zinc-800" />
                    <div className="h-12 rounded bg-zinc-800" />
                    <div className="h-12 rounded bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
