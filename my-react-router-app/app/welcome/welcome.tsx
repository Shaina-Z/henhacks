import { useState } from "react";
import userLogo from "./Fence.webp";
import { FlowerPop } from "./popupcomps/flowerpop";
import { QuestionPop } from "./popupcomps/q";

type PickedFlower = {
  image: string;
  alt: string;
};

type PlacedFlower = PickedFlower & {
  id: number;
  xPercent: number;
  yPercent: number;
};

export function Welcome() {
  const [pickedFlower, setPickedFlower] = useState<PickedFlower | null>(null);
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [growCycle, setGrowCycle] = useState(0);

  const handleFenceTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!pickedFlower) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;

    setPlacedFlowers((previous) => [
      ...previous,
      {
        id: Date.now(),
        image: pickedFlower.image,
        alt: pickedFlower.alt,
        xPercent,
        yPercent,
      },
    ]);

    setPickedFlower(null);
    setGrowCycle((previous) => previous + 1);
  };

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex min-h-0 flex-1 flex-col items-center">
        <header className="flex flex-col items-center gap-9">
          <div
            onClick={handleFenceTap}
            className={`relative w-[500px] max-w-[100vw] p-4 ${pickedFlower ? "cursor-crosshair" : ""}`}
          >
            <img src={userLogo} alt="Fence" className="block w-full" />

            {placedFlowers.map((flower) => (
              <img
                key={flower.id}
                src={flower.image}
                alt={flower.alt}
                className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${flower.xPercent}%`, top: `${flower.yPercent}%` }}
              />
            ))}
          </div>

          {pickedFlower && (
            <p className="rounded border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 shadow-sm">
              {pickedFlower.alt} picked. Plant your flower inside the fence!
            </p>
          )}
        </header>
      </div>
        <QuestionPop />
      <div>
        <FlowerPop onPickFlower={setPickedFlower} resetCycle={growCycle} />
      </div>
    </main>
  );
}
