import { useMemo, useState } from "react";
import sprout from "../Sprout.webp";
import halfBloom from "../Half_bloom.webp";
import tieDyeRose from "../Tie-dye_Rose.webp";

const TASK_OPTIONS = [
  "Go on a 15-minute walk outside",
  "Do yoga for 30 minutes",
  "Clean or organize your room",
  "Wash your dishes",
  "Take a bath",
  "Exercise for 15 minutes",
  "Cook a new food",
  "Start a painting",
  "Play a game",
  "Grab a book and read it",
  "Learn a new topic",
  "Meet up with some friends and chat",
  "Eat a snack",
  "Take deep breaths",
  "Journal for 5 minutes",
  "Drink a bottle of water",
  "Wash your face",
  "Eat a piece of candy (or sweet)",
  "Take a brain break",
];

function picktasks(taskCount: number) {
  const shuffledTasks = [...TASK_OPTIONS].sort(() => Math.random() - 0.5);
  return shuffledTasks.slice(0, taskCount);
}

//creates a popup button on the bottom right of the screen that shows a sprout when clicked.
export function FlowerPop() {
  const [selectedTasks] = useState(() => picktasks(3));
  const [tasks, setTasks] = useState([false, false, false]);

  const checkCount = tasks.filter(Boolean).length;

  const flowerState = useMemo(() => {
    if (checkCount === 0) {
      return null;
    }

    if (checkCount === 3) {
      return { image: tieDyeRose, alt: "Tie-dye-rose" };
    }

    if (checkCount === 2) {
      return { image: halfBloom, alt: "Half-bloom" };
    }

    return { image: sprout, alt: "Sprout" };
  }, [checkCount]);

  const toggleTask = (index: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((taskChecked, taskIndex) =>
        taskIndex === index ? !taskChecked : taskChecked,
      ),
    );
  };

  return (
    <details className="fixed right-4 bottom-4 z-40">
      <summary
        aria-label="Toggle sprout popup"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-300 bg-white text-xl shadow-sm hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
      >
        🌱
      </summary>
      <div className="absolute right-0 bottom-12 flex h-[40rem] w-96 flex-col rounded-lg border border-gray-300 bg-yellow-100 p-3 shadow-md">
        <div className="ml-auto w-full max-w-60 space-y-2 self-end text-right">
          <label className="flex items-center justify-end gap-2 text-sm text-gray-800">
            <span>{selectedTasks[0]}</span>
            <input
              type="checkbox"
              checked={tasks[0]}
              onChange={() => toggleTask(0)}
              className="h-4 w-4"
            />
          </label>
          <label className="flex items-center justify-end gap-2 text-sm text-gray-800">
            <span>{selectedTasks[1]}</span>
            <input
              type="checkbox"
              checked={tasks[1]}
              onChange={() => toggleTask(1)}
              className="h-4 w-4"
            />
          </label>
          <label className="flex items-center justify-end gap-2 text-sm text-gray-800">
            <span>{selectedTasks[2]}</span>
            <input
              type="checkbox"
              checked={tasks[2]}
              onChange={() => toggleTask(2)}
              className="h-4 w-4"
            />
          </label>
        </div>
        {flowerState && (
          <img src={flowerState.image} alt={flowerState.alt} className="mx-auto mt-auto h-auto w-36 shrink-0 rounded" />
        )}
      </div>
    </details>
  );
}