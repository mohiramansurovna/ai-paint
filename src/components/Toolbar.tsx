import React from 'react';
import BubbleButton from './BubbleButton';
import PenSizeSlider from './PenSizeSlider';
import ThemeToggle from './ThemeToggle';
import { ColorKey, Theme } from '../utils/colorMap';

interface ToolbarProps {
  currentColor: ColorKey;
  currentSize: number;
  theme: Theme;
  onColorChange: (color: ColorKey) => void;
  onSizeChange: (size: number) => void;
  onUndo: () => void;
  onClear: () => void;
  onExport: () => void;
  canUndo: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentColor,
  currentSize,
  theme,
  onColorChange,
  onSizeChange,
  onUndo,
  onClear,
  onExport,
  canUndo
}) => {
  const colors: { key: ColorKey; name: string; lightColor: string; darkColor: string }[] = [
    { key: 'ink', name: 'Ink', lightColor: '#000000', darkColor: '#ffffff' },
    { key: 'red', name: 'Red', lightColor: '#dc2626', darkColor: '#fca5a5' },
    { key: 'blue', name: 'Blue', lightColor: '#2563eb', darkColor: '#93c5fd' },
    { key: 'green', name: 'Green', lightColor: '#16a34a', darkColor: '#86efac' }
  ];

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Color Palette */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Colors:
          </span>
          <div className="flex gap-2">
            {colors.map(({ key, name, lightColor, darkColor }) => (
              <button
                key={key}
                onClick={() => onColorChange(key)}
                className={`w-10 h-10 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  currentColor === key 
                    ? 'outline-2 outline-blue-500 shadow-lg' 
                    : ''
                }`}
                style={{
                  backgroundColor: theme === 'dark' ? darkColor : lightColor
                }}
                title={name}
              />
            ))}
          </div>
        </div>

        {/* Pen Size */}
        <PenSizeSlider
          size={currentSize}
          onSizeChange={onSizeChange}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <BubbleButton
            onClick={onUndo}
            disabled={!canUndo}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span className="hidden sm:inline">Undo</span>
          </BubbleButton>

          <BubbleButton
            onClick={onClear}
            variant="danger"
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Clear</span>
          </BubbleButton>

          <BubbleButton
            onClick={onExport}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Export SVG</span>
          </BubbleButton>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
