export default function HomeLoading() {
  return (
    <>
      <div className="space-y-6 compact:space-y-3 transition-all duration-300">
        <div className="space-y-2 compact:space-y-1">
          <div className="h-8 w-64 bg-slate-800 animate-pulse rounded" />
          <div className="h-4 w-96 bg-slate-800 animate-pulse rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 compact:gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-800 animate-pulse rounded-2xl compact:rounded-xl"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 compact:gap-2">
          <div className="xl:col-span-2 h-80 bg-slate-800 animate-pulse rounded-2xl compact:rounded-xl" />
          <div className="h-80 bg-slate-800 animate-pulse rounded-2xl compact:rounded-xl" />
        </div>
        <div className="bg-slate-800 animate-pulse rounded-2xl compact:rounded-xl col-span-full min-h-35 mt-2 py-3 compact:mt-1 compact:py-1 overflow-hidden">
          <h2 className="font-semibold text-2xl select-none mx-5 mb-2 compact:mx-2 compact:mb-1"></h2>

          <div className="bg-slate-800 animate-pulse rounded-2xl mb-2 compact:rounded-xl compact:mb-1">
            <div className="flex w-max gap-3 compact:gap-1.5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
