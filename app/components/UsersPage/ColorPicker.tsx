type ColorPickerProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <div className="flex absolute gap-2 compact:gap-1 ml-20 -mt-2 compact:ml-18 compact:-mt-3">
      <p className="text-base">Chose color: </p>
      <div className="w-fit px-2 py-1 compact:px-1 compact:py-0.5 bg-slate-700 rounded-xl text-white text-sm">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder={"#FFFFFF"}
        />
      </div>
    </div>
  );
}
