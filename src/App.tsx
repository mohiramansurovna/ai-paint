import React, { useState, useEffect, useRef } from 'react';
import PaintArea, { PaintAreaRef } from './components/PaintArea';
import Toolbar from './components/Toolbar';
import { ColorKey, Theme } from './utils/colorMap';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  colorKey: ColorKey;
  size: number;
}

const PaintApp: React.FC = () => {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorKey>('ink');
  const [currentSize, setCurrentSize] = useState(3);
  const [theme, setTheme] = useState<Theme>('light');
  const paintAreaRef = useRef<PaintAreaRef>(null);

  // Load saved strokes from localStorage
  useEffect(() => {
    const savedStrokes = localStorage.getItem('paint-strokes');
    if (savedStrokes) {
      try {
        setStrokes(JSON.parse(savedStrokes));
      } catch (error) {
        console.error('Failed to load saved strokes:', error);
      }
    }
  }, []);

  // Save strokes to localStorage
  useEffect(() => {
    localStorage.setItem('paint-strokes', JSON.stringify(strokes));
  }, [strokes]);

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    // Initial theme check
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleStrokesChange = (newStrokes: Stroke[] | ((prev: Stroke[]) => Stroke[])) => {
    if (typeof newStrokes === 'function') {
      setStrokes(newStrokes);
    } else {
      setStrokes(newStrokes);
    }
  };

  const handleUndo = () => {
    if (strokes.length > 0) {
      setStrokes(strokes.slice(0, -1));
    }
  };

  const handleClear = () => {
    setStrokes([]);
  };

  const handleExport = () => {
    if (paintAreaRef.current) {
      paintAreaRef.current.exportSVG();
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative">
      <PaintArea
        ref={paintAreaRef}
        currentColor={currentColor}
        currentSize={currentSize}
        theme={theme}
        onStrokesChange={handleStrokesChange}
        strokes={strokes}
      />
      <div className="absolute top-0 left-0 right-0 z-10">
        <Toolbar
          currentColor={currentColor}
          currentSize={currentSize}
          theme={theme}
          onColorChange={setCurrentColor}
          onSizeChange={setCurrentSize}
          onUndo={handleUndo}
          onClear={handleClear}
          onExport={handleExport}
          canUndo={strokes.length > 0}
        />
      </div>
    </div>
  );
};

export default PaintApp;
