export default function HomeLoading() {
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-800 animate-pulse rounded" />
          <div className="h-4 w-96 bg-slate-800 animate-pulse rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-800 animate-pulse rounded-2xl"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 h-80 bg-slate-800 animate-pulse rounded-2xl" />
          <div className="h-80 bg-slate-800 animate-pulse rounded-2xl" />
        </div>
        <div className="bg-slate-800 animate-pulse rounded-2xl col-span-full min-h-35 mt-2 py-3 overflow-hidden">
          <h2 className="font-semibold text-2xl select-none mx-5 mb-2"></h2>

          <div className="bg-slate-800 animate-pulse rounded-2xl mb-2">
            <div className="flex w-max gap-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
