import { useEffect, useMemo, useState } from "react";
import sprout from "../Sprout.webp";
import halfBloom from "../Half_bloom.webp";
import greenCarnation from "../Green_Carnation.webp";
import lavender from "../Lavender.webp";
import pansies from "../Pansies.webp";
import rose from "../Rose.webp";
import tieDyeRose from "../Tie-dye_Rose.webp";
import violet from "../Violet.webp";
import { PickFlower } from "./pickflower";

const PLANT_OPTIONS = [
{ image: violet, alt: "Violets", info : "Sappho, the ancient Greek poet, often referenced violets in her poems, associating them with female love and affection." },
  { image: rose, alt: "Roses", info: "Roses represent love in many cultures. However, for the trans community, they have often been used to honor trans individuals and their experiences." },
  { image: tieDyeRose, alt: "Tie-dye Roses", info: "While first associated with Woodstock and the love and peace movement, tie-dye roses have since become a symbol of pride and celebration in the LGBTQ+ community." },
  { image: greenCarnation, alt: "Green Carnation", info: "Popularized by writer and wit Oscar Wilde in 1892; this flower became a symbol of gay identity and was worn as a coded signal of same-sex attraction." },
  { image: pansies, alt: "Pansies", info: "Pansies were once associated with effeminate behavior and the term pansy was used to describe said behavior in the 18th century. Now the term has been reclaimed and some gay bars done the name in their branding." },
  { image: lavender, alt: "Lavenders", info: "Lavender has been used to describe both gay and lesbian identities in various cultures and contexts." },
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
type FlowerPopProps = {
  onPickFlower?: (flower: { image: string; alt: string; message?: string }) => void;
  resetCycle?: number;
  onSelectFence?: (fence: "user" | "community") => void;
};

export function FlowerPop({ onPickFlower, resetCycle = 0, onSelectFence }: FlowerPopProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [panel, setPanel] = useState<"choose" | "tasks">("choose");
  // which plant the user picked; used both for display in selector and final flower image
  const [chosen, setChosen] = useState<string>(PLANT_OPTIONS[0].alt);

  const [selectedTasks, setSelectedTasks] = useState(() => picktasks(3));
  const [tasks, setTasks] = useState([false, false, false]);
  const [showFenceButtons, setShowFenceButtons] = useState(false);
  const [message, setMessage] = useState<string>("");

  // flowerState now derives directly from the tasks array so updates reliably
  const flowerState = useMemo(() => {
    const count = tasks.filter(Boolean).length;
    if (count === 0) {
      return null;
    }

    if (count === 3) {
      const plantObj = PLANT_OPTIONS.find((opt) => opt.alt === chosen);
      return plantObj ? { image: plantObj.image, alt: chosen } : null;
    }

    if (count === 2) {
      return { image: halfBloom, alt: "Half-bloom" };
    }

    return { image: sprout, alt: "Sprout" };
  }, [tasks, chosen]);

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

  const handlePickFlower = () => {
    if (tasks.filter(Boolean).length !== 3) {
      return;
    }

    // when the user actually clicks "Pick Your Flower!" we reveal the fence options
    // and return to the chooser panel so they are visible
    setShowFenceButtons(true);
    setPanel("choose");
  };

  const handleChooseFence = (fence: "user" | "community") => {
    const plantObj = PLANT_OPTIONS.find((opt) => opt.alt === chosen);
    if (!plantObj) return;

    // inform parent about picked flower, message and which fence
    onPickFlower?.({ image: plantObj.image, alt: plantObj.alt, message });
    onSelectFence?.(fence);

    setIsOpen(false);
    setShowFenceButtons(false);
    setMessage("");
  };

  useEffect(() => {
    setPanel("choose");
    setChosen(PLANT_OPTIONS[0].alt);
    setTasks([false, false, false]);
    setSelectedTasks(picktasks(3));
    setMessage("");
    setIsOpen(true);
  }, [resetCycle]);

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
                  className="relative group flex cursor-pointer items-center gap-2 rounded border p-1 bg-blue-300 hover:bg-blue-100 hover:scale-125 transition-transform"
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

                  {/* hover box with info text */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-48 rounded bg-gray-800 p-2 text-white
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    <p className="text-sm leading-tight">{opt.info}</p>
                  </div>
                </label>
              ))}
            </div>
            {!showFenceButtons && (
              <button
                type="button"
                onClick={handleStartGrowing}
                className="mt-2 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
              >
                Start Growing!
              </button>
            )}

            {showFenceButtons && (
              <>
                <input
                  type="text"
                  placeholder="Enter message for your flower"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded border p-1 text-sm bg-blue-500 text-white"
                />
                <div className="space-x-2 mt-2">
                  <button
                    type="button"
                    className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    onClick={() => handleChooseFence("user")}
                  >
                    Place in my garden
                  </button>
                  <button
                    type="button"
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    onClick={() => handleChooseFence("community")}
                  >
                    Place in community garden
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* show tasks checklist */
          <>
            {/* show the current flowerState above the tasks so user sees progression */}
            {flowerState && (
              <img
                src={flowerState.image}
                alt={flowerState.alt}
                className="mx-auto mb-4 h-auto w-36 shrink-0 rounded"
              />
            )}
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

            {tasks.filter(Boolean).length === 3 && <PickFlower onPickFlower={handlePickFlower} />}
          </>
        )}

        {/* when we're in the choose panel we also still display the state image */}
        {panel === "choose" && flowerState && (
          <img
            src={flowerState.image}
            alt={flowerState.alt}
            className="mx-auto mt-auto h-auto w-36 shrink-0 rounded"
          />
        )}
      </div>
    </details>
  );
}