import sprout from "./Sprout.webp";

export function FlowerPop() {
  return (
    <details className="fixed right-4 bottom-4 z-40">
        <summary
          aria-label="Toggle sprout popup"
          className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-300 bg-white text-xl shadow-sm hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
        >
          🌱
        </summary>
        <div className="absolute right-0 bottom-12 flex h-[40rem] w-96 flex-col rounded-lg border border-gray-300 bg-white p-3 shadow-md">
          <img src={sprout} alt="Sprout" className="mx-auto mt-auto h-auto w-36 shrink-0 rounded" />
        </div>
    </details>
    );}