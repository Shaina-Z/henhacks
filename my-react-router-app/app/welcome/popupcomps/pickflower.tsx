type PickFlowerProps = {
  onPickFlower: () => void;
};

export function PickFlower({ onPickFlower }: PickFlowerProps) {
  return (
    <button
      type="button"
      onClick={onPickFlower}
      className="mx-auto mt-3 rounded bg-green-600 px-4 py-1 text-white hover:bg-green-700"
    >
      Pick Your Flower!
    </button>
  );
}