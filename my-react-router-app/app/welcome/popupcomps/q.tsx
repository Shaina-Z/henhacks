

// This is the ? popup
export function QuestionPop()
    {
    return (
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

    );
}