import userLogo from "./Sprout.webp";

export function Welcome() {
  return (
    <main className="relative flex items-center justify-center pt-16 pb-4">
      <details className="fixed top-4 right-4 z-40">
        <summary
          aria-label="Toggle help popup"
          className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-300 bg-white text-xl font-semibold shadow-sm hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
        >
          ❓
        </summary>
        <div className="absolute top-12 right-0 z-30 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-md">
          <p className="text-sm text-gray-700">Welcome to `insert name here`! To grow a flower, complete tasks to help your sprout grow. After accumulating 3 points, your sprout will bloom into a flower! Pick your flower and put it in a flower field with a message for others to read!</p>
        </div>
      </details>

      <div className="flex min-h-0 flex-1 flex-col items-center">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src={userLogo} alt="Sprout" className="block w-full" />
          </div>
        </header>
      </div>

      <details className="fixed right-4 bottom-4 z-40">
        <summary
          aria-label="Toggle sprout popup"
          className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-300 bg-white text-xl shadow-sm hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
        >
          🌱
        </summary>
        <div className="absolute right-0 bottom-12 flex h-[40rem] w-96 flex-col rounded-lg border border-gray-300 bg-white p-3 shadow-md">
          <img src={userLogo} alt="Sprout" className="mx-auto mt-auto h-auto w-36 shrink-0 rounded" />
        </div>
      </details>
    </main>
  );
}
