export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center w-14 h-14">
          <div className="absolute w-full h-full border-4 border-esn-magenta opacity-20 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-esn-magenta rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-esn-cyan font-medium text-lg animate-pulse tracking-wide">
          Loading...
        </div>
      </div>
    </div>
  );
}
