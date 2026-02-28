import userLogo from "./IMG_6054.png.webp";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={userLogo}
              alt="Logo"
              className="block w-full"
            />
          </div>
        </header>
      </div>
    </main>
  );
}
