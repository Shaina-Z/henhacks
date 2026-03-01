import userLogo from "./Sprout.webp";
import { FlowerPop } from "./popupcomps/flowerpop";
import { QuestionPop } from "./popupcomps/questionpop";

export function Welcome() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex min-h-0 flex-1 flex-col items-center">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src={userLogo} alt="Sprout" className="block w-full" />
          </div>
        </header>
      </div>
        <QuestionPop />
      <div>
        <FlowerPop />
      </div>
    </main>
  );
}
