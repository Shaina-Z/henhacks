import { useState } from "react";
import userLogo from "./Fence.webp";
import { FlowerPop } from "./popupcomps/flowerpop";
import { QuestionPop } from "./popupcomps/q";

type PickedFlower = {
  image: string;
  alt: string;
  message?: string;
};

type PlacedFlower = PickedFlower & {
  id: number;
  xPercent: number;
  yPercent: number;
};

export function Welcome() {
  const [pickedFlower, setPickedFlower] = useState<PickedFlower | null>(null);
  const [userFlowers, setUserFlowers] = useState<PlacedFlower[]>([]);
  const [communityFlowers, setCommunityFlowers] = useState<PlacedFlower[]>([]);
  const [growCycle, setGrowCycle] = useState(0);
  // activeFence will be passed from FlowerPop
  const [activeFence, setActiveFence] = useState<"user" | "community" | null>(null);

  const handleFenceTap = (
    event: React.MouseEvent<HTMLDivElement>,
    target: "user" | "community",
  ) => {
    if (!pickedFlower) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;

    const newFlower: PlacedFlower = {
      id: Date.now(),
      image: pickedFlower.image,
      alt: pickedFlower.alt,
      message: pickedFlower.message,
      xPercent,
      yPercent,
    };

    if (target === "user") {
      setUserFlowers((prev) => [...prev, newFlower]);
    } else {
      setCommunityFlowers((prev) => [...prev, newFlower]);
    }

    setPickedFlower(null);
    setGrowCycle((prev) => prev + 1);
  };

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex min-h-0 flex-1 flex-col items-center">
        <header className="flex flex-col items-center gap-6">
          {/* fence rendering is now controlled by FlowerPop via activeFence prop */}
          {activeFence === "user" && (
            <div
              onClick={(e) => handleFenceTap(e, "user")}
              className={`relative w-[500px] max-w-[100vw] p-4 ${
                pickedFlower ? "cursor-crosshair" : ""
              }`}
            >
              {/* title overlay */}
              <span className="absolute top-2 left-2 bg-white bg-opacity-75 px-2 py-1 text-sm font-semibold text-blue-700">
                My Garden
              </span>

              <img src={userLogo} alt="My fence" className="block w-full" />

              {userFlowers.map((flower) => (
                <div
                  key={flower.id}
                  className="absolute group h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${flower.xPercent}%`, top: `${flower.yPercent}%` }}
                >
                  <img
                    src={flower.image}
                    alt={flower.alt}
                    className="h-full w-full"
                  />
                  {flower.message && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-40 rounded bg-gray-800 p-2 text-white
                                       opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      <p className="text-xs leading-tight">{flower.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeFence === "community" && (
            <div
              onClick={(e) => handleFenceTap(e, "community")}
              className={`relative w-[500px] max-w-[100vw] p-4 ${
                pickedFlower ? "cursor-crosshair" : ""
              }`}
            >
              {/* title overlay */}
              <span className="absolute top-2 left-2 bg-white bg-opacity-75 px-2 py-1 text-sm font-semibold text-blue-700">
                Community Garden
              </span>

              <img src={userLogo} alt="Community fence" className="block w-full" />

              {communityFlowers.map((flower) => (
                <div
                  key={flower.id}
                  className="absolute group h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${flower.xPercent}%`, top: `${flower.yPercent}%` }}
                >
                  <img
                    src={flower.image}
                    alt={flower.alt}
                    className="h-full w-full"
                  />
                  {flower.message && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-40 rounded bg-gray-800 p-2 text-white
                                       opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                      <p className="text-xs leading-tight">{flower.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {pickedFlower && activeFence && (
            <p className="rounded border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 shadow-sm">
              {pickedFlower.alt} picked. Plant your flower inside the {activeFence} fence!
            </p>
          )}
        </header>
      </div>
        <QuestionPop />
      <div>
        <FlowerPop
          onPickFlower={setPickedFlower}
          resetCycle={growCycle}
          onSelectFence={setActiveFence}
        />
      </div>
    </main>
  );
}
