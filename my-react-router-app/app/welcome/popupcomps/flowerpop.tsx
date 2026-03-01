import { useMemo, useState } from "react";
import sprout from "../Sprout.webp";
import halfBloom from "../Half_bloom.webp";
import greenCarnation from "../Green_Carnation.webp";
import lavender from "../Lavender.webp";
import pansies from "../Pansies.webp";
import rose from "../Rose.webp";
import tieDyeRose from "../Tie-dye_Rose.webp";
import violet from "../Violet.webp";

const PLANT_OPTIONS = [
  { image: violet, alt: "Violets" },
  { image: rose, alt: "Roses" },
  { image: tieDyeRose, alt: "Tie-dye Roses" },
  { image: greenCarnation, alt: "Green Carnation" },
  { image: pansies, alt: "Pansies" },
  { image: lavender, alt: "Lavenders" },
];

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
  const [isOpen, setIsOpen] = useState(false);
  const [panel, setPanel] = useState<"choose" | "tasks">("choose");
  // which plant the user picked; used both for display in selector and final flower image
  const [chosen, setChosen] = useState<string>(PLANT_OPTIONS[0].alt);

  const [selectedTasks] = useState(() => picktasks(3));
  const [tasks, setTasks] = useState([false, false, false]);

  const checkCount = tasks.filter(Boolean).length;

  const flowerState = useMemo(() => {
    if (checkCount === 0) {
      return null;
    }

    if (checkCount === 3) {
      const plantObj = PLANT_OPTIONS.find((opt) => opt.alt === chosen);
      return plantObj ? { image: plantObj.image, alt: chosen } : null;
    }

    if (checkCount === 2) {
      return { image: halfBloom, alt: "Half-bloom" };
    }

    return { image: sprout, alt: "Sprout" };
  }, [checkCount, chosen]);

  const toggleTask = (index: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((taskChecked, taskIndex) =>
        taskIndex === index ? !taskChecked : taskChecked,
      ),
    );
  };

  const handleStartGrowing = () => {
    setPanel("tasks");
    setIsOpen(true);
  };

  return (
    <details
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      className="fixed right-4 bottom-4 z-40"
    >
      <summary
        aria-label="Toggle sprout popup"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-gray-300 bg-white text-xl shadow-sm hover:bg-gray-50 [&::-webkit-details-marker]:hidden"
      >
        🌱
      </summary>
      
      {/* plant selector or task container, depending on state */}
      <div className={`absolute right-0 bottom-12 flex h-[40rem] w-96 flex-col rounded-lg border border-gray-300 p-3 shadow-md ${panel === "choose" ? "bg-yellow-200" : "bg-yellow-100"}`}>
        {panel === "choose" ? (
          /* choose a plant first */
          <div className="flex flex-col items-center space-y-3">
            <p className="text-sm font-medium text-blue-700">Pick your flower:</p>
            <div className="grid grid-cols-2 gap-2">
              {PLANT_OPTIONS.map((opt) => (
                <label
                  key={opt.alt}
                  className="flex cursor-pointer items-center gap-2 rounded border p-1 bg-blue-300 hover:bg-blue-100"
                >
                  <input
                    type="radio"
                    name="flower"
                    value={opt.alt}
                    checked={chosen === opt.alt}
                    onChange={() => setChosen(opt.alt)}
                    className="h-4 w-4"
                  />
                  <img src={opt.image} alt={opt.alt} className="h-8 w-8 rounded" />
                  <span className="text-xs">{opt.alt}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleStartGrowing}
              className="mt-2 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
            >
              Start Growing!
            </button>
          </div>
        ) : (
          /* show tasks checklist */
          <>
            <p className="mb-2 text-center text-sm font-medium text-gray-800">
              1 task = sprout · 2 tasks = half bloom · 3 tasks = full bloom ({chosen})
            </p>
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
          </>
        )}

        {flowerState && (
          <img src={flowerState.image} alt={flowerState.alt} className="mx-auto mt-auto h-auto w-36 shrink-0 rounded" />
        )}
      </div>
    </details>
  );
}