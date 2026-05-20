import React, { useState } from "react";
import type { User } from "./users.types";

type ColorPickerProps = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <div className="flex absolute gap-2">
      <p className="text-base">Chose color: </p>
      <div className="w-fit px-2 py-1 bg-slate-700 rounded-xl text-white text-sm">
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
