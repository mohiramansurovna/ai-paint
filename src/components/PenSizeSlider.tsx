import React from 'react';

interface PenSizeSliderProps {
  size: number;
  onSizeChange: (size: number) => void;
  min?: number;
  max?: number;
}

const PenSizeSlider: React.FC<PenSizeSliderProps> = ({
  size,
  onSizeChange,
  min = 1,
  max = 20
}) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Pen Size
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="w-28 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((size - min) / (max - min)) * 100}%, #e5e7eb ${((size - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
      {/* Preview dot next to the slider */}
      <div
        className="bg-gray-800 dark:bg-gray-200 rounded-full"
        style={{
          width: `${Math.max(size, 2)}px`,
          height: `${Math.max(size, 2)}px`
        }}
      />
      <span className="text-sm font-mono text-gray-600 dark:text-gray-400 min-w-[2rem] text-center">
        {size}
      </span>
    </div>
  );
};

export default PenSizeSlider;
